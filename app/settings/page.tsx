"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { updateUserProfile } from "@/app/actions/user"

export default function SettingsPage() {
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      setUsername(profile.username)
      setBio(profile.bio || '')
      setAvatarUrl(profile.avatar_url)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      let finalAvatarUrl = avatarUrl

      // 如果有新头像，先在客户端上传到 Supabase Storage
      if (avatarFile) {
        setUploading(true)

        // 检查文件大小（最大 5MB）
        if (avatarFile.size > 5 * 1024 * 1024) {
          throw new Error('图片大小不能超过 5MB')
        }

        // 检查文件类型
        if (!avatarFile.type.startsWith('image/')) {
          throw new Error('只能上传图片文件')
        }

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('未登录')

        const fileExt = avatarFile.name.split('.').pop()
        const fileName = `${user.id}/avatar.${fileExt}`

        console.log('Uploading avatar:', fileName)

        // 上传到 Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            upsert: true,
            contentType: avatarFile.type
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)

          // 提供更友好的错误信息
          if (uploadError.message.includes('not found')) {
            throw new Error('Storage bucket 未配置，请检查 Supabase 设置')
          }
          if (uploadError.message.includes('policy')) {
            throw new Error('Storage 权限不足，请检查策略配置')
          }

          throw new Error(`上传失败: ${uploadError.message}`)
        }

        console.log('Upload success')

        // 获取公开 URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName)

        finalAvatarUrl = publicUrl
        setUploading(false)
      }

      // 更新用户信息
      const result = await updateUserProfile({
        username,
        bio,
        avatar_url: finalAvatarUrl || undefined,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      setSuccess(true)
      setAvatarFile(null)
      setAvatarPreview(null)

      // 2秒后跳转到用户页
      setTimeout(async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          router.push(`/profile/${user.id}`)
        }
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const currentAvatar = avatarPreview || avatarUrl

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
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

        <GlassCard hover={false}>
          <h1 className="text-3xl font-bold mb-6">编辑资料</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 头像 */}
            <div>
              <label className="text-sm font-medium mb-3 block">头像</label>
              <div className="flex items-center gap-6">
                {currentAvatar ? (
                  <Image
                    src={currentAvatar}
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">
                      {username[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 border-2 border-white/20 bg-transparent hover:bg-white/10 h-8 px-4 text-xs cursor-pointer glass"
                  >
                    {uploading ? '上传中...' : '更换头像'}
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    推荐使用正方形图片，最大 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* 用户名 */}
            <div>
              <label className="text-sm font-medium mb-2 block">用户名 *</label>
              <Input
                type="text"
                placeholder="输入你的用户名"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* 个人简介 */}
            <div>
              <label className="text-sm font-medium mb-2 block">个人简介</label>
              <Textarea
                placeholder="介绍一下自己..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {bio.length}/200 字符
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-sm">
                保存成功！即将跳转到个人主页...
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                disabled={loading || uploading}
              >
                {loading ? '保存中...' : '保存更改'}
              </Button>

              <Link href="/" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  disabled={loading || uploading}
                >
                  取消
                </Button>
              </Link>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  )
}
