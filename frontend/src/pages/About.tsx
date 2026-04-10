export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">关于我</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">Hello, nice to meet you!</p>

      <div className="space-y-10">
        {/* 基本介绍 */}
        <section className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📋 基本信息</h2>
          <dl className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex gap-4">
              <dt className="font-medium text-gray-800 dark:text-gray-300 w-16 shrink-0">姓名</dt>
              <dd>Lin</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-medium text-gray-800 dark:text-gray-300 w-16 shrink-0">方向</dt>
              <dd>全栈开发 / 云原生</dd>
            </div>
            <div className="flex gap-4">
              <dt className="font-medium text-gray-800 dark:text-gray-300 w-16 shrink-0">爱好</dt>
              <dd>编程、摄影、阅读</dd>
            </div>
          </dl>
        </section>

        {/* 技能 */}
        <section className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🛠 技术能力</h2>
          <div className="space-y-3 text-sm">
            {[
              { label: '前端', value: 'React / TypeScript / Vite / TailwindCSS', level: 85 },
              { label: '后端', value: 'Node.js / Express / REST API', level: 75 },
              { label: '数据库', value: 'MySQL / Prisma ORM', level: 70 },
              { label: '云服务', value: '阿里云 OSS / ECS', level: 65 },
            ].map(({ label, value, level }) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800 dark:text-gray-300">{label}</span>
                  <span className="text-gray-400 text-xs">{value}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 联系方式 */}
        <section className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📬 联系方式</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              🐙 GitHub
            </a>
            <a
              href="mailto:your@email.com"
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              📧 Email
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
