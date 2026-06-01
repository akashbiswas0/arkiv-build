'use client'

import { Check } from 'lucide-react'

import type { ChoiceQuestion } from '@/lib/ai/assistantTypes'

type AssistantQuestionOptionsProps = {
  questions: ChoiceQuestion[]
  selections: Record<string, string>
  disabled?: boolean
  onSelect: (questionId: string, value: string) => void
}

export const OTHER_OPTION_VALUE = 'other'

export function AssistantQuestionOptions({
  questions,
  selections,
  disabled = false,
  onSelect,
}: AssistantQuestionOptionsProps) {
  if (questions.length === 0) {
    return null
  }

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
      {questions.map((question, questionIndex) => {
        const activeValue = selections[question.id]
        const questionCount = questions.length

        return (
          <div
            key={question.id}
            className="overflow-hidden border border-white/10 bg-[#141414] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase text-[#60a5fa]">
                  Help me choose
                </p>
                <p className="mt-1 pr-2 text-sm font-semibold leading-5 text-white">
                  {question.prompt}
                </p>
              </div>
              {questionCount > 1 ? (
                <p className="shrink-0 bg-white/10 px-2 py-1 text-[11px] font-medium text-gray-400">
                  {questionIndex + 1} of {questionCount}
                </p>
              ) : null}
            </div>

            <div className="px-3 py-3">
              <div className="flex flex-col gap-2">
                {question.options.map((option, optionIndex) => {
                  const isActive = activeValue === option
                  const isDisabled = disabled && !isActive
                  const isRecommended = optionIndex === 0

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => onSelect(question.id, option)}
                      className={[
                        'flex w-full items-start gap-3 border px-3 py-3 text-left text-sm transition',
                        isActive
                          ? 'border-[#1e3a5f] bg-[#13213d] text-[#93c5fd] shadow-[0_0_0_1px_rgba(59, 130, 246,0.12)]'
                          : 'border-white/10 bg-[#141414] text-gray-300 hover:border-[#1e3a5f] hover:bg-[#13213d]',
                        isDisabled ? 'cursor-not-allowed opacity-50' : '',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'mt-0.5 flex size-5 shrink-0 items-center justify-center border text-[11px] font-semibold',
                          isActive
                            ? 'border-[#3b82f6] bg-[#3b82f6] text-white'
                            : 'border-white/10 bg-white/5 text-gray-400',
                        ].join(' ')}
                      >
                        {isActive ? <Check className="size-3" /> : optionIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1 whitespace-normal break-words leading-5">
                        {option}
                      </span>
                      {isRecommended ? (
                        <span className="mt-0.5 shrink-0 bg-[#13213d] px-2 py-0.5 text-[10px] font-bold uppercase text-[#60a5fa]">
                          Recommended
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
