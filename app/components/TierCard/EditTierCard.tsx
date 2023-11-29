"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { updateAnime } from "@/actions/update-anime-in-fav";
import { updateManga } from "@/actions/update-manga-in-fav";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";
import { CombinedDataType } from "@/app/global";

export default function EditSection({ item }: { item: CombinedDataType }) {
  const [review, setReview] = useState<string>(item.review_text || "");
  const item_id = item.id;
  const pathname = usePathname();

  const isUserPage = pathname?.startsWith("/user");
  const isAnimePage = pathname?.startsWith("/mylist/anime");

  const createReview = async () => {
    if (isAnimePage) {
      updateAnime({ item_id, review_text: review }).then((val) => {
        val?.status === 200
          ? toast.success(val?.message)
          : toast.error(val?.error);
      });
    } else {
      updateManga({ item_id, review_text: review }).then((val) => {
        val?.status === 200
          ? toast.success(val?.message)
          : toast.error(val?.error);
      });
    }
  };

  return (
    <div className="flex items-end">
      <textarea
        id="review"
        value={review || ""}
        onChange={(e) => setReview(e.target.value)}
        className="w-3/4 resize-none block p-2.5 focus:outline-none rounded-lg border-b-[1px] border-l-[1px] max-h-[100px] bg-transparent max-md:w-full"
        rows={4}
        placeholder={
          !isUserPage ? "You can write your opinion about that anime..." : ""
        }
        readOnly={isUserPage}
      />
      {!isUserPage && (
        <Button
          isIconOnly
          color="primary"
          className="ml-2"
          disabled={isUserPage}
        >
          <PaperAirplaneIcon width={25} height={25} onClick={createReview} />
        </Button>
      )}
    </div>
  );
}
