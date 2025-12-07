/**
 * Wraps a user-provided GLSL fragment shader into a WebGL2-compatible template.
 */
export function wrapShader(fragmentSource: string): string {
  return `#version 300 es
precision highp float;

uniform float iTime;
uniform vec3 iResolution;

out vec4 outColor;

void mainImage(out vec4 fragColor, in vec2 fragCoord);

${fragmentSource}

void main() {
    vec4 color = vec4(0.0);
    mainImage(color, gl_FragCoord.xy);
    outColor = color;
}
`;
}
