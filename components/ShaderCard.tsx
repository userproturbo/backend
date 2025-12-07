import Image from "next/image";
import Link from "next/link";

type ShaderCardProps = {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
};

export default function ShaderCard({ id, title, description, thumbnail }: ShaderCardProps) {
  return (
    <Link
      href={`/shader/${id}`}
      className="group relative overflow-hidden rounded-xl border border-white/5 bg-secondary/60 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:border-accent/60"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={thumbnail ?? "/assets/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-70" />
      </div>
      <div className="flex flex-col gap-2 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{title}</h3>
          <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-muted transition-colors group-hover:bg-accent/20 group-hover:text-white">
            ID: {id}
          </span>
        </div>
        <p className="text-sm text-muted leading-snug">{description}</p>
      </div>
    </Link>
  );
}
