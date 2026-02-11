"use client"

import { Memory, Profile } from "@/lib/supabase/types"
import { GlassCard } from "@/components/ui/glass-card"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

interface MemoryCardProps {
  memory: Memory & { profiles?: Profile }
}

export function MemoryCard({ memory }: MemoryCardProps) {
  return (
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{memory.title}</h3>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{formatDate(memory.memory_date)}</span>
          {memory.location && (
            <>
              <span>·</span>
              <span className="line-clamp-1">{memory.location}</span>
            </>
          )}
        </div>

        {memory.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {memory.description}
          </p>
        )}

        {memory.profiles && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full glass flex items-center justify-center text-xs font-medium">
              {memory.profiles.username[0].toUpperCase()}
            </div>
            <span className="text-xs text-muted-foreground">
              {memory.profiles.username}
            </span>
          </div>
        )}
      </div>
    </GlassCard>
    </Link>
  )
}
