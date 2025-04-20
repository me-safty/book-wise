"use client"

import { FC, MouseEvent, useRef, useState } from "react"
import { Image as IKImage } from "@imagekit/next"
import { cn } from "../../lib/utils"
import { config } from "../../lib/config"
import { toast } from "sonner"
import { handleUpload } from "../../lib/imagekit"
import Image from "next/image"

interface UploadImageProps {
  variant?: "dark" | "light"
  onFileChange: (filePath: string) => void
}

export const UploadImage: FC<UploadImageProps> = ({
  variant = "dark",
  onFileChange,
}) => {
  const [progress, setProgress] = useState(0)
  const [filePath, setFilePath] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  }
  const handleUploadBtnClick = (e: MouseEvent) => {
    e.preventDefault()
    if (fileInputRef.current) fileInputRef.current.click()
  }
  const onSuccess = (filePath: string) => {
    setFilePath(filePath)
    onFileChange(filePath)
    toast.success("File uploaded successfully", {
      description: `${filePath} uploaded`,
    })
  }
  const onError = (message: string) => toast.error(message)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProgress(0)
      handleUpload(file, setProgress, onSuccess, onError)
    }
  }
  return (
    <>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <button
        className={cn("upload-btn cursor-pointer", styles.button)}
        onClick={handleUploadBtnClick}
      >
        <Image
          src="icons/upload.svg"
          alt="Upload"
          className="object-contain"
          quality={65}
          width={20}
          height={20}
        />
        <p className={cn("text-base", styles.placeholder)}>Upload a file</p>
      </button>
      {filePath && (
        <>
          <IKImage
            urlEndpoint={config.env.imageKit.urlEndpoint}
            src={filePath}
            alt="Uploaded file"
            className="object-fill mt-1"
            quality={65}
            width={500}
            height={300}
          />
          <p className="upload-filename truncate max-w-[500px]">{filePath}</p>
        </>
      )}
    </>
  )
}
