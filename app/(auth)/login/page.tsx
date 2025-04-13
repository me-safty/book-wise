"use client"
import { AuthForm, FormType } from "../../../components/form/AuthForm"
import { loginSchema } from "../../../lib/validation"

export default function Page() {
  return (
    <AuthForm
      type={FormType.Login}
      defaultValues={{
        email: "",
        password: "",
      }}
      schema={loginSchema}
      onSubmit={() => {}}
    />
  )
}
