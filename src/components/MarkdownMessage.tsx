'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownMessageProps = {
  content: string
  className?: string
}

export function MarkdownMessage({ content, className }: MarkdownMessageProps) {
  return (
    <div className={`markdown-message ${className ?? ''}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-2 mt-3 text-base font-bold leading-6 text-white first:mt-0">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-2 mt-3 text-sm font-bold leading-5 text-white first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-1.5 mt-3 text-sm font-semibold leading-5 text-gray-200 first:mt-0">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="my-2 text-sm leading-6 text-gray-300 first:mt-0 last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-2 ml-5 list-disc space-y-1 text-sm leading-6 text-gray-300 marker:text-[#3b82f6]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 ml-5 list-decimal space-y-1 text-sm leading-6 text-gray-300 marker:text-gray-500">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
          code: ({ children, className: codeClassName }) => {
            const isBlock = codeClassName?.includes('language-')
            if (isBlock) {
              return (
                <code className="block whitespace-pre-wrap break-words bg-white/10 px-2 py-1 font-mono text-[11px] text-gray-200">
                  {children}
                </code>
              )
            }
            return (
              <code className="bg-[#13213d] px-1 py-0.5 font-mono text-[11px] text-[#93c5fd]">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="my-3 overflow-x-auto border border-white/10 bg-white/5 p-3 text-xs leading-5 text-gray-200">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-[#1e3a5f] pl-3 text-sm italic text-gray-400">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-[#3b82f6] underline underline-offset-2 hover:text-[#60a5fa]"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-2 border-white/10" />,
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto border border-white/10">
              <table className="min-w-full text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-white/10 px-2 py-1 text-left font-bold text-gray-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-white/10 px-2 py-1 text-gray-300">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
