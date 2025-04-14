export const config = {
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    imageKit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_URL_PUBLIC_KEY!,
      privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_URL_PRIVATE_KEY!,
    },
  },
}
