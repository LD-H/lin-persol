import OSS from 'ali-oss'

// 懒加载单例，只有真正使用时才初始化
let client: InstanceType<typeof OSS> | null = null   // ← 改这里

function getClient(): InstanceType<typeof OSS> {     // ← 改这里
  if (!client) {
    const { OSS_REGION, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_BUCKET } = process.env
    if (!OSS_REGION || !OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_BUCKET) {
      throw new Error('OSS 环境变量未配置')
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

export async function uploadToOSS(ossKey: string, fileBuffer: Buffer): Promise<string> {
  await getClient().put(ossKey, fileBuffer)
  return `${process.env.OSS_BASE_URL}/${ossKey}`
}

export async function deleteFromOSS(ossKey: string): Promise<void> {
  await getClient().delete(ossKey)
}