import Image from "next/image"
import { FC, PropsWithChildren } from "react"
import { auth } from "../../auth"
import { redirect } from "next/navigation"

const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth()
  if (session) redirect("/")
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={37}
              height={37}
            />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>
          {children}
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/books.jpg"
          alt="auth illustration"
          quality={60}
          loading="lazy"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  )
}

export default Layout
