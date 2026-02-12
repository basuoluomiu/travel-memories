"use client"

import { motion } from "framer-motion"
import { Profile } from "@/lib/supabase/types"

interface HeroBannerProps {
  profile: Profile
}

export function HeroBanner({ profile }: HeroBannerProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "早上好"
    if (hour < 18) return "下午好"
    return "晚上好"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
      }}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex-1 min-w-[200px]">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              {getGreeting()}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-white/90"
            >
              @{profile.username}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 mt-2"
            >
              欢迎回到你的旅行回忆空间
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {profile.avatar_url ? (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <img
                  src={profile.avatar_url}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 shadow-2xl flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-white">
                  {profile.username[0].toUpperCase()}
                </span>
              </div>
            )}

            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: "3s" }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
