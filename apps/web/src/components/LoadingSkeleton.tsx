export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white p-6 animate-pulse">
      <div className="max-w-md mx-auto space-y-6">
        {/* Large Card Skeleton */}
        <div
          className="w-full rounded-3xl bg-gradient-to-br from-gray-300 to-gray-200"
          style={{
            height: "440px",
          }}
        />

        {/* Two Line Skeletons */}
        <div className="space-y-3 px-4">
          <div
            className="h-6 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full"
            style={{
              width: "60%",
              margin: "0 auto",
            }}
          />
          <div
            className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full"
            style={{
              width: "45%",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Spacing */}
        <div className="h-8" />

        {/* Two More Line Skeletons (lighter) */}
        <div className="space-y-3 px-4">
          <div
            className="h-4 bg-gray-100 rounded-full"
            style={{
              width: "55%",
              margin: "0 auto",
            }}
          />
          <div
            className="h-4 bg-gray-100 rounded-full"
            style={{
              width: "50%",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Bottom Button Skeleton */}
        <div className="flex items-center justify-center pt-12">
          <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-100">
            {/* Icon Circle */}
            <div className="w-10 h-10 rounded-full bg-white/50" />
            {/* Text */}
            <div className="w-24 h-5 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}