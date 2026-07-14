export interface Project {
  id: string;
  title: string;
  category: 'Graphics' | 'Systems' | 'WebAssembly' | 'AI' | 'Webdev';
  description: string;
  longDescription: string;
  tech: string[];
  glowType: 'cyan' | 'purple' | 'orange';
  github?: string;
  demo?: string;
  stats: {
    stars?: number;
    fps?: number;
    accuracy?: string;
    lines?: number;
  };
}

export const projects: Project[] = [
  {
    id: 'wasm-ray',
    title: 'WasmRay',
    category: 'WebAssembly',
    description: 'A multi-threaded, real-time path tracer compiled to WebAssembly, running directly in the browser via Web Workers.',
    longDescription: 'WasmRay is a high-performance path tracing engine written in Rust and compiled to WebAssembly. By leveraging Web Workers, it runs parallel ray-tracing workloads across all available CPU cores directly in the browser. It features bounding volume hierarchies (BVH) for accelerated triangle intersection, interactive camera movement, custom material properties (metallic, dielectric, diffuse), and progressive rendering with denoisers.',
    tech: ['Rust', 'WebAssembly', 'SharedArrayBuffer', 'Web Workers', 'HTML5 Canvas'],
    glowType: 'cyan',
    github: 'https://github.com/example/wasm-ray',
    demo: '#',
    stats: {
      stars: 342,
      fps: 45
    }
  },
  {
    id: 'shader-flow',
    title: 'ShaderFlow',
    category: 'Graphics',
    description: 'A visual, node-based editor for creating custom GLSL fragment shaders, compiling instantly with live canvas previews.',
    longDescription: 'ShaderFlow is a node-based editor built for graphic designers and frontend developers. It allows users to visually compose GLSL fragment shaders by connecting mathematically structured nodes (noise, math, transforms, time-functions). It translates the nodes to WebGL-compliant GLSL code in real-time, compiling and rendering it to a background canvas overlay with 60 FPS performance. Highly optimized with zero unnecessary state redraws.',
    tech: ['TypeScript', 'WebGL', 'GLSL', 'React', 'CSS Variables', 'Canvas API'],
    glowType: 'purple',
    github: 'https://github.com/example/shader-flow',
    demo: '#',
    stats: {
      stars: 489,
      fps: 60
    }
  },
  {
    id: 'chrono-kernel',
    title: 'ChronoKernel',
    category: 'Systems',
    description: 'A custom, preemptive multitasking OS kernel written in Rust targeting x86_64, featuring virtual memory management.',
    longDescription: 'ChronoKernel is an educational bare-metal operating system kernel built from scratch in Rust. It implements x86_64 CPU initialization, paging, virtual memory management, a thread scheduler supporting preemptive multitasking, interrupts management (IDT, PIC), and a basic custom filesystem. It integrates with QEMU for virtualization and utilizes linker scripts for precise memory map control.',
    tech: ['Rust', 'Assembly', 'QEMU', 'Linker Scripts', 'Docker', 'Makefile'],
    glowType: 'orange',
    github: 'https://github.com/example/chrono-kernel',
    stats: {
      stars: 612,
      lines: 12500
    }
  },
  {
    id: 'neuro-synth',
    title: 'NeuroSynth',
    category: 'AI',
    description: 'Real-time neural audio synthesizer that generates complex ambient soundscapes using client-side deep neural networks.',
    longDescription: 'NeuroSynth explores the intersection of neural networks and generative audio design. Running entirely client-side using TensorFlow.js, it translates mouse movement and ambient parameters into high-dimensional latent space vectors. These vectors are mapped in real-time using a decoder network to synthesize custom multi-voice synthesizer controls running directly on the Web Audio API.',
    tech: ['JavaScript', 'TensorFlow.js', 'Web Audio API', 'WebGPU', 'Vector Math'],
    glowType: 'cyan',
    github: 'https://github.com/example/neuro-synth',
    demo: '#',
    stats: {
      stars: 215,
      accuracy: '94.2%'
    }
  }
];
