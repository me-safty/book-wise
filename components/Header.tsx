"use client"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { cn, getInitChars } from "../lib/utils"
import { usePathname } from "next/navigation"
import { AvatarFallback, Avatar } from "./ui/avatar"
import { Session } from "next-auth"
const links = [
  {
    href: "/library",
    label: "Library",
  },
]
interface HeaderProps {
  session: Session
  imgUrl: string
}
export const Header: FC<HeaderProps> = ({ session, imgUrl }) => {
  const pathName = usePathname()
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image
          src="/icons/logo.svg"
          alt="BookWise"
          width={40}
          height={40}
        />
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
        <li className="">
          <Link href="/profile">
            <Avatar>
              {/* <AvatarImage src={imgUrl} /> */}
              <AvatarFallback className="bg-amber-100 text-sm">
                {getInitChars(session.user?.name as string)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  )
}
