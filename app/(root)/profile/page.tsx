import { signOut } from "../../../auth"
import { BookList } from "../../../components/BookList"
import { Button } from "../../../components/ui/button"
import { sampleBooks } from "../../../constants"

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
      <BookList
        books={sampleBooks}
        title="Borrowed Books"
      />
    </>
  )
}
export default Page
