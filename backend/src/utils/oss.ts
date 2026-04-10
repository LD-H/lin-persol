import OSS from 'ali-oss'

// 创建 OSS 客户端实例（单例）
const client = new OSS({
  region: process.env.OSS_REGION!,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: process.env.OSS_BUCKET!,
})

/**
 * 上传文件到 OSS
 * @param ossKey - OSS 中的存储路径，如 photos/2024/abc.jpg
 * @param fileBuffer - 文件二进制内容
 * @returns 文件访问 URL
 */
export async function uploadToOSS(ossKey: string, fileBuffer: Buffer): Promise<string> {
  await client.put(ossKey, fileBuffer)
  return `${process.env.OSS_BASE_URL}/${ossKey}`
}

/**
 * 从 OSS 删除文件
 * @param ossKey - OSS 中的存储路径
 */
export async function deleteFromOSS(ossKey: string): Promise<void> {
  await client.delete(ossKey)
}
