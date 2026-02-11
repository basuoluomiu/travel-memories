"use client"

import { Memory, Profile } from "@/lib/supabase/types"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface MemoryDetailProps {
  memory: Memory & { profiles?: Profile }
}

export function MemoryDetail({ memory }: MemoryDetailProps) {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            返回主页
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard hover={false} className="overflow-hidden p-0">
            {/* 图片区域 */}
            <div className="relative w-full bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center overflow-hidden rounded-t-3xl">
              <Image
                src={memory.image_url}
                alt={memory.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                style={{ maxHeight: '70vh', minHeight: '300px' }}
              />
            </div>

            {/* 内容区域 */}
            <div className="p-6 md:p-8 space-y-6">
              {/* 标题 */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {memory.title}
                </h1>

                {/* 元信息标签 */}
                <div className="flex flex-wrap gap-2">
                  {/* 日期标签 */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-primary"
                    >
                      <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{formatDate(memory.memory_date)}</span>
                  </div>

                  {/* 地点标签 */}
                  {memory.location && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4 text-primary"
                      >
                        <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{memory.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 描述内容 */}
              {memory.description && (
                <>
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                  <p className="text-base md:text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">
                    {memory.description}
                  </p>
                </>
              )}

              {/* 发布者信息卡片 */}
              {memory.profiles && (
                <>
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                  <div className="flex items-center justify-between p-4 rounded-2xl glass">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-lg font-bold text-primary">
                        {memory.profiles.username[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-base">{memory.profiles.username}</p>
                        <p className="text-xs text-muted-foreground">
                          发布于 {formatDate(memory.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
