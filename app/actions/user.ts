'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// 更新用户信息
export async function updateUserProfile(formData: {
  username: string
  bio: string
  avatar_url?: string
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '未登录' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      username: formData.username,
      bio: formData.bio,
      avatar_url: formData.avatar_url,
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/profile/[id]', 'page')
  revalidatePath('/settings')
  return { success: true }
}

// 删除回忆
export async function deleteMemory(memoryId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '未登录' }
  }

  // 验证是否是自己的回忆
  const { data: memory } = await supabase
    .from('memories')
    .select('user_id, image_url')
    .eq('id', memoryId)
    .single()

  if (!memory || memory.user_id !== user.id) {
    return { error: '无权删除此回忆' }
  }

  // 删除 Storage 中的图片
  if (memory.image_url) {
    const fileName = memory.image_url.split('/').pop()
    if (fileName) {
      await supabase.storage.from('memories').remove([fileName])
    }
  }

  // 删除数据库记录
  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', memoryId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/profile/[id]', 'page')
  return { success: true }
}

// 更新回忆可见性
export async function toggleMemoryVisibility(memoryId: string, isPublic: boolean) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '未登录' }
  }

  const { error } = await supabase
    .from('memories')
    .update({ is_public: isPublic })
    .eq('id', memoryId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/profile/[id]', 'page')
  return { success: true }
}

// 上传头像
export async function uploadAvatar(file: File) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '未登录' }
  }

  // 检查文件大小（最大 5MB）
  if (file.size > 5 * 1024 * 1024) {
    return { error: '图片大小不能超过 5MB' }
  }

  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    return { error: '只能上传图片文件' }
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/avatar.${fileExt}`

    console.log('Uploading avatar:', fileName)

    const { error: uploadError, data } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        upsert: true,
        contentType: file.type
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)

      // 提供更友好的错误信息
      if (uploadError.message.includes('not found')) {
        return { error: 'Storage bucket 未配置，请联系管理员' }
      }
      if (uploadError.message.includes('policy')) {
        return { error: 'Storage 权限不足，请检查配置' }
      }

      return { error: `上传失败: ${uploadError.message}` }
    }

    console.log('Upload success:', data)

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    return { success: true, url: publicUrl }
  } catch (err: any) {
    console.error('Unexpected error:', err)
    return { error: '上传失败，请检查网络连接或联系管理员' }
  }
}
