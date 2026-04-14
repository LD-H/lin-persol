import OSS from 'ali-oss'

// 懒加载单例，只有真正使用时才初始化
let client: OSS | null = null

function getClient(): OSS {
  if (!client) {
    const { OSS_REGION, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_BUCKET } = process.env
    if (!OSS_REGION || !OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_BUCKET) {
      throw new Error('OSS 环境变量未配置：需要 OSS_REGION / OSS_ACCESS_KEY_ID / OSS_ACCESS_KEY_SECRET / OSS_BUCKET')
    }
    client = new OSS({
      region: OSS_REGION,
      accessKeyId: OSS_ACCESS_KEY_ID,
      accessKeySecret: OSS_ACCESS_KEY_SECRET,
      bucket: OSS_BUCKET,
    })
  }
  return client
}

/**
 * 上传文件到 OSS
 * @param ossKey - OSS 中的存储路径，如 photos/2024/abc.jpg
 * @param fileBuffer - 文件二进制内容
 * @returns 文件访问 URL
 */
export async function uploadToOSS(ossKey: string, fileBuffer: Buffer): Promise<string> {
  await getClient().put(ossKey, fileBuffer)
  return `${process.env.OSS_BASE_URL}/${ossKey}`
}

/**
 * 从 OSS 删除文件
 * @param ossKey - OSS 中的存储路径
 */
export async function deleteFromOSS(ossKey: string): Promise<void> {
  await getClient().delete(ossKey)
}