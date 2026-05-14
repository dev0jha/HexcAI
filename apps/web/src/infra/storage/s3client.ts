import "server-only"

import {
   CreateBucketCommand,
   CreateBucketCommandOutput,
   DeleteObjectCommand,
   PutObjectCommand,
   S3Client,
} from "@aws-sdk/client-s3"
import { attempt } from "@/utils/attempt"

const BUCKET = "profile-pics"

class AssetStorage {
   #s3: S3Client | null = null
   #initPromise: Promise<void> | null = null

   #getClient(): S3Client {
      if (!this.#s3) {
         const endpoint = process.env.OBJECT_STORAGE_ENDPOINT
         if (!endpoint) {
            throw new Error("OBJECT_STORAGE_ENDPOINT environment variable is not set")
         }

         this.#s3 = new S3Client({
            region: "us-east-1",
            endpoint,
            forcePathStyle: true,
            credentials: {
               accessKeyId: "rustfsadmin",
               secretAccessKey: "rustfsadmin",
            },
         })
      }
      return this.#s3
   }

   async ensureBucketExists() {
      if (this.#initPromise) return this.#initPromise

      this.#initPromise = (async () => {
         const creationRes = await attempt<CreateBucketCommandOutput, Error>(() =>
            this.#getClient().send(new CreateBucketCommand({ Bucket: BUCKET }))
         )

         if (!creationRes.ok) {
            const err = creationRes.error

            if (err?.name !== "BucketAlreadyOwnedByYou" && err?.name !== "BucketAlreadyExists") {
               this.#initPromise = null
               throw err
            }
         }

         console.log("[STORAGE] bucket ready!!")
      })()

      return this.#initPromise
   }

   public async uploadAsset(key: string, body: Buffer | Uint8Array | string, contentType?: string) {
      await this.ensureBucketExists()

      await this.#getClient().send(
         new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: body,
            ContentType: contentType,
         })
      )

      return this.getPublicURL(key)
   }

   getPublicURL(key: string) {
      return `${process.env.OBJECT_STORAGE_ENDPOINT}/${BUCKET}/${key}`
   }

   public async deleteAsset(key: string) {
      await this.ensureBucketExists()

      await this.#getClient().send(
         new DeleteObjectCommand({
            Bucket: BUCKET,
            Key: key,
         })
      )
   }
}

export const staticAssetStorage = new AssetStorage()
