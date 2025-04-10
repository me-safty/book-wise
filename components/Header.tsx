"use client"

import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { cn } from "../lib/utils"
import { usePathname } from "next/navigation"
const links = [
  {
    href: "/library",
    label: "Library",
  },
]
export const Header: FC = () => {
  const pathName = usePathname()
  return (
    <header className="my-10 flex justify-center gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="BookWise" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={cn(
                "text-base cursor-pointer capitalize",
                link.href === pathName ? "text-light-200" : "text-light-100"
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
