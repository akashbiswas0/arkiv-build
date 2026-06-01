'use client'

import { useMemo } from 'react'

import { inputClassName } from '@/components/entity-node/styles'
import { useSchemaStore } from '@/store/useSchemaStore'

export function EntityDataEditor({
  entityData,
  nodeId,
}: {
  entityData: string
  nodeId: string
}) {
  const updateEntityData = useSchemaStore((s) => s.updateEntityData)

  const parsed = useMemo(() => {
    try {
      const obj = JSON.parse(entityData)
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        return obj as Record<string, unknown>
      }
      return null
    } catch {
      return null
    }
  }, [entityData])

  if (parsed) {
    const entries = Object.entries(parsed)

    const handleValueChange = (key: string, value: string) => {
      const updated = { ...parsed }
      const num = Number(value)
      updated[key] =
        value !== '' && !Number.isNaN(num) && typeof parsed[key] === 'number'
          ? num
          : value
      updateEntityData(nodeId, JSON.stringify(updated, null, 2))
    }

    return (
      <div className="space-y-4">
        {entries.map(([key, val]) => {
          const valStr = typeof val === 'object' ? JSON.stringify(val) : String(val)
          const isReadOnly =
            key === 'app' || key === 'version' || key === 'deployedAt'

          return (
            <div key={key}>
              <p className="mb-2 text-[12px] font-mono font-bold uppercase tracking-widest text-white">
                {key}
              </p>
              <input
                value={valStr}
                onChange={(e) => handleValueChange(key, e.target.value)}
                disabled={isReadOnly}
                className={inputClassName}
                placeholder="value"
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <textarea
      value={entityData}
      onChange={(e) => updateEntityData(nodeId, e.target.value)}
      rows={6}
      className="nodrag nopan w-full resize-none border border-white/10 bg-white/5 p-4 font-mono text-sm leading-5 text-white outline-none transition focus:border-white/10 focus:bg-white/10"
      placeholder="Entity payload (JSON or plain text)"
      spellCheck={false}
    />
  )
}
