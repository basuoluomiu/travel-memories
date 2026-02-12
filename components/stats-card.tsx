"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string | number
  subtitle: string
  gradient: string
  delay?: number
}

export function StatsCard({ icon, title, value, subtitle, gradient, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative overflow-hidden rounded-3xl p-6 shadow-xl cursor-pointer group ${gradient}`}
    >
      {/* Glass overlay for liquid effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
            {icon}
          </div>
        </div>

        <h3 className="text-white/90 text-sm font-medium mb-2">{title}</h3>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-white/70 text-xs">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
    </motion.div>
  )
}
