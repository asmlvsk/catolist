import Image from "next/image";
import Link from "next/link";
import React from "react";
import { mohaveFont } from "../lib/fonts";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  imageSrc: string | StaticImport;
  linkTo: string;
  title: string;
};

function ImageCard({ imageSrc, linkTo, title }: Props) {
  return (
    <>
      <Link href={linkTo}>
        <div className="h-[450px] w-[450px] relative border rounded-3xl items-center justify-center text-center flex max-lg:h-[350px] max-lg:w-[350px]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            className="brightness-50 scale-80 transition duration-300 ease-in-out hover:scale-90"
          />
          <h2 className={`text-4xl z-30 ${mohaveFont.className} text-white`}>
            {title}
          </h2>
        </div>
      </Link>
    </>
  );
}

export default ImageCard;
