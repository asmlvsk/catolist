import CustomButton from "@/app/components/CustomButton";
import TierCard from "@/app/components/TierCard/TierCard";
import Title from "@/app/components/Title";
import { CombinedDataType } from "@/app/global";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";
import { EmptyArraySection } from "../components/EmptyArraySection";

type Props = {
  data?: CombinedDataType[];
  infoType: string;
};

export const DataList = ({ data, infoType }: Props) => {
  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  return (
    <>
      <div className="flex justify-between items-center px-48 pt-10 max-lg:px-[5%]">
        <Title text={`My ${infoType} list`} textSize="text-3xl" />
        <Link href={`/${infoType}`}>
          <CustomButton
            title={`Add new ${infoType}`}
            endIcon={<PlusIcon width={20} height={20} />}
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4 my-8 mx-10">
        {data && data.length === 0 ? (
          <EmptyArraySection
            linkTo={`/${infoType}`}
            emptyTitle="Your list is empty."
            emptySubtitle="Add your first title"
            icon={<PlusCircleIcon width={60} height={60} />}
          />
        ) : (
          data?.map((item: CombinedDataType) => (
            <div className="max-lg:px-[5%] max-lg:gap-5" key={item.id}>
              <TierCard item={item} isMobile={isMobile} />
            </div>
          ))
        )}
      </div>
    </>
  );
};
