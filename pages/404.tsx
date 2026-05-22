import { Footer } from "@/components/footer"
import Link from 'next/link'
import { MainLayout } from '@/components/layouts';

const FourOhFour = () => {

  return (
    <MainLayout>
      <div className="bg-white grow-1 flex-center full">
        <div className="flex-center flex-col">
          <h2 className="text-xl text-red-400 mb-4">Указанная страница не найдена</h2>
          <Link href='/' >
            <span className="btn-success btn-big">Вернуться на главную</span>
          </Link>
        </div>
      </div>
      <Footer />
    </MainLayout>
  )
}

export default FourOhFour