import { Skeleton } from "@/components/ui/skeleton"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ProductLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Product Overview */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="mt-4 grid grid-cols-3 gap-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="aspect-square w-full rounded-lg" />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="mt-2 h-10 w-3/4" />
            <Skeleton className="mt-4 h-20 w-full" />

            <div className="mt-8">
              <Skeleton className="h-8 w-48" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-40" />
            </div>

            <Skeleton className="mt-8 h-40 w-full rounded-lg" />
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Skeleton className="h-10 w-[400px]" />
          <Skeleton className="mt-6 h-60 w-full" />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <Skeleton className="h-8 w-48" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
