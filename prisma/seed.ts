import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const shaders = [
  {
    id: "default-gradient",
    title: "Default Gradient",
    code: `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float t = iTime * 0.4;
    vec3 col = mix(vec3(0.1, 0.2, 0.35), vec3(0.5, 0.9, 0.9), uv.y + 0.1 * sin(t + uv.x * 3.0));
    fragColor = vec4(col, 1.0);
}
`
  },
  {
    id: "rgb-pulse",
    title: "RGB Pulse",
    code: `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float t = iTime * 2.0;
    vec3 col = 0.5 + 0.5 * sin(vec3(0.0, 2.0, 4.0) + t + uv.xyx * 3.0);
    fragColor = vec4(col, 1.0);
}
`
  },
  {
    id: "circle-waves",
    title: "Circle Waves",
    code: `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    vec2 c = uv - 0.5;
    float d = length(c);
    float t = iTime * 4.0;
    float waves = 0.5 + 0.5 * sin(20.0 * d - t);
    float ring = smoothstep(0.4, 0.0, abs(d - 0.25));
    vec3 col = mix(vec3(0.05, 0.1, 0.2), vec3(0.2, 0.7, 1.0), waves) * ring;
    fragColor = vec4(col, 1.0);
}
`
  },
  {
    id: "purple-plasma",
    title: "Purple Plasma",
    code: `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float t = iTime * 1.5;
    float v = sin(uv.x * 10.0 + t) + sin(uv.y * 10.0 - t) + sin((uv.x + uv.y) * 8.0 + t * 0.5);
    vec3 col = mix(vec3(0.2, 0.0, 0.3), vec3(0.7, 0.2, 1.0), 0.5 + 0.5 * sin(v));
    fragColor = vec4(col, 1.0);
}
`
  }
];

async function main() {
  for (const shader of shaders) {
    await prisma.shader.upsert({
      where: { id: shader.id },
      update: {
        title: shader.title,
        code: shader.code
      },
      create: shader
    });
  }

  const count = await prisma.shader.count();
  console.log(`Seed completed. Total shaders: ${count}`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
