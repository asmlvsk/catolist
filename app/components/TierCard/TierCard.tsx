"use client";

import React, { useState } from "react";
import Image from "next/image";
import EditSection from "./EditTierCard";
import { rgbaTierColor, tierColor } from "@/app/lib/tierColor";
import TierRankSelect from "./TierRankSelect";
import { DeleteAnime } from "./DeleteAnime";
import { josefin, mohaveFont } from "@/app/lib/fonts";
import { CombinedDataType } from "@/app/global";
import Modal from "../Modal";
import { Button } from "@nextui-org/react";

type Props = {
  item: CombinedDataType;
  isMobile: any;
};

export default function TierCard({ item, isMobile }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    isMobile && setIsModalOpen(true);
  };

  const closeModal = () => {
    isMobile && setIsModalOpen(false);
  };

  const tierSection = (item: CombinedDataType) => {
    return (
      <div
        className="items-center flex relative pr-24 max-md:pr-2"
        style={{ color: tierColor(item.tier) }}
      >
        <span
          className={`text-[230px] mt-9 ${mohaveFont.className} object-cover max-md:text-6xl max-md:mt-0`}
        >
          {item.tier ?? (
            <p className="text-[38px] opacity-50 max-md:text-lg">No rank</p>
          )}
        </span>
        <span
          className={`text-[230px] mt-9 ${mohaveFont.className} blur-md object-cover absolute max-md:text-6xl max-md:mt-0`}
        >
          {item.tier}
        </span>
      </div>
    );
  };
  return (
    <>
      <div className="flex items-center gap-5 max-lg:gap-1">
        {isMobile && tierSection(item)}
        <div
          style={{
            background: `linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(0,212,255,0) 0%, ${rgbaTierColor(
              item.tier
            )} 50%, rgba(20,20,134,0) 100%)`,
          }}
          className={`flex justify-between w-full rounded-md bg-gradient-to-r from-[#FAF0E6] via-${tierColor(
            item.tier
          )}-600 to-white p-1`}
          onClick={openModal}
        >
          <div className="w-full pl-5 relative flex h-[200px] justify-between backdrop-blur-lg bg-[#FAF0E6] dark:bg-[#1A1625] max-md:h-[100px]">
            <div className="flex flex-col justify-center w-1/2 p-5 overscroll-contain z-20 max-w-md">
              <h2
                className={`${josefin.className} text-4xl max-lg:text-2xl max-lg:absolute`}
              >
                {item.title}
              </h2>
              {!isMobile && <EditSection item={item} />}
            </div>

            {!isMobile && tierSection(item)}

            {!isMobile && (
              <div className="flex items-center w-[70px]">
                <TierRankSelect item={item} />
              </div>
            )}

            <Image
              className="image_gradient object-cover"
              src={item.image_url as string}
              width={400}
              height={600}
              alt={item.title as string}
            />
          </div>
        </div>
        {!isMobile && <DeleteAnime item={item} />}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={tierSection(item)}
        imageLink={item.image_url as string}
        altImage={item.title as string}
        modalShadow={tierColor(item.tier)}
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center w-full">
            <TierRankSelect item={item} />
          </div>
          <EditSection item={item} />
          <div className="w-full flex gap-4 mt-2">
            <Button
              variant="bordered"
              color="danger"
              fullWidth
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
