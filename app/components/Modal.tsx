"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef } from "react";
import { JikanAnimeData } from "../types/jikanAPITypes";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string | React.JSX.Element;
  imageLink?: string | StaticImport;
  altImage?: string;
  modalShadow?: string;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  imageLink,
  altImage,
  children,
  modalShadow,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="modal fixed inset-0 z-[1] overflow-y-auto bg-background bg-opacity-50 flex justify-center items-center backdrop-filter backdrop-blur-sm">
          <div
            className={`bg-background rounded-lg w-full mx-5 relative shadow-medium ${
              modalShadow && `shadow-2xl shadow-[${modalShadow}]`
            }`}
            ref={modalRef}
          >
            <div className="relative h-40 w-full">
              <Image
                src={imageLink as string}
                alt={altImage as string}
                fill
                style={{ objectFit: "cover" }}
                className="imageClass rounded-t-lg"
              />
              <div className="absolute inset-0 flex justify-between gap-6 p-6 z-30">
                <div>{title}</div>
                <XMarkIcon
                  width={25}
                  height={25}
                  onClick={onClose}
                  className="hover: cursor-pointer"
                />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-100"
                style={{ bottom: "-1px" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-transparent to-background opacity-50"
                style={{ bottom: "-1px" }}
              />
            </div>
            <div className="flex flex-col relative p-6">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
