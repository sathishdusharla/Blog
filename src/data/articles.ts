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
    id: 'navsight-assistive-navigation',
    title: 'NavSight: Computer Vision and Multimodal Voice Guidance for Indoor Assistive Navigation',
    excerpt: 'An in-depth research paper detailing the design of NavSight: an offline-first assistive system integrating YOLOv3 obstacle detection, OpenCV spatial mapping, and localized voice guidance.',
    date: 'October 12, 2024',
    readTime: '5 min read',
    category: 'Systems',
    tags: ['AI', 'Computer Vision', 'Python', 'YOLOv3', 'OpenCV'],
    featured: true,
    content: `
      <p>NavSight was engineered to solve the complex challenge of indoor navigation for visually impaired individuals. While outdoor navigation is largely solved by GPS, indoor environments present severe limitations: weak satellite reception, narrow hallways, moving obstacles, and room-level destination details.</p>
      
      <h3>System Architecture</h3>
      <p>NavSight integrates local computer vision algorithms with voice synthesis to build a hands-free, offline-first assistive loop. By processing mobile camera streams locally, it eliminates network dependency, ensuring user safety in disconnected spaces.</p>
      
      <pre><code class="language-python"># Obstacle detection loop using OpenCV and YOLOv3
import cv2
import numpy as np

def process_frame(frame, net, output_layers):
    height, width, channels = frame.shape
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)
    return parse_detections(outs, width, height)</code></pre>
      
      <h3>Two-Stage Multimodal Guidance</h3>
      <p>The system leverages YOLOv3 for low-latency obstacle identification (e.g. chairs, stairs, doorways) paired with QR code landmarks for absolute room-level localization. Detected nodes are queued into an asynchronous audio pipeline that translates spatial distances into intuitive directional sound prompts (e.g., 'Obstacle detected 2 meters ahead, path clear to the left').</p>
      
      <p>By pairing local, low-latency deep learning inference with speech prompts, NavSight achieves an assistive navigation flow that empowers independence in complex indoor environments.</p>
    `
  }
];
