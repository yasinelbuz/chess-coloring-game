import Link from 'next/link'
import { FaGithub, FaCode, FaChess } from 'react-icons/fa'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-gray-50">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-4 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <FaChess className="text-3xl md:text-4xl text-blue-500 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-center">Satranç Boyama Oyunu</h1>
        </div>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">Oyunun Amacı</h2>
            <p className="text-gray-700 leading-relaxed">
              Satranç Boyama Oyunu, klasik satranç taşlarının hareketlerini öğrenmek ve pratik yapmak için tasarlanmış eğlenceli bir bulmacadır. 
              Amaç, tüm satranç tahtasını taşların hareket alanlarıyla boyamaktır. Bu oyun, satranç öğrenenler için harika bir eğitim aracı olarak tasarlanmıştır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">Nasıl Oynanır?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
              <li>Bir taşı seçin ve boş bir kareye hareket ettirin</li>
              <li>Taş hareket ettiğinde, gidebileceği tüm kareler yeşil renkle boyanacaktır</li>
              <li>Her taşın kendine özgü hareket paterni vardır:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Kale (R): Yatay ve dikey hareket eder</li>
                  <li>Fil (B): Çapraz hareket eder</li>
                  <li>At (N): L şeklinde hareket eder</li>
                  <li>Vezir (Q): Hem yatay-dikey hem çapraz hareket eder</li>
                  <li>Şah (K): Her yöne bir kare hareket eder</li>
                </ul>
              </li>
              <li>Tüm tahtayı boyamayı başardığınızda oyunu kazanırsınız</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">İpuçları</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Vezir en geniş hareket alanına sahiptir, stratejik kullanın</li>
              <li>At, diğer taşların gidemediği karelere ulaşabilir</li>
              <li>Taşların konumlarını stratejik olarak planlayın</li>
              <li>Köşeleri boyamak için atları kullanmayı düşünün</li>
              <li>Bazı kareler birden fazla taş tarafından boyanabilir</li>
            </ul>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">Açık Kaynak Projesi</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Bu proje açık kaynak olarak geliştirilmiştir ve MIT lisansı altında dağıtılmaktadır. 
              Projeye katkıda bulunmak, hata bildirmek veya önerilerde bulunmak için GitHub deposunu ziyaret edebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/yourusername/chess-coloring-game" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaGithub className="text-xl" />
                GitHub Deposu
              </a>
              <a 
                href="https://github.com/yourusername/chess-coloring-game/issues" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaCode className="text-xl" />
                Katkıda Bulun
              </a>
            </div>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">Teknolojiler</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              <li>Next.js - React Framework</li>
              <li>TypeScript - Tip Güvenli JavaScript</li>
              <li>Tailwind CSS - Stil Kütüphanesi</li>
              <li>React Icons - İkon Kütüphanesi</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="inline-block bg-blue-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-sm md:text-base"
          >
            Oyuna Dön
          </Link>
        </div>
      </div>
    </div>
  )
} 