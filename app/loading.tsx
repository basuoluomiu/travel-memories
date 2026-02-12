import { Navbar } from "@/components/navbar"

export default function HomeLoading() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="w-full max-w-[66.666%] mx-auto">
          {/* 回忆卡片加载骨架屏 */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="break-inside-avoid">
                <div className="glass rounded-3xl overflow-hidden animate-pulse">
                  {/* 图片骨架 - 随机高度以模拟瀑布流 */}
                  <div
                    className="w-full bg-muted/40"
                    style={{ height: `${200 + (i % 3) * 100}px` }}
                  ></div>

                  {/* 内容骨架 */}
                  <div className="p-4 space-y-3">
                    {/* 标题 */}
                    <div className="h-5 w-3/4 bg-muted/40 rounded"></div>

                    {/* 日期和地点 */}
                    <div className="h-4 w-1/2 bg-muted/40 rounded"></div>

                    {/* 描述 */}
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted/40 rounded"></div>
                      <div className="h-3 w-4/5 bg-muted/40 rounded"></div>
                    </div>

                    {/* 用户信息 */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="w-6 h-6 rounded-full bg-muted/40"></div>
                      <div className="h-3 w-20 bg-muted/40 rounded"></div>
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
