"use client"

import { Memory } from "@/lib/supabase/types"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { deleteMemory, toggleMemoryVisibility } from "@/app/actions/user"
import { useRouter } from "next/navigation"

interface MemoryCardWithActionsProps {
  memory: Memory
}

export function MemoryCardWithActions({ memory }: MemoryCardWithActionsProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('确定要删除这个回忆吗？此操作无法撤销。')) {
      return
    }

    setLoading(true)
    const result = await deleteMemory(memory.id)
    setLoading(false)

    if (result.error) {
      alert(result.error)
    } else {
      router.refresh()
    }
  }

  const handleToggleVisibility = async () => {
    setLoading(true)
    const result = await toggleMemoryVisibility(memory.id, !memory.is_public)
    setLoading(false)

    if (result.error) {
      alert(result.error)
    } else {
      router.refresh()
    }
  }

  return (
    <div className="relative">
      <Link href={`/memory/${memory.id}`} className="block">
        <GlassCard className="overflow-hidden p-0 cursor-pointer group">
          <div className="relative w-full overflow-hidden rounded-t-3xl bg-muted/20">
            <Image
              src={memory.image_url}
              alt={memory.title}
              width={400}
              height={400}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ maxHeight: '600px', minHeight: '200px' }}
            />

            {/* 可见性标识 */}
            {!memory.is_public && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-full glass text-xs font-medium">
                🔒 私密
              </div>
            )}
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{memory.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatDate(memory.memory_date)}</span>
              {memory.location && (
                <>
                  <span>·</span>
                  <span className="line-clamp-1">{memory.location}</span>
                </>
              )}
            </div>
          </div>
        </GlassCard>
      </Link>

      {/* 管理按钮 */}
      <div className="absolute top-2 right-2 z-10">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full w-8 h-8 p-0"
            onClick={(e) => {
              e.preventDefault()
              setShowMenu(!showMenu)
            }}
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </Button>

          {/* 菜单 */}
          {showMenu && (
            <>
              {/* 遮罩层 */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />

              {/* 菜单内容 */}
              <div className="absolute right-0 mt-2 w-48 glass rounded-2xl shadow-xl overflow-hidden z-20">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleToggleVisibility()
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                  disabled={loading}
                >
                  {memory.is_public ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      设为私密
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      设为公开
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleDelete()
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-red-500/10 transition-colors flex items-center gap-2 text-sm text-red-600"
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  删除回忆
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
