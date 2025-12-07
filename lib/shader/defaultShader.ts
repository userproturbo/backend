const defaultShader = `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float t = iTime * 0.5;
    vec3 col = vec3(uv, 0.5 + 0.5 * sin(t));
    fragColor = vec4(col, 1.0);
}
`;

export default defaultShader;
