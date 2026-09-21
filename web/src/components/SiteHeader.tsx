"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
] as const;

function MenuIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.5 3.25h13M1.5 8h13M1.5 12.75h13"
        stroke="#C1CC6C"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3l10 10M13 3L3 13"
        stroke="#C1CC6C"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#1e1d22]/backdrop-blur-[6px]">
      <div className="mx-auto flex h-[99px] w-full max-w-[1280px] items-center justify-between px-8 pr-[35px]">
        <Link href="/" className="relative h-[82px] w-[90px] shrink-0">
          <Image
            src="/brand/logo.jpg"
            alt="Balearbol"
            fill
            priority
            sizes="90px"
            className="object-contain"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 pr-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-base font-semibold leading-6 tracking-[-0.4px] transition-colors ${
                  isActive
                    ? "border-b-2 border-[#c1cc6c] pb-1.5 text-[#c1cc6c]"
                    : "text-white hover:text-[#c1cc6c]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-[6px] bg-[#c1cc6c] px-6 py-2 font-sans text-base font-semibold leading-6 text-[#1e1d22] transition-opacity hover:opacity-90 md:inline-flex"
        >
          Contact Us
        </Link>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-[#1e1d22] px-8 py-6 md:hidden"
        >
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-base font-semibold tracking-[-0.4px] ${
                    isActive ? "text-[#c1cc6c]" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-2 inline-flex w-fit rounded-[6px] bg-[#c1cc6c] px-6 py-2 font-sans text-base font-semibold text-[#1e1d22]"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
