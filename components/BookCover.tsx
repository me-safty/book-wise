import { FC } from "react"
import { cn } from "../lib/utils"
import { BookCoverSvg } from "./BookCoverSvg"
import Image from "next/image"

export enum BookCoverVariant {
  ExtraSmall,
  Small,
  Medium,
  Regular,
  Wide,
}

const variantStyles: Record<BookCoverVariant, string> = {
  [BookCoverVariant.ExtraSmall]: "book-cover_extra_small",
  [BookCoverVariant.Small]: "book-cover_small",
  [BookCoverVariant.Medium]: "book-cover_medium",
  [BookCoverVariant.Regular]: "book-cover_regular",
  [BookCoverVariant.Wide]: "book-cover_wide",
}

interface BookCoverProps {
  className?: string
  variant?: BookCoverVariant
  coverColor: string
  coverUrl: string
}

export const BookCover: FC<BookCoverProps> = ({
  className,
  variant = BookCoverVariant.Regular,
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400x600",
}) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          className="select-none"
          src={coverUrl}
          fill
          alt="book cover"
        />
      </div>
    </div>
  )
}
