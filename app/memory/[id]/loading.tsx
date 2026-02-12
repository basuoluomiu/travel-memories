export default function MemoryDetailLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* 加载动画 */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* 加载文本 */}
        <p className="text-muted-foreground text-sm">加载回忆中...</p>
      </div>
    </div>
  )
}
