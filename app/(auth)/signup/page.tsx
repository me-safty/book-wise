"use client"

import { AuthForm, FormType } from "../../../components/form/AuthForm"
import { signupSchema } from "../../../lib/validation"

export default function Page() {
  return (
    <AuthForm
      type={FormType.Signup}
      defaultValues={{
        email: "",
        fullname: "",
        universityId: 0,
        password: "",
        universityCard: "",
      }}
      schema={signupSchema}
      onSubmit={() => {}}
    />
  )
}
