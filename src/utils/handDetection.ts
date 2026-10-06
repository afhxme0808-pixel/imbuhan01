export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export type LandmarkConnection = [number, number];

// Standard 21 MediaPipe hand joint connections
export const HAND_CONNECTIONS: LandmarkConnection[] = [
  // Ibu Jari (Thumb)
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Jari Telunjuk (Index)
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Jari Hantu (Middle)
  [9, 10], [10, 11], [11, 12],
  // Jari Manis (Ring)
  [13, 14], [14, 15], [15, 16],
  // Jari Kelingking (Pinky)
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Tapak Tangan (Palm)
  [5, 9], [9, 13], [13, 17], [0, 5], [0, 17]
];

export interface HandGestureState {
  hasHand: boolean;
  x: number; // 0 to 1 normalized
  y: number; // 0 to 1 normalized
  isGrabbing: boolean;
  isOpen: boolean;
  rawLandmarks?: Landmark[];
}

export interface MediaPipeHandsInstance {
  setOptions: (options: {
    maxNumHands?: number;
    modelComplexity?: number;
    minDetectionConfidence?: number;
    minTrackingConfidence?: number;
  }) => void;
  onResults: (callback: (results: {
    multiHandLandmarks?: Landmark[][];
    multiHandedness?: Array<{ label: string; score: number }>;
  }) => void) => void;
  send: (input: { image: HTMLVideoElement | HTMLCanvasElement }) => Promise<void>;
  close?: () => void;
}

// Ensure the MediaPipe Hands CDN script is present in document
export async function ensureMediaPipeScripts(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // Check if already available on window
  const win = window as unknown as { Hands?: new (options: unknown) => MediaPipeHandsInstance };
  if (win.Hands) return true;

  return new Promise((resolve) => {
    let scriptHands = document.getElementById('mediapipe-hands-script') as HTMLScriptElement | null;
    if (!scriptHands) {
      scriptHands = document.createElement('script');
      scriptHands.id = 'mediapipe-hands-script';
      scriptHands.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
      scriptHands.crossOrigin = 'anonymous';
      scriptHands.onload = () => resolve(true);
      scriptHands.onerror = () => resolve(false);
      document.head.appendChild(scriptHands);
    } else {
      scriptHands.addEventListener('load', () => resolve(true));
    }
  });
}

/**
 * Initializes and returns the MediaPipe Hands instance.
 */
export async function initMediaPipeHands(): Promise<MediaPipeHandsInstance | null> {
  try {
    await ensureMediaPipeScripts();
    const win = window as unknown as {
      Hands?: new (config: { locateFile: (file: string) => string }) => MediaPipeHandsInstance;
    };

    if (!win.Hands) {
      console.warn('MediaPipe Hands not yet attached to window.');
      return null;
    }

    const hands = new win.Hands({
      locateFile: (file: string) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    return hands;
  } catch (err) {
    console.error('Error creating MediaPipe Hands instance:', err);
    return null;
  }
}

/**
 * Accurately analyzes 21 hand landmarks to determine if the hand is:
 * - isGrabbing: FIST / PINCH (fingers curled into palm or thumb/index pinched)
 * - isOpen: FLAT / EXTENDED PALM (fingers spread open)
 * Also returns center coordinates of the palm/pinch.
 */
export function analyzeHandGesture(
  landmarks: Landmark[]
): { isGrabbing: boolean; isOpen: boolean; palmX: number; palmY: number } {
  if (!landmarks || landmarks.length < 21) {
    return { isGrabbing: false, isOpen: true, palmX: 0.5, palmY: 0.5 };
  }

  const wrist = landmarks[0];
  const thumbTip = landmarks[4];
  const indexMcp = landmarks[5];
  const indexTip = landmarks[8];
  const middleMcp = landmarks[9];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  // Mirrored X for webcam selfie mode (1 - x)
  const palmX = 1 - (indexMcp.x + middleMcp.x) / 2;
  const palmY = (indexMcp.y + middleMcp.y) / 2;

  const dist = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Distance from fingertips to wrist
  const dIndex = dist(indexTip, wrist);
  const dMiddle = dist(middleTip, wrist);
  const dRing = dist(ringTip, wrist);
  const dPinky = dist(pinkyTip, wrist);

  // Reference scale: wrist to middle knuckle (MCP)
  const handScale = dist(middleMcp, wrist) || 0.18;

  // Pinch distance (thumb tip to index tip)
  const pinchDist = dist(thumbTip, indexTip);

  // Average distance of finger tips to wrist
  const avgTipDist = (dIndex + dMiddle + dRing + dPinky) / 4;
  const curlRatio = avgTipDist / handScale;

  // A hand is GRABBING if fingers are curled in (fist) OR thumb/index are pinching
  const isCurled = curlRatio < 1.15;
  const isPinched = pinchDist < 0.09 * (handScale / 0.18);

  const isGrabbing = isCurled || isPinched;
  const isOpen = !isGrabbing && curlRatio > 1.25;

  return { isGrabbing, isOpen, palmX, palmY };
}
