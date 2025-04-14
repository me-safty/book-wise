import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/next"

const authenticator = async () => {
  try {
    const response = await fetch("/api/auth/imagekit")
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      )
    }
    const data = await response.json()
    const { signature, expire, token, publicKey } = data
    return { signature, expire, token, publicKey }
  } catch (error) {
    // console.error("Authentication error:", error)
    throw new Error(`Authentication request failed: ${error}`)
  }
}

export const handleUpload = async (
  file: File,
  setProgress: (progress: number) => void,
  onSuccess: (filePath: string) => void,
  onError: (message: string) => void
) => {
  if (!file) return
  let authParams
  try {
    authParams = await authenticator()
  } catch (authError) {
    onError(`Failed to authenticate for upload: ${authError}`)
    return
  }
  const { signature, expire, token, publicKey } = authParams
  try {
    const uploadResponse = await upload({
      expire,
      token,
      signature,
      publicKey,
      file,
      fileName: file.name,
      onProgress: (event) => {
        setProgress((event.loaded / event.total) * 100)
      },
      // Abort signal to allow cancellation of the upload if needed.
      // abortSignal: abortController.signal,
    })
    if (uploadResponse.filePath) {
      onSuccess(uploadResponse.filePath)
    }
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      onError(`Upload aborted: ${error.reason}`)
    } else if (error instanceof ImageKitInvalidRequestError) {
      onError(`Invalid request: ${error.message}`)
    } else if (error instanceof ImageKitUploadNetworkError) {
      onError(`Network error: ${error.message}`)
    } else if (error instanceof ImageKitServerError) {
      onError(`Server error: ${error.message}`)
    } else {
      onError(`Upload error: ${error}`)
    }
  }
}
