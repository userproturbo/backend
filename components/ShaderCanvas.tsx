"use client";

import { useEffect, useRef, useState } from "react";
import { wrapShader } from "@/lib/shader/wrapShader";

interface ShaderCanvasProps {
  fragmentShader: string;
}

const vertexSource = `#version 300 es
in vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Unable to create shader.");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(log ?? "Unknown shader compile error.");
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("Unable to create program.");
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(program);
    throw new Error(log ?? "Unknown program link error.");
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}

export default function ShaderCanvas({ fragmentShader }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>();
  const programRef = useRef<WebGLProgram | null>(null);
  const vaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      setError("WebGL2 is not supported in this browser.");
      return;
    }

    // Resize helper keeps canvas in sync with CSS size and updates viewport.
    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth, clientHeight } = canvas;
      const displayWidth = Math.floor(clientWidth * dpr);
      const displayHeight = Math.floor(clientHeight * dpr);
      if (width !== displayWidth || height !== displayHeight) {
        width = displayWidth;
        height = displayHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const fragmentSource = wrapShader(fragmentShader);

    try {
      const program = createProgram(gl, vertexSource, fragmentSource);
      programRef.current = program;
      const vao = gl.createVertexArray();
      if (!vao) {
        throw new Error("Unable to create vertex array.");
      }
      vaoRef.current = vao;
      gl.bindVertexArray(vao);

      const positionBuffer = gl.createBuffer();
      if (!positionBuffer) {
        throw new Error("Unable to create buffer.");
      }
      bufferRef.current = positionBuffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      // Fullscreen quad in NDC (two triangles).
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const resolutionLocation = gl.getUniformLocation(program, "iResolution");
      const timeLocation = gl.getUniformLocation(program, "iTime");

      const start = performance.now();
      gl.clearColor(0, 0, 0, 1);

      const render = (now: number) => {
        resize();
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindVertexArray(vao);
        if (resolutionLocation) {
          gl.uniform3f(resolutionLocation, canvas.width, canvas.height, 1.0);
        }
        if (timeLocation) {
          gl.uniform1f(timeLocation, (now - start) / 1000);
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        frameRef.current = requestAnimationFrame(render);
      };

      frameRef.current = requestAnimationFrame(render);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Shader initialization failed.";
      console.error(message);
      setError(message);
    }

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (programRef.current) gl.deleteProgram(programRef.current);
      if (vaoRef.current) gl.deleteVertexArray(vaoRef.current);
      if (bufferRef.current) gl.deleteBuffer(bufferRef.current);
    };
  }, [fragmentShader]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full block bg-black rounded-md" />
      {error ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/80 text-sm text-red-300">
          {error}
        </div>
      ) : null}
    </div>
  );
}
