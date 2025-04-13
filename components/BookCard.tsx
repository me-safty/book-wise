import Link from "next/link"
import { FC } from "react"
import { cn } from "../lib/utils"
import { BookCover } from "./BookCover"
import { Button } from "./ui/button"
import Image from "next/image"
import { Book } from "../types"
type BookCardProps = Pick<
  Book,
  "id" | "coverColor" | "coverUrl" | "isLoanedBook" | "title" | "genre"
>

export const BookCard: FC<BookCardProps> = ({
  id,
  coverColor,
  coverUrl,
  isLoanedBook,
  title,
  genre,
}) => (
  <Link
    className={cn(isLoanedBook && "w-full flex flex-col items-center")}
    href={`/books/${id}`}
    key={id}
  >
    <BookCover
      coverColor={coverColor}
      coverUrl={coverUrl}
    />
    <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
      <p className="book-title">{title}</p>
      <p className="book-genre">{genre}</p>
    </div>
    {isLoanedBook && (
      <div className="mt-3 w-full">
        <div className="book-loaned">
          <Image
            src="/icons/calendar.svg"
            alt="calendar"
            width={18}
            height={18}
            className="object-contain"
          />
          <p className="text-light-100">11 days left to return</p>
        </div>

        <Button className="book-btn">Download receipt</Button>
      </div>
    )}
  </Link>
)
