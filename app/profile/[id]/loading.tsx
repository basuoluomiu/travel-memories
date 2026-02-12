import { Navbar } from "@/components/navbar"

export default function ProfileLoading() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="w-full max-w-[66.666%] mx-auto">
          {/* 头部加载骨架屏 */}
          <div className="glass rounded-3xl p-8 mb-8 animate-pulse">
            <div className="flex items-start gap-6">
              {/* 头像骨架 */}
              <div className="w-24 h-24 rounded-full bg-muted/40"></div>

              <div className="flex-1 space-y-4">
                {/* 用户名骨架 */}
                <div className="h-8 w-32 bg-muted/40 rounded-lg"></div>

                {/* 简介骨架 */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted/40 rounded"></div>
                  <div className="h-4 w-3/4 bg-muted/40 rounded"></div>
                </div>

                {/* 统计数据骨架 */}
                <div className="flex gap-6">
                  <div className="h-4 w-20 bg-muted/40 rounded"></div>
                  <div className="h-4 w-20 bg-muted/40 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 回忆网格加载骨架 */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="break-inside-avoid">
                <div className="glass rounded-3xl overflow-hidden animate-pulse">
                  {/* 图片骨架 */}
                  <div className="w-full h-64 bg-muted/40"></div>

                  {/* 内容骨架 */}
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 bg-muted/40 rounded"></div>
                    <div className="h-4 w-1/2 bg-muted/40 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted/40 rounded"></div>
                      <div className="h-3 w-2/3 bg-muted/40 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
