import ShaderCanvas from "@/components/ShaderCanvas";

type ShaderRecord = {
  id: string;
  title: string;
  code: string;
  createdAt: string;
};

async function fetchShader(id: string): Promise<ShaderRecord | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/shaders/${id}`, {
      cache: "no-store"
    });
    if (!res.ok) return null;
    return (await res.json()) as ShaderRecord;
  } catch (error) {
    console.error(`Failed to fetch shader ${id}:`, error);
    return null;
  }
}

interface ShaderPageProps {
  params: { id: string };
}

export default async function ShaderPage({ params }: ShaderPageProps) {
  const shader = await fetchShader(params.id);

  if (!shader) {
    return (
      <main className="min-h-screen bg-black p-10 text-red-400">
        Shader not found (id: {params.id})
      </main>
    );
  }

  return (
    <main className="w-screen h-screen bg-black flex flex-col">
      <header className="flex items-center justify-between border-b border-white/10 p-4 text-sm text-gray-300">
        <div className="font-semibold text-white">{shader.title}</div>
        <div className="text-xs text-gray-400">ID: {shader.id}</div>
      </header>
      <div className="flex-1">
        <ShaderCanvas fragmentShader={shader.code} />
      </div>
    </main>
  );
}
