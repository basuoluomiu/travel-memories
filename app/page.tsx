import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { MemoryCard } from "@/components/memory-card"
import { HeroBanner } from "@/components/hero-banner"
import { StatsCard } from "@/components/stats-card"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch memories with user profiles
  const { data: memories, error } = await supabase
    .from('memories')
    .select(`
      *,
      profiles (
        id,
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching memories:', error)
  }

  // Calculate statistics
  const totalMemories = memories?.length || 0
  const uniqueLocations = memories
    ? new Set(memories.map(m => m.location).filter(Boolean)).size
    : 0
  const latestMemory = memories && memories.length > 0
    ? new Date(memories[0].created_at).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
    : '暂无'

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="w-full max-w-[66.666%] mx-auto">
          {/* Hero Banner */}
          {profile && <HeroBanner profile={profile} />}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatsCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
              }
              title="总回忆数"
              value={totalMemories}
              subtitle={`${totalMemories} 张照片`}
              gradient="bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600"
              delay={0.1}
            />

            <StatsCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              }
              title="访问地点"
              value={uniqueLocations}
              subtitle={`${uniqueLocations} 个不同的地方`}
              gradient="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
              delay={0.2}
            />

            <StatsCard
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              }
              title="最近上传"
              value={latestMemory}
              subtitle="上次更新时间"
              gradient="bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500"
              delay={0.3}
            />
          </div>

          {/* Memories Grid */}
          {memories && memories.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6">我的回忆</h2>
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {memories.map((memory) => (
                  <div key={memory.id} className="break-inside-avoid">
                    <MemoryCard memory={memory} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="glass rounded-3xl p-12 max-w-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  />
                </svg>
                <h2 className="text-2xl font-bold mb-2">还没有回忆</h2>
                <p className="text-muted-foreground mb-6">
                  点击"添加回忆"按钮开始记录你的旅程
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
