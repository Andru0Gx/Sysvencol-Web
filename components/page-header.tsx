interface PageHeaderProps {
  title: string
  description: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="bg-[#243f60] py-16 text-white">
      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-white/80">{description}</p>
      </div>
    </section>
  )
}
