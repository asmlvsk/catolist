"use client";

import {
  ArrowRightOnRectangleIcon,
  BookOpenIcon,
  HomeIcon,
  PlayIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import ThemeButton from "../ThemeButton";

type Props = {
  toggleMenu: () => void;
  isOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
};

export default function BurgerMenu({ toggleMenu, isOpen, menuRef }: Props) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, toggleMenu, menuRef]);

  const linkItem = (
    linkTo: string,
    linkTitle: string,
    icon: React.JSX.Element
  ) => {
    return (
      <>
        <div className="flex gap-2 hover:text-primary-200 cursor-pointer">
          {icon}
          <Link href={linkTo}>{linkTitle}</Link>
        </div>
        <Divider />
      </>
    );
  };

  return (
    <div className="md:hidden">
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 mt-[4px]" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={menuRef}
          className={`absolute top-0 left-0 w-full bg-background z-50 overflow-y-auto transition-all ease-in-out duration-300 ${
            isOpen ? "translate-y-0" : "h-0 -translate-y-full"
          }`}
        >
          <nav className="p-4 flex flex-col gap-3">
            <div className="flex w-full justify-end">
              <XMarkIcon
                width={25}
                height={25}
                onClick={toggleMenu}
                className="hover: cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-4">
              {linkItem("/", "Home", <HomeIcon width={25} height={25} />)}
              {linkItem(
                "/mylist/anime",
                "My anime",
                <PlayIcon width={25} height={25} />
              )}
              {linkItem(
                "/mylist/manga",
                "My manga",
                <BookOpenIcon width={25} height={25} />
              )}
              {linkItem(
                "/account",
                "Account",
                <UserCircleIcon width={25} height={25} />
              )}
              <div className="flex gap-2 hover:text-primary-200 cursor-pointer items-center">
                <ThemeButton text="Change theme" />
              </div>
              <Divider />
              <form
                action="/auth/signout"
                method="post"
                className="flex gap-2 hover:text-primary-200 cursor-pointer pb-2"
              >
                <ArrowRightOnRectangleIcon
                  width={25}
                  height={25}
                  type="submit"
                  className="cursor-pointer"
                />
                <p>Logout</p>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
