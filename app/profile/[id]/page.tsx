import { createClient } from "@/lib/supabase/server"
import { notFound, redirect } from "next/navigation"
import { UserProfile } from "@/components/user-profile"

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  // 获取目标用户信息
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (profileError || !profile) {
    notFound()
  }

  // 获取该用户的回忆
  // 如果是查看自己的，显示所有回忆；否则只显示公开的
  const isOwnProfile = user.id === params.id

  let memoriesQuery = supabase
    .from('memories')
    .select('*')
    .eq('user_id', params.id)

  // 如果不是自己的主页，只显示公开的回忆
  if (!isOwnProfile) {
    memoriesQuery = memoriesQuery.eq('is_public', true)
  }

  const { data: memories, error: memoriesError } = await memoriesQuery
    .order('created_at', { ascending: false })

  if (memoriesError) {
    console.error('Error fetching memories:', memoriesError)
  }

  // 统计信息
  const totalMemories = memories?.length || 0
  const locations = new Set(memories?.map(m => m.location).filter(Boolean))
  const totalLocations = locations.size

  return (
    <UserProfile
      profile={profile}
      memories={memories || []}
      isOwnProfile={isOwnProfile}
      stats={{
        totalMemories,
        totalLocations,
      }}
    />
  )
}
