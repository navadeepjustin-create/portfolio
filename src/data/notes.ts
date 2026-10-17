export interface NotePost {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  summary: string;
  content: string[];
}

export const notesData: NotePost[] = [
  {
    slug: 'decoupling-qr-tokens-campus-workflows',
    title: 'Decoupling QR Tokens from Payment Gateways in Campus Workflows',
    date: '2025-02-14',
    readingTime: '4 min read',
    tags: ['Architecture', 'Campus Logistics', 'QR Protocol'],
    summary:
      'Why coupling payment gateway handshakes with physical pickup verification creates severe counter bottlenecks, and why decoupled tokens solve it.',
    content: [
      'In collegiate environments, network connectivity is notoriously erratic. Basement photocopy centers and reinforced concrete cafeteria halls frequently drop 4G/5G signals or experience severe packet loss on saturated campus Wi-Fi.',
      'When building Statio-MLR, the initial assumption was to bundle payment status check directly into the pickup QR token scan. However, real-world workflow observation quickly revealed a fundamental flaw: if the store clerk’s scanner must execute an external HTTP roundtrip to a payment gateway provider before displaying the student’s print job, any gateway latency (or 3G stall) freezes the entire physical counter line.',
      'The architectural solution is deliberate decoupling: payment reconciliation is handled asynchronously in the background. The counter operator scanner only validates an authenticated token hash (#ST-094) stored in memory, confirming physical order identification in under 3 seconds.',
      'Key engineering takeaway: When designing software for physical spaces, never place third-party cloud network dependencies in the critical path of physical human handoffs.',
    ],
  },
  {
    slug: 'client-side-ml-queue-estimation',
    title: 'Client-Side In-Browser ML: When Edge Inference Beats API Calls',
    date: '2025-01-28',
    readingTime: '3 min read',
    tags: ['Machine Learning', 'Edge Compute', 'TypeScript'],
    summary:
      'Exploring why micro-neural regression models running in pure JavaScript deliver superior perceived latency for campus rush prediction.',
    content: [
      'For features like real-time canteen queue estimation, deploying an external Python serverless function introduces unnecessary network overhead: cold starts (200–800ms), DNS resolution, and JSON serialization latency.',
      'By running a lightweight feedforward regression matrix directly in the client browser thread, inference latency drops to under 1 millisecond (0.4ms in benchmarks).',
      'As student users drag sliders for break times and queue lengths, the mathematical projection updates at 60 frames per second without generating a single outbound HTTP request or consuming cloud compute credits.',
      'Disciplined ML engineering is not about using the largest foundation model available; it is about choosing the minimal sufficient model architecture that solves the user problem with maximum speed and zero friction.',
    ],
  },
];
