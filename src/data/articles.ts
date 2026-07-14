export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML format for rendering
  date: string;
  readTime: string;
  category: 'Graphics' | 'CSS' | 'WebAssembly' | 'Systems' | 'Tech News';
  tags: string[];
  featured: boolean;
}

export const articles: Article[] = [
  {
    id: 'optimizing-canvas-content-visibility',
    title: 'Optimizing WebGL Canvas Rendering using Content-Visibility',
    excerpt: 'How we can drastically improve rendering performance and conserve battery on heavy layouts by pausing canvas rendering loop when off-screen.',
    date: 'July 10, 2026',
    readTime: '6 min read',
    category: 'Graphics',
    tags: ['WebGL', 'CSS', 'Performance', 'UX'],
    featured: true,
    content: `
      <p>As frontend engineers and graphical designers, we love rich, interactive visual canvases. However, having multiple active WebGL or 2D canvas elements on a single page can quickly degrade frame rates, spike CPU/GPU usage, and drain device batteries.</p>
      
      <h3>The Performance Bottleneck</h3>
      <p>By default, browser animation loops run using <code>requestAnimationFrame</code>. While <code>requestAnimationFrame</code> pauses when the entire browser tab is inactive, it continues firing even if the specific canvas element has been scrolled completely off-screen. Rendering complex scenes, computing fractals, or performing neural network feedforwards on off-screen elements wastes critical GPU compute cycles.</p>
      
      <h3>Modern Solution: CSS <code>content-visibility: auto</code></h3>
      <p>Modern CSS provides the <code>content-visibility</code> property. When set to <code>auto</code>, the browser skips rendering the element's contents (including layout, paint, and hit-testing) as long as it is out of the user's viewport. This is a massive win for heavy pages.</p>
      
      <pre><code class="language-css">/* Optimize rendering boundaries */
.canvas-wrapper {
  content-visibility: auto;
  contain-intrinsic-size: auto 400px;
}</code></pre>
      
      <h3>Pairing CSS with Intersection Observer</h3>
      <p>While <code>content-visibility: auto</code> saves layout and painting work, it doesn't automatically stop JavaScript loops inside a canvas. To stop custom WebGL calculations or canvas draw calls when off-screen, we can synchronize our animation loops with the element's visibility state using an <strong>Intersection Observer</strong>:</p>
      
      <pre><code class="language-typescript">const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startAnimationLoop();
    } else {
      stopAnimationLoop();
    }
  });
}, { threshold: 0.1 });

observer.observe(canvasElement);</code></pre>
      
      <p>By combining <code>content-visibility: auto</code> with JS-based animation suspension, we achieve optimal rendering performance: <strong>0% CPU/GPU overhead</strong> for off-screen canvas elements, preserving device battery life and leaving GPU power for what is active.</p>
    `
  },
  {
    id: 'css-cascade-layers-guide',
    title: 'Why CSS Cascade Layers are Re-Architecting Frontend Styles',
    excerpt: 'Ditch the BEM naming conventions and specificity wars. Learn how `@layer` creates structured, predictable, and maintainable styling systems natively.',
    date: 'June 28, 2026',
    readTime: '5 min read',
    category: 'CSS',
    tags: ['CSS', 'Architecture', 'Design System'],
    featured: false,
    content: `
      <p>Specificity wars have plagued CSS architecture since the dawn of the web. Developers spent years devising naming methodologies like BEM (Block, Element, Modifier) or leveraging CSS-in-JS to isolate styles. Today, native CSS provides a superior solution: <strong>Cascade Layers (<code>@layer</code>)</strong>.</p>
      
      <h3>The Specificity Problem</h3>
      <p>Traditionally, CSS rule precedence was governed strictly by selector specificity. An ID selector (<code>#id</code>) always beats a class selector (<code>.class</code>), which in turn beats an element selector (<code>div</code>). This led to hacks like <code>!important</code> or over-nested selectors (<code>body .wrapper .main .card .button</code>) just to override third-party library styles.</p>
      
      <h3>Enter Cascade Layers</h3>
      <p>Cascade Layers allow us to organize our styles into prioritized layers. Precedence is determined by the order of layer declaration, <em>regardless of selector specificity within those layers</em>. Lower layers can never override higher layers, even if their selectors have higher specificity.</p>
      
      <pre><code class="language-css">/* Declare layer ordering upfront */
@layer reset, base, theme, components, utilities;

@layer base {
  /* This has a class, which traditionally has higher specificity */
  .button-reset {
    padding: 12px;
    border-radius: 4px;
  }
}

@layer components {
  /* This is a simple tag selector. 
     Because it lives in a higher layer (components > base),
     it successfully overrides base styles! */
  button {
    padding: 16px; 
    border-radius: 12px;
  }
}</code></pre>
      
      <h3>Predictable Overrides with <code>:where()</code></h3>
      <p>Within a layer, we can make styles easily overridable by using the <code>:where()</code> pseudo-class. <code>:where()</code> reduces the selector's specificity to exactly <strong>zero</strong>. This is highly useful for defining base defaults that developers can override without fighting specificity.</p>
      
      <p>By adopting native cascade layers, we clean up our codebase, eliminate nested wrapper styles, and make design systems highly customizable. The cascade is finally working for us, not against us.</p>
    `
  },
  {
    id: 'wasm-multithreading-sharedarraybuffer',
    title: 'Parallel Calculations in the Browser: WebAssembly and SharedArrayBuffer',
    excerpt: 'How to build multi-threaded web applications in Rust and WebAssembly, sharing memory across workers for near-native computing speeds.',
    date: 'May 14, 2026',
    readTime: '8 min read',
    category: 'WebAssembly',
    tags: ['WebAssembly', 'Rust', 'Concurrency', 'Systems'],
    featured: true,
    content: `
      <p>Web applications are no longer limited to simple page navigations and light form inputs. From video editing in the browser to real-time 3D path tracing, modern web apps demand near-native processing speeds. To achieve this, we must break free from JavaScript's single-threaded nature.</p>
      
      <h3>The Concurrency Landscape on the Web</h3>
      <p>Historically, browsers achieved concurrency via <strong>Web Workers</strong>. However, standard workers communicate using message passing (<code>postMessage</code>), which requires copying data (Structured Clone algorithm) or transferring ownership of buffers (Transferable Objects). For high-frequency interactions or large data sets, this serialization overhead destroys performance.</p>
      
      <h3>Sharing Memory with SharedArrayBuffer</h3>
      <p>To perform true parallel computation, we need threads that share the same memory space. This is where <code>SharedArrayBuffer</code> comes in. It allows multiple Web Workers to read and write to the same physical memory allocation without copies.</p>
      
      <pre><code class="language-typescript">// In the main thread:
const memory = new WebAssembly.Memory({
  initial: 256,
  maximum: 512,
  shared: true // Enables SharedArrayBuffer backing
});

// Pass this memory object to all workers
worker.postMessage({ memory });</code></pre>
      
      <h3>Rust Threading in the Browser</h3>
      <p>When compiling Rust to WebAssembly via <code>wasm-bindgen</code>, we can map standard Rust threads (<code>std::thread</code>) to Web Workers. Under the hood, Rust allocates heap memory in the shared WebAssembly memory buffer. Rust's safety guarantees (Send and Sync traits) prevent data races at compile time, making concurrent web code safe.</p>
      
      <pre><code class="language-rust">// Standard Rust concurrency compiles to WASM thread pools
use std::thread;

pub fn parallel_sum(data: &[i32]) -> i32 {
    let chunks = data.chunks(data.len() / 4);
    let handles: Vec<_> = chunks.map(|chunk| {
        let owned_chunk = chunk.to_vec();
        thread::spawn(move || owned_chunk.iter().sum::<i32>())
    }).collect();

    handles.into_iter().map(|h| h.join().unwrap()).sum()
}</code></pre>
      
      <h3>Security Headers Warning</h3>
      <p>To enable <code>SharedArrayBuffer</code>, browsers require strict Cross-Origin Isolation headers for security reasons (mitigating Spectre vulnerabilities):</p>
      <pre><code class="language-http">Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp</code></pre>
      
      <p>With these headers configured, Rust + WebAssembly multithreading delivers native-level multi-core performance directly on the web, unlocking new possibilities for web graphics, cryptography, and complex simulations.</p>
    `
  }
];
