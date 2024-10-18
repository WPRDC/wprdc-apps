import React from "react";

interface HeadingSectionProps {
  parcelID: string;
}

export async function Hero({
  parcelID,
}: HeadingSectionProps): Promise<React.ReactElement | null> {
  const imgURL = `https://iasworld.alleghenycounty.us/iasworld/iDoc2/Services/GetPhoto.ashx?parid=${parcelID}&jur=002`;

  // test for missing image (which the county replaces using a redirect)
  let noImage = false;
  try {
    await fetch(imgURL, { redirect: "error" });
  } catch (error) {
    noImage = true;
  }

  return (
    <>
      <div
        className={`h-full w-full bg-cover bg-center`}
        style={{ backgroundImage: !noImage ? `url(${imgURL})` : "" }}
      >
        {/*<div className="h-full w-full flex-col justify-end bg-gradient-to-t from-black/80 to-transparent text-white"></div>*/}
      </div>
    </>
  );
}
