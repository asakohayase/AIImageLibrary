"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { navLinks } from "@/constants";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link className="flex items-center gap-2 md:py-2" href="/">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger asChild>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              ></Image>
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={152}
                  height={23}
                />
                <ul className="header-nav_elements">
                  {navLinks.slice(0, 6).map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li
                        key={link.route}
                        className={clsx(
                          "p-18 flex whitespace-nowrap text-dark-700",
                          {
                            "gradient-text": isActive,
                          }
                        )}
                      >
                        <Link
                          href={link.route}
                          className="sidebar-link cursor-pointer"
                        >
                          <Image
                            src={link.icon}
                            alt="logo"
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
