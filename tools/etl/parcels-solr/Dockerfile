FROM python:3.12-slim

WORKDIR /app

COPY tools/etl/parcels-solr/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY tools/etl/parcels-solr/config/ config/
COPY tools/etl/parcels-solr/etl.py .

CMD ["python", "etl.py"]