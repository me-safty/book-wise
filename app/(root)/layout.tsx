import { FC, PropsWithChildren } from "react"
import { Header } from "../../components/Header"
import { redirect } from "next/navigation"
import { auth } from "../../auth"
import { db } from "../../database/drizzle"
import { users } from "../../database/schema"
import { eq } from "drizzle-orm"
import { config } from "../../lib/config"

const { urlEndpoint } = config.env.imageKit
const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth()
  if (!session) redirect("/login")

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user?.email as string))
    .limit(1)

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header
          session={session}
          imgUrl={`${urlEndpoint}/${user[0].universityCard}`}
        />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  )
}

export default Layout
