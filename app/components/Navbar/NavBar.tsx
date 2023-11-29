"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import ThemeButton from "../ThemeButton";
import { Session } from "@supabase/supabase-js";
import { Button } from "@nextui-org/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import BurgerMenu from "./BurgerMenu";

type SessionNav = {
  session?: Session | null;
  profile?: Profile | null;
};

const NavBar = ({ session, profile }: SessionNav) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-[9999] relative h-[80px]">
      <div className="h-2 fixed w-full bg-gradient-to-r from-emerald-500 via-violet-500 to-teal-500"></div>
      <div className="h-[4px] fixed w-full bg-gradient-to-r from-emerald-500 via-violet-500 to-teal-500 z-10"></div>
      <div className="px-[10%] h-[80px] flex justify-between items-center text-slate-700 border-b-slate-300 border-b-[1px] fixed w-full backdrop-blur-lg">
        <Link href="/">
          <div className="font-bold text-blue-500">
            CATO
            <span className="bg-yellow-400 text-slate-100 dark:text-slate-800 px-1 ml-[2px]">
              LIST
            </span>
          </div>
        </Link>
        {session && (
          <div className="flex gap-5 items-center max-md:hidden">
            <Link href="/mylist/anime">
              <div className="text-base text-slate-800 dark:text-slate-200">
                My anime
              </div>
            </Link>
            <span className="text-3xl text-slate-800 dark:text-slate-200">
              /
            </span>
            <Link href="/mylist/manga">
              <div className="text-base text-slate-800 dark:text-slate-200">
                My manga
              </div>
            </Link>
          </div>
        )}
        <div className="flex gap-7 items-center max-md:hidden">
          {session && (
            <Link href="/account">
              <div>Hi, {profile?.nickname}</div>
            </Link>
          )}
          <ThemeButton />
        </div>
        <Button
          isIconOnly
          onClick={toggleMenu}
          className="md:hidden dark:bg-[#1a1625]"
        >
          <Bars3Icon width={25} height={25} />
        </Button>
      </div>
      {session && (
        <BurgerMenu toggleMenu={toggleMenu} isOpen={isOpen} menuRef={menuRef} />
      )}
    </div>
  );
};

export default NavBar;
