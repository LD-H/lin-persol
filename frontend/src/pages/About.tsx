const skillBars = [
  { label: '前端框架', value: 'React / Vue3 / TypeScript',     level: 90 },
  { label: '工程化',   value: 'Vite / Webpack / Umi / Taro',  level: 82 },
  { label: '后端',     value: 'Node.js / Express / Prisma',    level: 72 },
  { label: '数据库',   value: 'MySQL / Redis',                  level: 68 },
  { label: 'AI 工具',  value: 'Claude / Gemini / MCP',         level: 85 },
]

const timeline = [
  {
    period: '2023.04 — 至今',
    company: '网易游戏（网易互娱）',
    role: '前端开发工程师',
    desc: '负责游戏客服系统、绩效系统、风控系统等多个核心业务，日均支撑 5000+ 会话量，风险拦截准确率 96%。',
  },
  {
    period: '2020.10 — 2023.03',
    company: '京东集团（京东零售）',
    role: 'Web 前端开发工程师（校招）',
    desc: '参与京东万商 B2B 商城微前端架构建设及 O2O 门店详情页开发，优化核心算法复杂度从 O(n⁴) 降至 O(n²)。',
  },
]

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#080809] text-white overflow-hidden">

      {/* 背景网格 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%,#000 60%,transparent 100%)',
        }}
      />
      <div className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-purple-600/15 blur-[100px]" />

      <div className="relative max-w-3xl mx-auto px-6 py-24 space-y-6">

        {/* ── Header ── */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">About</p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">关于我</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
            一名有 4 年以上经验的前端开发工程师，先后在京东、网易游戏参与大型 Web 项目开发。
            热衷于用代码解决真实问题，对 AI 工具与现代工程化有浓厚兴趣。
          </p>
        </div>

        {/* ── 基本信息 ── */}
        <section className="p-6 rounded-xl border border-white/8 bg-white/[0.03]">
          <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-5">Basic Info</h2>
          <dl className="space-y-3">
            {[
              { dt: '姓名', dd: 'Lin' },
              { dt: '方向', dd: '前端开发 / 全栈探索' },
              { dt: '经验', dd: '4 年以上' },
              { dt: '爱好', dd: '编程、摄影、阅读' },
            ].map(({ dt, dd }) => (
              <div key={dt} className="flex gap-6 text-sm">
                <span className="w-14 shrink-0 text-gray-500">{dt}</span>
                <span className="text-gray-300">{dd}</span>
              </div>
            ))}
          </dl>
        </section>

        {/* ── 工作经历时间线 ── */}
        <section className="p-6 rounded-xl border border-white/8 bg-white/[0.03]">
          <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-5">Experience</h2>
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-white/8 mt-2" />}
                </div>
                <div className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{item.company}</span>
                    <span className="text-xs text-purple-400">{item.role}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{item.period}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 技能条 ── */}
        <section className="p-6 rounded-xl border border-white/8 bg-white/[0.03]">
          <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-5">Skills</h2>
          <div className="space-y-5">
            {skillBars.map(({ label, value, level }) => (
              <div key={label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">{label}</span>
                  <span className="text-xs text-gray-600">{value}</span>
                </div>
                <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${level}%`, background: 'linear-gradient(90deg,#a855f7,#ec4899)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 联系方式 ── */}
        <section className="p-6 rounded-xl border border-white/8 bg-white/[0.03]">
          <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-5">Contact</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/LD-H"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 bg-white/[0.03] text-sm text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-200"
            >
              🐙 <span>GitHub</span>
            </a>
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/8 bg-white/[0.03] text-sm text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all duration-200"
            >
              📧 <span>Email</span>
            </a>
            <a
              href="/lin-persol/resume"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/30 bg-purple-500/5 text-sm text-purple-400 hover:text-purple-300 hover:border-purple-400/50 transition-all duration-200"
            >
              📄 <span>查看完整简历</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}