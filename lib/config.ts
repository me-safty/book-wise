export const config = {
  env: {
    databaseUrl: process.env.DATABASE_URL!,
    apiUrl: process.env.NEXT_PUBLIC_API_URL!,
    imageKit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    upstash: {
      redis: {
        url: process.env.UPSTASH_REDIS_URL!,
        token: process.env.UPSTASH_REDIS_TOKEN!,
      },
      qstash: {
        url: process.env.QSTASH_URL!,
        token: process.env.QSTASH_TOKEN!,
      },
    },
  },
}
