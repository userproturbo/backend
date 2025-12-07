import Link from "next/link";
import Layout from "@/components/Layout";
import ShaderCard from "@/components/ShaderCard";

const shaders = [
  {
    id: "demo-default",
    title: "Default Flow",
    description: "Базовый шейдер-заглушка с мягкими переливами и виньеткой.",
    thumbnail: "/assets/placeholder.svg"
  },
  {
    id: "sunrise-haze",
    title: "Sunrise Haze",
    description: "Смена рассвета и теплых лучей, вдохновлено утренним небом.",
    thumbnail: "/assets/placeholder.svg"
  },
  {
    id: "grid-waves",
    title: "Grid Waves",
    description: "Ритмичные волны по сетке, реагируют на время.",
    thumbnail: "/assets/placeholder.svg"
  },
  {
    id: "neon-grid",
    title: "Neon Grid",
    description: "Синтетический неон и ретро-сканлайн настроение.",
    thumbnail: "/assets/placeholder.svg"
  },
  {
    id: "aurora-drift",
    title: "Aurora Drift",
    description: "Северное сияние в минималистичном исполнении.",
    thumbnail: "/assets/placeholder.svg"
  },
  {
    id: "scanline-pulse",
    title: "Scanline Pulse",
    description: "Пульсирующие линии и стеклянные отблески.",
    thumbnail: "/assets/placeholder.svg"
  }
];

export default function GalleryPage() {
  return (
    <Layout>
      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted">Галерея</p>
            <h1 className="text-3xl font-semibold">Подборка шейдеров</h1>
            <p className="text-muted">
              Статичная галерея на стадии MVP. Каждая карточка ведет на страницу рендера с выбранным ID.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center rounded-md border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-white"
          >
            Вернуться к вводу ID
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shaders.map((shader) => (
            <ShaderCard key={shader.id} {...shader} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
