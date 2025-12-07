"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import ShaderCanvas from "@/components/ShaderCanvas";
import defaultShader from "@/lib/shader/defaultShader";

export default function HomePage() {
  const router = useRouter();
  const [shaderId, setShaderId] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = shaderId.trim();
    if (value.length === 0) return;
    router.push(`/shader/${value}`);
  };

  const handleDemo = () => {
    const demoId = "demo-default";
    setShaderId(demoId);
    router.push(`/shader/${demoId}`);
  };

  return (
    <Layout>
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
            WebGL2 & GLSL
          </div>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Arefev.Pro — галерея и просмотрщик шейдеров в духе CineShader.
          </h1>
          <p className="text-lg text-muted">
            Вставьте ID шейдера или свой GLSL-фрагмент, чтобы увидеть мгновенный рендер на WebGL2. Минималистичный
            интерфейс, полноэкранный канвас, современный Next.js + Tailwind.
          </p>
          <form onSubmit={handleSubmit} className="glass w-full max-w-xl rounded-2xl p-4">
            <label className="text-sm text-muted" htmlFor="shader-id">
              Введите ID шейдера
            </label>
            <div className="mt-2 flex gap-3">
              <input
                id="shader-id"
                name="shader-id"
                value={shaderId}
                onChange={(e) => setShaderId(e.target.value)}
                placeholder="например, neon-waves"
                className="flex-1 rounded-lg border border-white/10 bg-secondary/80 px-4 py-3 text-base text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                aria-label="Shader ID"
              />
              <button type="submit" className="button-primary whitespace-nowrap">
                Открыть
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              WebGL2 ready — fullscreen quad, iTime, iResolution.
            </div>
          </form>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleDemo} className="button-primary">
              Попробовать демо
            </button>
            <Link
              href="/gallery"
              className="inline-flex items-center rounded-md border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-white"
            >
              Перейти в галерею
            </Link>
          </div>
        </div>
        <div className="h-[440px] lg:h-[520px]">
          <ShaderCanvas fragmentShader={defaultShader} />
        </div>
      </section>
    </Layout>
  );
}
