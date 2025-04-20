"use client"

import { AuthForm, FormType } from "../../../components/form/AuthForm"
import { signUp } from "../../../lib/actions/auth"
import { signupSchema } from "../../../lib/validation"

export default function Page() {
  return (
    <AuthForm
      type={FormType.Signup}
      defaultValues={{
        email: "",
        fullName: "",
        universityId: 0,
        password: "",
        universityCard: "",
      }}
      schema={signupSchema}
      onSubmit={signUp}
    />
  )
}
