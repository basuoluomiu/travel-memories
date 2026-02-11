import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { MemoryDetail } from "@/components/memory-detail"

export default async function MemoryDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  // Fetch memory with user profile
  const { data: memory, error } = await supabase
    .from('memories')
    .select(`
      *,
      profiles (
        id,
        username,
        avatar_url
      )
    `)
    .eq('id', params.id)
    .single()

  if (error || !memory) {
    notFound()
  }

  return <MemoryDetail memory={memory} />
}
