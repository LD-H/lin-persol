export default function Resume() {
  return (
    <div className="relative min-h-screen bg-[#080809] text-white overflow-hidden">

      {/* 背景网格 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 40% at 50% 0%,#000 60%,transparent 100%)',
        }}
      />
      <div className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-purple-600/15 blur-[120px]" />

      <div className="relative max-w-3xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">Resume</p>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">个人简历</h1>
          <p className="text-sm text-gray-500">前端开发工程师 · 4年+ 经验</p>
        </div>

        {/* 个人技能 */}
        <Section title="个人技能" label="Skills">
          <ul className="space-y-3">
            {skills.map((skill, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                {skill}
              </li>
            ))}
          </ul>
        </Section>

        {/* 工作经历 */}
        <Section title="工作经历" label="Experience">
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i}>
                {/* 公司信息 */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-white">{exp.company}</h3>
                    <p className="text-sm text-purple-400 mt-0.5">{exp.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{exp.products}</p>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4 mt-1">{exp.period}</span>
                </div>

                {/* 技术栈 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded-md bg-white/5 border border-white/8 text-gray-400">
                      {t}
                    </span>
                  ))}
                </div>

                {/* 工作内容 */}
                <ul className="space-y-2">
                  {exp.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  )
}

function Section({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <div className="flex items-center gap-4 mb-6">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-600">{label}</p>
        <div className="flex-1 h-px bg-white/8" />
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {children}
    </div>
  )
}

const skills = [
  '熟悉 Less/Sass 和 JavaScript，熟悉 ES6 以及 TypeScript 的使用，能熟练开发符合 W3C 规范及兼容主流浏览器的页面，具有良好的编码习惯。',
  '熟悉前端 MVVM 模式，理解 Vue/React 的基本思想，了解 Webpack、Vite、Umi 等自动化构建工具，对 Node.js 有一定的认识。',
  '熟悉 Git 的常见指令，能使用 Git 进行项目代码托管与多人协作开发。',
  '熟悉多种主流 UI 框架，具有自己开发封装 UI 组件的经验，了解 Java 后台开发流程及数据流向。',
  '具有良好的数据结构和算法基础，了解多种设计模式，具有大型 Web 项目、移动端及 H5 项目开发经验。',
  '熟悉 AI 应用前端集成开发，运用 Skills 与智能体（Agent）自动化处理代码生成、调试与架构设计，打造高效现代研发范式。',
  '熟练运用 AI 编程助手（Gemini、Claude）提升开发效率，通过 MCP 等协议实现代码上下文感知、工具调用与环境交互的深度协同。',
]

const experiences = [
  {
    company: '网易游戏（网易互娱）',
    title: '前端开发工程师',
    period: '2023年4月 - 至今',
    products: '游戏客服系统 · 绩效系统 · 风控系统 · 赛事H5 · 图灵-SOP系统',
    tech: ['React', 'TypeScript', 'Umi.js', 'Vite', 'Modern.js'],
    items: [
      '客服系统（国服/海外）：负责在线客服体验优化，支撑日均 5000+ 会话量；完成评价筛选、服务记录等功能，质检效率提升 40%；Ctrl+V 快捷上传上线后单次操作减少 3 步，平均处理时长缩短 15s。',
      '参与消息会话核心功能开发（图片/视频/表情包/音频、红点未读、会话草稿）；完成工单系统多项迭代，处理效率提升 25%；主导维系中心 V1 迭代，接入 AIGC 知识库，首次响应准确率提升 20%。',
      '绩效系统：负责绩效规则设置模块，支持 50+ 产品线复杂配置；完成客服组长绩效计算功能，支撑 100+ 员工核算，人工核算时间从 2 天缩短至 2 小时；看板数据加载速度提升 50%，员工自助查询率提升至 85%。',
      '风控系统（v2.0–v5.18）：持续迭代核心功能，开发沉默策略兜底、动态熔断阈值等需求，风险拦截准确率提升至 96%，误判率降至 0.5% 以下，日均处理 1 万+ 风控决策；开发 AI 策略风险分析功能，策略配置效率提升 3 倍。',
      '完成第五人格海外胜率预测页面及永劫无间赛事 H5（含选手跳点地图等功能）。',
    ],
  },
  {
    company: '京东集团（京东零售）',
    title: 'Web 前端开发工程师（校招）',
    period: '2020年10月 - 2023年3月',
    products: '京东万商-B商城 · O2O门店详情页 · 七鲜后台',
    tech: ['Vue3', 'TypeScript', 'Micro-app', 'Taro', 'React'],
    items: [
      'B 商城采用 Micro-app 微前端架构，基于 Vue3 + TypeScript 开发，负责运营端商品限购、黑名单、人员组织行业模块，以及卖家端销售看板。',
      '开发类目通用组件，设计过滤数据算法，将处理函数时间复杂度从 O(n⁴) 降至 O(n²)，有效提升交互体验，减少保存等待卡死问题。',
      'O2O 门店详情页采用 React Hook + Taro 开发，编译为京东小程序及 H5 移动页面；通过监听滚动位置与模块距离计算，开发 tabs 定位与黏贴功能，设计合理防抖避免页面滚动卡顿。',
    ],
  },
]