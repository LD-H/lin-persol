import { Link } from 'react-router-dom'

export default function Home() {
  const skills = ['React', 'TypeScript', 'Node.js', 'MySQL', 'Docker', 'Git']
  const projects = [
    {
      name: '个人网站',
      desc: '基于 React + Node.js + 阿里云 OSS 搭建的个人网站，支持图片上传和管理',
      tech: ['React', 'Node.js', 'MySQL', 'OSS'],
    },
    {
      name: '更多项目',
      desc: '持续更新中...',
      tech: [],
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          L
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Hi, 我是 <span className="text-purple-600 dark:text-purple-400">Lin</span> 👋
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          一名热爱技术的全栈开发者，喜欢用代码解决实际问题，持续学习前端工程化与云原生技术。
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/about"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            了解更多
          </Link>
          <Link
            to="/gallery"
            className="px-6 py-3 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
          >
            查看相册
          </Link>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          技术栈
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map(skill => (
            <span
              key={skill}
              className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          项目展示
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div
              key={project.name}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-500 transition-colors bg-white dark:bg-gray-900 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
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
  )
}
