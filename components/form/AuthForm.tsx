"use client"
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form"
import { ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import Link from "next/link"
import { FIELD_NAMES, FIELD_TYPES } from "../../constants"
import { UploadImage } from "./UploadImage"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export enum FormType {
  Login,
  Signup,
}

interface AuthFormProps<T extends FieldValues> {
  type: FormType
  defaultValues: T
  schema: ZodType<T>
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
}

export const AuthForm = <T extends FieldValues>({
  type,
  defaultValues,
  schema,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter()
  const isLogin = type === FormType.Login
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })
  const onSubmitHandler: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data)
    if (result.success) {
      toast.success("Success", {
        description: isLogin
          ? "You have successfully logged in"
          : "You have successfully signed up",
      })
      router.push("/")
    } else {
      toast.error(`Error ${isLogin ? "logging in" : "signing up"}`, {
        description: result.error,
      })
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isLogin
          ? "Welcome Back to the BookWise"
          : "Create Your Library Account"}
      </h1>
      <p className="text-light-100">
        {isLogin
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[name]}
                  </FormLabel>
                  <FormControl>
                    {name === "universityCard" ? (
                      <UploadImage onFileChange={field.onChange} />
                    ) : (
                      <Input
                        className="form-input"
                        required
                        type={FIELD_TYPES[name]}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            className="form-btn"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
          <p className="text-center text-base font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              className="font-bold text-primary"
              href={isLogin ? "/signup" : "/login"}
            >
              {isLogin ? "Register Here" : "Login"}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}
