import ShaderCanvas from "@/components/ShaderCanvas";
import defaultShader from "@/lib/shader/defaultShader";

export default function ShaderTestPage() {
  return (
    <main className="w-screen h-screen bg-black flex items-stretch">
      <div className="flex-1">
        <ShaderCanvas fragmentShader={defaultShader} />
      </div>
    </main>
  );
}
