import AppLayout from '@/components/app/AppLayout'
import Button from '@/components/app/Button'
import Hero from '@/components/pages/index/Hero'

export default function Home() {
  return (
    <AppLayout>
      <main className="flex items-center flex-col justify-center p-3 gap-3">
        <Hero />
        <Button>Join us with GitHub</Button>
      </main>
    </AppLayout>
  )
}
