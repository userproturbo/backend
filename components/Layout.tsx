import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-white/30 shadow-lg" />
            <span>Arefev.Pro</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-muted">
            <Link href="/" className="hover:text-accent">
              Ввод ID
            </Link>
            <Link href="/gallery" className="hover:text-accent">
              Галерея
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 px-3 py-1 hover:border-accent hover:text-accent"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-10 px-6 py-10">{children}</main>
    </div>
  );
}
