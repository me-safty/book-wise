import { FC } from "react"
import { Book } from "../types"
import { BookCard } from "./BookCard"
interface BookListProps {
  books: Book[]
  title: string
}
export const BookList: FC<BookListProps> = ({ books, title }) => {
  return (
    <section className="mt-20">
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
          />
        ))}
      </div>
    </section>
  )
}
