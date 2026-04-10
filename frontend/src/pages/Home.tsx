import { Link } from 'react-router-dom'

const skills = [
  { name: 'React',      icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Node.js',    icon: '🟢' },
  { name: 'MySQL',      icon: '🐬' },
  { name: 'Docker',     icon: '🐳' },
  { name: 'Git',        icon: '📦' },
]

const projects = [
  {
    name: '个人网站',
    desc: '基于 React + Node.js + 阿里云 OSS 搭建的个人网站，支持图片上传和管理。',
    tech: ['React', 'Node.js', 'MySQL', 'OSS'],
  },
  {
    name: '更多项目',
    desc: '持续更新中...',
    tech: [],
  },
]

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#080809] text-white overflow-hidden">

      {/* 背景网格 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%,#000 60%,transparent 100%)',
        }}
      />

      {/* 顶部光晕 */}
      <div className="pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6 py-28">

        {/* ── Hero ── */}
        <section className="mb-28">
          {/* 状态徽章 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </div>

          <h1 className="text-6xl font-bold tracking-tight leading-tight mb-6">
            Hi, 我是{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#c084fc,#f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Lin
            </span>{' '}
            👋
          </h1>

          <p className="text-lg text-gray-400 max-w-xl leading-relaxed mb-10">
            一名热爱技术的全栈开发者，喜欢用代码解决实际问题，
            <br />持续探索前端工程化与云原生技术。
          </p>

          <div className="flex items-center gap-3">
            <Link
              to="/about"
              className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              了解更多 →
            </Link>
            <Link
              to="/gallery"
              className="px-5 py-2.5 border border-white/15 text-gray-300 rounded-lg text-sm font-medium hover:bg-white/5 hover:border-white/25 transition-all duration-200"
            >
              查看相册
            </Link>
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <section className="mb-28">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5">
            Tech Stack
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {skills.map(skill => (
              <div
                key={skill.name}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] hover:border-purple-500/30 transition-all duration-200 cursor-default"
              >
                <span className="text-2xl">{skill.icon}</span>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-5">
            Projects
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
              <div
                key={project.name}
                className="group relative p-6 rounded-xl border border-white/8 bg-white/[0.03] hover:border-purple-500/25 transition-all duration-200 overflow-hidden"
              >
                {/* hover 光晕 */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <h3 className="font-semibold text-white mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded-md border border-white/8 bg-white/5 text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}