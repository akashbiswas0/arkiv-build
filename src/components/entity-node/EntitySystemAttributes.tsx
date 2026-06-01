'use client'

import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

import type { EntityNodeData } from '@/store/useSchemaStore'

export function EntitySystemAttributes({
  data,
  open,
  onToggle,
}: {
  data: EntityNodeData
  open: boolean
  onToggle: () => void
}) {
  if (data.mode === 'draft' || !data.systemAttributes) {
    return null
  }

  return (
    <div className="space-y-3">
      <button
        onClick={onToggle}
        className="nodrag nopan flex w-full items-center justify-between border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
      >
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-mono font-bold uppercase tracking-widest text-white">
            System Attributes
          </span>
          {data.explorerUrl ? (
            <a
              href={data.explorerUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#3b82f6] transition hover:text-[#2563eb] ml-2"
            >
              Explorer
              <ExternalLink className="size-3" />
            </a>
          ) : null}
        </div>
        {open ? (
          <ChevronUp className="size-4 text-white" />
        ) : (
          <ChevronDown className="size-4 text-white" />
        )}
      </button>

      {open && (
        <div className="space-y-4 px-1">
          {data.systemAttributes.map((attribute) => (
            <div key={attribute.name}>
              <p className="mb-2 text-[12px] font-mono font-bold uppercase tracking-widest text-white">
                {attribute.name}
              </p>
              <div className="nodrag nopan w-full border border-white/10 bg-white/5 p-4 font-mono text-sm text-white break-all">
                {attribute.value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
