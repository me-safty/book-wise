import { config } from "../../../../config"
import { getUploadAuthParams } from "@imagekit/next/server"

const { publicKey, privateKey } = config.env.imageKit

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey,
    publicKey,
  })
  return Response.json({ token, expire, signature, publicKey })
}
