"use client";

import Image from "next/image";
import { Toaster, toast } from "sonner";
import CardButtons from "./CardButtons";
import { JikanAnimeData } from "@/app/types/jikanAPITypes";
import { isMobile } from "react-device-detect";
import { useState } from "react";
import Modal from "../Modal";
import { mohaveFont } from "@/app/lib/fonts";
import { Button } from "@nextui-org/react";
import CardSelectRank from "./CardSelectRank";
import { addAnimeToFav } from "@/actions/add-anime-to-fav";
import { addMangaToFav } from "@/actions/add-manga-to-fav";
import { usePathname } from "next/navigation";

type Props = {
  item: JikanAnimeData;
  itemIds: (number | null)[];
};

export default function CardItem({ item, itemIds }: Props) {
  const existingIds = itemIds.includes(item.mal_id);
  const [tier, setTier] = useState<TierEnum | null>(null);
  const [lastCallTime, setLastCallTime] = useState(0);

  const pathname = usePathname();
  const isAnimePage = pathname?.startsWith("/anime");

  const title = item.title as string | null;
  const image_url = item.images.jpg.large_image_url as string | null;
  const title_id = item.mal_id as number;

  const handleAdd = async () => {
    const currentTime = Date.now();
    if (currentTime - lastCallTime >= 1000) {
      if (isAnimePage) {
        const response = await addAnimeToFav({
          title_id,
          title,
          image_url,
          tier,
        })
          .then((val) => {
            toast.success(val?.message);
          })
          .catch((error) => toast.error(error));
      } else {
        const response = await addMangaToFav({
          title_id,
          title,
          image_url,
          tier,
        })
          .then((val) => {
            toast.success(val?.message);
          })
          .catch((error) => toast.error(error));
      }
      setLastCallTime(currentTime);
    } else {
      toast.message("Don't spam!");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    isMobile && setIsModalOpen(true);
  };

  const closeModal = () => {
    isMobile && setIsModalOpen(false);
  };

  return (
    <>
      <div
        key={item.mal_id}
        className="outerDiv w-[400px] h-[600px] relative text-slate-50 p-5 text-center max-md:w-[180px] max-md:h-[230px]"
        onClick={openModal}
      >
        <CardButtons item={item} existingIds={existingIds} />

        <Image
          src={item.images.jpg.large_image_url}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
          className={`imageClass rounded-xl shadow-lg brightness-100"`}
        />

        <Toaster richColors />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={item.title}
        imageLink={item.images.jpg.large_image_url}
        altImage={item.title}
      >
        <h2
          className={`text-4xl max-md:text-lg cursor-default ${mohaveFont.className}`}
        >
          {item.title}
          {!existingIds && <CardSelectRank setRank={setTier} />}
          <div className="w-full flex gap-4 mt-2">
            <Button
              variant="solid"
              color="primary"
              fullWidth
              disabled={existingIds}
              className="disabled:bg-slate-600 disabled:brightness-50"
              onClick={handleAdd}
            >
              {`${!existingIds ? "Add to list" : "Already exist"}`}
            </Button>
            <Button
              variant="bordered"
              color="danger"
              fullWidth
              onClick={closeModal}
            >
              Cancel
            </Button>
          </div>
        </h2>
      </Modal>
    </>
  );
}
