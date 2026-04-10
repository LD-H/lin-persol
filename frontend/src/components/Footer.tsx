export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>© {new Date().getFullYear()} Lin's Space. Built with React + Node.js + Aliyun OSS</p>
    </footer>
  )
}
