"use client"

import { Button } from "../components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <>
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </>
  )
}
