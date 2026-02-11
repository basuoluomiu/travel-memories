import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { MemoryCard } from "@/components/memory-card"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

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

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="w-full max-w-[66.666%] mx-auto">
          {memories && memories.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {memories.map((memory) => (
                <div key={memory.id} className="break-inside-avoid">
                  <MemoryCard memory={memory} />
                </div>
              ))}
            </div>
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
