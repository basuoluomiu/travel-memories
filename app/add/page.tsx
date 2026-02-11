"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import { DatePicker } from "@/components/ui/date-picker"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { revalidateHomePage } from "@/app/actions"
import { format } from "date-fns"

export default function AddMemoryPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [memoryDate, setMemoryDate] = useState<Date | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("未登录")

      if (!imageFile) throw new Error("请选择一张照片")
      if (!memoryDate) throw new Error("请选择日期")

      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('memories')
        .upload(fileName, imageFile)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('memories')
        .getPublicUrl(fileName)

      // Insert memory record
      const { error: insertError } = await supabase
        .from('memories')
        .insert([
          {
            user_id: user.id,
            title,
            description,
            location,
            memory_date: format(memoryDate, 'yyyy-MM-dd'),
            image_url: publicUrl,
          }
        ])

      if (insertError) throw insertError

      // 使用 Server Action 重新验证首页缓存
      await revalidateHomePage()

      // 跳转到首页
      router.push("/")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
            返回
          </Button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard hover={false}>
            <h1 className="text-3xl font-bold mb-6">添加新回忆</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">照片 *</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label
                    htmlFor="image-upload"
                    className="block cursor-pointer"
                  >
                    {imagePreview ? (
                      <div className="relative rounded-2xl overflow-hidden glass group">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={800}
                          height={600}
                          className="w-full h-auto object-contain"
                          style={{ maxHeight: '500px', minHeight: '200px' }}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-medium">点击更换照片</span>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[300px] rounded-2xl glass flex flex-col items-center justify-center border-2 border-dashed border-white/30 hover:border-white/50 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-12 h-12 mb-2 text-muted-foreground"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                          />
                        </svg>
                        <span className="text-sm text-muted-foreground">点击上传照片</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium mb-2 block">标题 *</label>
                <Input
                  type="text"
                  placeholder="给这段回忆起个标题"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium mb-2 block">日期 *</label>
                <DatePicker
                  selected={memoryDate}
                  onChange={(date) => setMemoryDate(date)}
                  placeholderText="选择这段回忆的日期"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block">地点</label>
                <Input
                  type="text"
                  placeholder="这是在哪里？"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium mb-2 block">描述</label>
                <Textarea
                  placeholder="记录下这段旅程的故事..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "上传中..." : "保存回忆"}
              </Button>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}
