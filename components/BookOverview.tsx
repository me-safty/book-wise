import { FC } from "react"
import Image from "next/image"
import { Button } from "./ui/button"
import { BookCover, BookCoverVariant } from "./BookCover"
import { Book } from "../types"
export const BookOverview: FC<Book> = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
}) => {
  return (
    <section className="book-overview">
      <div className="flex flex-col flex-1 gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="text-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category:{" "}
            <span className="text-semibold text-light-200">{genre}</span>
          </p>
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              width={22}
              height={22}
              alt="Star"
            />
            <p>
              <span className="text-light-200 text-semibold">{rating}</span>
            </p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Books{" "}
            <span className="text-light-200 text-semibold">{totalCopies}</span>
          </p>
          <p>
            Available Copies{" "}
            <span className="text-light-200 text-semibold">
              {availableCopies}
            </span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        <Button className="book-overview_btn">
          <Image
            src="/icons/book.svg"
            width={20}
            height={20}
            alt="book"
          />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant={BookCoverVariant.Wide}
            className="z-10"
            coverColor={coverColor}
            coverUrl={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant={BookCoverVariant.Wide}
              coverColor={coverColor}
              coverUrl={coverUrl}
              className="blur-[2px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
