#!/usr/bin/env python3
"""
ETL: pulls from spacerat.parcel_index materialized view and indexes into Solr.
"""

import logging
import os
import re
from pathlib import Path
from typing import Optional

import psycopg2
import psycopg2.extras
import pysolr
import yaml

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)
log = logging.getLogger(__name__)

# ── Config ────────────────────────────────────────────────────────────────────

SOLR_URL     = os.environ.get("SOLR_URL", "http://localhost:8983/solr/parcels")
BATCH_SIZE   = int(os.environ.get("BATCH_SIZE", "1000"))

PG_DSN = {
    "host":     os.environ["PGHOST"],
    "port":     os.environ.get("PGPORT", "5432"),
    "dbname":   os.environ["PGDATABASE"],
    "user":     os.environ["PGUSERNAME"],
    "password": os.environ["PGPASSWORD"],
}

QUERY = """
        SELECT *,
               ST_X(centroid) AS lon,
               ST_Y(centroid) AS lat
        FROM spacerat.parcel_index \
        """

# ── Load yaml config ──────────────────────────────────────────────────────────

CONFIG_DIR = Path(__file__).parent / "config"

with open(CONFIG_DIR / "fields.yaml") as f:
    FIELD_MAP: dict = yaml.safe_load(f)["map"]

# ── Helpers ───────────────────────────────────────────────────────────────────

def make_short_parcel_id(parid: str) -> Optional[str]:
    match = re.match(r'^(\d{4})([A-Z])(\d{5})', parid.strip(), re.IGNORECASE)
    if not match:
        log.warning("Could not parse parcel ID: %r", parid)
        return None
    muni   = str(int(match.group(1)))
    letter = match.group(2).lower()
    block  = str(int(match.group(3)))
    return f"{muni}-{letter}-{block}"


# ── Transform ─────────────────────────────────────────────────────────────────

def transform(raw: dict) -> dict:
    doc: dict = {}

    for src, dest in FIELD_MAP.items():
        val = raw.get(src)
        if val is not None:
            doc[dest] = val

    # Short parcel ID
    parcel_id = raw.get("parcel_id", "")
    if parcel_id:
        short = make_short_parcel_id(parcel_id)
        if short:
            doc["parcel_id_short"] = short

    # Spatial — Solr location field expects "lat,lon"
    lat = raw.get("lat")
    lon = raw.get("lon")
    if lat is not None and lon is not None:
        doc["location"] = f"{lat},{lon}"

    return doc


# ── Load ──────────────────────────────────────────────────────────────────────

def run() -> None:
    solr = pysolr.Solr(SOLR_URL, timeout=60)
    conn = psycopg2.connect(**PG_DSN)

    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            log.info("Clearing existing index...")
            solr.delete(q="*:*", commit=False)

            log.info("Querying parcel_index...")
            cur.execute(QUERY)

            batch: list[dict] = []
            total = 0

            for row in cur:
                batch.append(transform(dict(row)))

                if len(batch) >= BATCH_SIZE:
                    solr.add(batch, commit=False)
                    total += len(batch)
                    log.info("Indexed %d records", total)
                    batch.clear()

            if batch:
                solr.add(batch, commit=False)
                total += len(batch)

            log.info("Committing %d total records...", total)
            solr.commit()
            log.info("Done.")

    finally:
        conn.close()


if __name__ == "__main__":
    run()