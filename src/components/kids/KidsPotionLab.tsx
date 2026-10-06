import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  RotateCcw,
  Camera,
  HelpCircle,
  ArrowRight,
  SlidersHorizontal,
  X,
  Check,
} from 'lucide-react';
import {
  KIDS_WORDS,
  KIDS_IMBUHAN,
  KidsWord,
  getKidsCombination,
  isValidKidsCombination,
  getValidAffixesForWord,
} from '../../data/kidsData';
import { soundManager } from '../../utils/audio';
import {
  initMediaPipeHands,
  analyzeHandGesture,
  HAND_CONNECTIONS,
  HandGestureState,
  MediaPipeHandsInstance,
  Landmark,
} from '../../utils/handDetection';

interface KidsPotionLabProps {
  onEarnStar: () => void;
  onBackToMenu: () => void;
}

type ExperimentStep =
  | 'campur'     // Mixing ingredients (Kata Dasar & Imbuhan)
  | 'magik'      // Adding magic dropper
  | 'goncang'    // Shaking like a scientist (MUST GRAB & SHAKE LEFT-RIGHT)
  | 'selesai';   // Completed reaction

/**
 * Helper to draw MediaPipe hand skeleton and landmark points on canvas
 * Uses object-cover transformation so full-bleed widescreen camera lines align 100% on hands!
 */
function drawHandSkeleton(
  ctx: CanvasRenderingContext2D,
  landmarks: Landmark[],
  canvasWidth: number,
  canvasHeight: number,
  isGrabbing: boolean,
  videoAspect: number
) {
  if (canvasWidth <= 0 || canvasHeight <= 0) return;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Compute object-cover coordinate mapping
  const canvasAspect = canvasWidth / canvasHeight;
  let renderW = canvasWidth;
  let renderH = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (canvasAspect > videoAspect) {
    // Canvas is wider than video (widescreen screen, video fills width & centers vertically)
    renderW = canvasWidth;
    renderH = canvasWidth / videoAspect;
    offsetY = (canvasHeight - renderH) / 2;
    offsetX = 0;
  } else {
    // Canvas is taller than video (portrait mobile, video fills height & centers horizontally)
    renderH = canvasHeight;
    renderW = canvasHeight * videoAspect;
    offsetX = (canvasWidth - renderW) / 2;
    offsetY = 0;
  }

  // Glowing palette based on gesture state:
  // GENGGAM (Grab) = Glowing Golden Amber (#F59E0B)
  // LEPAS (Open) = Neon Mint Emerald (#10B981)
  const lineColor = isGrabbing ? '#F59E0B' : '#10B981';
  const glowColor = isGrabbing ? 'rgba(245, 158, 11, 0.95)' : 'rgba(16, 185, 129, 0.95)';
  const dotFill = isGrabbing ? '#FBBF24' : '#34D399';

  ctx.save();
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 14;
  ctx.lineWidth = isGrabbing ? 5 : 3.5;
  ctx.strokeStyle = lineColor;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // 1. Draw Skeleton Lines (Garis-Garis Rangka Tulang Jari)
  for (const [startIdx, endIdx] of HAND_CONNECTIONS) {
    const p1 = landmarks[startIdx];
    const p2 = landmarks[endIdx];
    if (!p1 || !p2) continue;

    // Mirrored X because video feed is mirrored
    const x1 = offsetX + (1 - p1.x) * renderW;
    const y1 = offsetY + p1.y * renderH;
    const x2 = offsetX + (1 - p2.x) * renderW;
    const y2 = offsetY + p2.y * renderH;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // 2. Draw Joint Landmark Dots (21 Titik-Titik Sendi)
  for (let i = 0; i < landmarks.length; i++) {
    const lm = landmarks[i];
    const x = offsetX + (1 - lm.x) * renderW;
    const y = offsetY + lm.y * renderH;

    const isFingertip = i === 4 || i === 8 || i === 12 || i === 16 || i === 20;
    const radius = isFingertip ? 7 : (i === 0 ? 8 : 4.5);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = dotFill;
    ctx.fill();

    // Center white core
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.45, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }

  // 3. Draw Floating Hand Gesture Status Badge
  const wrist = landmarks[0];
  const middleMcp = landmarks[9];
  const palmCenterX = offsetX + (1 - (wrist.x + middleMcp.x) / 2) * renderW;
  const palmCenterY = offsetY + ((wrist.y + middleMcp.y) / 2) * renderH;

  ctx.restore();
  ctx.save();
  ctx.font = 'bold 13px Fredoka, Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const badgeText = isGrabbing ? '✊ GENGGAM!' : '🖐️ LEPAS';
  const badgeBg = isGrabbing ? '#F59E0B' : '#10B981';
  const badgeTextColor = '#020617';

  const textWidth = ctx.measureText(badgeText).width;
  const badgeX = palmCenterX - textWidth / 2 - 12;
  const badgeY = palmCenterY - 34;

  ctx.fillStyle = badgeBg;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, textWidth + 24, 26, 13);
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = badgeTextColor;
  ctx.fillText(badgeText, palmCenterX, badgeY + 13);
  ctx.restore();
}

/**
 * SLIM LABORATORY BOTTLE (Botol Makmal Kurus)
 * Features dynamic liquid emptying / draining and cork-popped opening animation!
 */
interface SlimLabBottleProps {
  type: 'verb' | 'affix' | 'dropper';
  title: string;
  category: string;
  emoji: string;
  liquidColor: string;
  liquidSecondaryColor: string;
  isGrabbed: boolean;
  tilt: number;
  liquidPercent?: number; // 0 to 100 (empties as it pours!)
  corkPopped?: boolean;   // true when bottle is opened for pouring
  isPouring?: boolean;    // true during active pour animation
}

const SlimLabBottle: React.FC<SlimLabBottleProps> = ({
  type,
  title,
  category,
  emoji,
  liquidColor,
  liquidSecondaryColor,
  isGrabbed,
  tilt,
  liquidPercent = 100,
  corkPopped = false,
  isPouring = false,
}) => {
  const drainRatio = Math.max(0, Math.min(100, liquidPercent)) / 100;
  const liquidTopY = 203 - 101 * drainRatio;

  return (
    <div
      className="flex flex-col items-center select-none"
      style={{
        transform: `rotate(${tilt}deg)`,
        transformOrigin: isPouring ? '50% 20%' : '50% 85%',
        transition: isGrabbed ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
    >
      {/* SVG Slim Lab Bottle */}
      <div className="relative w-14 h-40 sm:w-16 sm:h-44 flex items-center justify-center filter drop-shadow-[0_10px_22px_rgba(0,0,0,0.7)]">
        <svg viewBox="0 0 76 210" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`liquidGrad-${type}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={liquidSecondaryColor} stopOpacity="0.9" />
              <stop offset="60%" stopColor={liquidColor} stopOpacity="1" />
              <stop offset="100%" stopColor={liquidSecondaryColor} stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id={`glassGrad-${type}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="25%" stopColor="#A7F3D0" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#047857" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id={`corkGrad-${type}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="40%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <clipPath id={`bottleInnerClip-${type}`}>
              <path d="M 20 74 L 56 74 L 56 184 C 56 196 48 203 38 203 C 28 203 20 196 20 184 Z" />
            </clipPath>
          </defs>

          {/* 1. TOP STOPPER / CORK OR DROPPER BULB */}
          {type === 'dropper' ? (
            <g className={corkPopped ? 'animate-pulse' : ''}>
              <ellipse
                cx="38"
                cy={corkPopped ? 18 : 14}
                rx={corkPopped ? 12 : 14}
                ry={corkPopped ? 9 : 12}
                fill="#7E22CE"
                stroke="#C084FC"
                strokeWidth="2"
              />
              <rect x="30" y="24" width="16" height="8" rx="2" fill="#9333EA" stroke="#E9D5FF" strokeWidth="1.5" />
            </g>
          ) : !corkPopped ? (
            <g>
              <ellipse cx="38" cy="10" rx="11" ry="5" fill={`url(#corkGrad-${type})`} stroke="#78350F" strokeWidth="1.5" />
              <path d="M 28 10 L 48 10 L 45 28 L 31 28 Z" fill={`url(#corkGrad-${type})`} stroke="#451A03" strokeWidth="1.5" />
            </g>
          ) : (
            <g className="animate-bounce">
              <ellipse cx="56" cy="-4" rx="9" ry="4" fill={`url(#corkGrad-${type})`} stroke="#78350F" strokeWidth="1.5" />
              <path d="M 48 -4 L 64 -4 L 62 10 L 50 10 Z" fill={`url(#corkGrad-${type})`} stroke="#451A03" strokeWidth="1.5" />
              <text x="58" y="24" fontSize="12" fill="#FBBF24">✨</text>
            </g>
          )}

          {/* 2. GLASS FLANGED LIP / RIM */}
          <ellipse
            cx="38"
            cy="30"
            rx="16"
            ry="5.5"
            fill="rgba(255,255,255,0.4)"
            stroke="#6EE7B7"
            strokeWidth="2.5"
          />

          {/* 3. SLENDER GLASS NECK */}
          <rect
            x="29"
            y="30"
            width="18"
            height="22"
            fill={`url(#glassGrad-${type})`}
            stroke="#6EE7B7"
            strokeWidth="2"
          />

          {/* 4. SLIM CYLINDRICAL GLASS BODY */}
          <path
            d="M 29 52 C 22 55 18 64 18 74 L 18 184 C 18 198 27 205 38 205 C 49 205 58 198 58 184 L 58 74 C 58 64 54 55 47 52 Z"
            fill={`url(#glassGrad-${type})`}
            stroke="#6EE7B7"
            strokeWidth="2.5"
          />

          {/* 5. VISIBLE DRAINING LIQUID COLUMN */}
          {drainRatio > 0.02 && (
            <g clipPath={`url(#bottleInnerClip-${type})`}>
              <rect
                x="18"
                y={liquidTopY}
                width="40"
                height={205 - liquidTopY}
                fill={`url(#liquidGrad-${type})`}
              />
              <ellipse
                cx="38"
                cy={liquidTopY}
                rx="18"
                ry="4.5"
                fill={liquidSecondaryColor}
                opacity="0.9"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              <circle cx="32" cy={liquidTopY + 25} r="2.5" fill="#FFFFFF" opacity="0.8" />
              <circle cx="44" cy={liquidTopY + 45} r="2" fill="#FFFFFF" opacity="0.7" />
            </g>
          )}

          {/* 6. GRADUATED MEASUREMENT TICK MARKS */}
          <line x1="22" y1="90" x2="32" y2="90" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
          <text x="35" y="93" fill="#FFFFFF" fontSize="7" fontWeight="bold" opacity="0.85">50</text>
          <line x1="22" y1="112" x2="28" y2="112" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
          <line x1="22" y1="134" x2="32" y2="134" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
          <text x="35" y="137" fill="#FFFFFF" fontSize="7" fontWeight="bold" opacity="0.85">30</text>
          <line x1="22" y1="156" x2="28" y2="156" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.7" />
          <line x1="22" y1="178" x2="32" y2="178" stroke="#FFFFFF" strokeWidth="2" opacity="0.85" />
          <text x="35" y="181" fill="#FFFFFF" fontSize="7" fontWeight="bold" opacity="0.85">10</text>

          {/* 7. SPECULAR GLOSS HIGHLIGHT */}
          <path
            d="M 23 74 L 23 182"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 27 74 L 27 182"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Central Label Attached to Slim Bottle */}
        <div className="absolute top-[48%] -translate-y-1/2 flex flex-col items-center justify-center text-center px-1 max-w-[85%] pointer-events-none">
          <span className="text-lg sm:text-xl drop-shadow-md">{emoji}</span>
          <span className="text-[10px] sm:text-xs font-black font-game uppercase tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-slate-950/80 px-2 py-0.5 rounded-md border border-white/40">
            {title}
          </span>
          <span className="text-[7px] font-bold text-amber-300 uppercase tracking-widest mt-0.5 drop-shadow-sm">
            {category}
          </span>
        </div>
      </div>

      {/* Floating Grip Indicator */}
      <div className="mt-1 flex items-center justify-center">
        {isGrabbed ? (
          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black font-game shadow-md animate-pulse">
            ✊ DIPEGANG
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-teal-300 text-[8px] font-bold border border-teal-500/40">
            Bahan Siap
          </span>
        )}
      </div>
    </div>
  );
};

type GrabbedItem = 'verb' | 'affix' | 'dropper' | null;

interface PouringData {
  item: 'verb' | 'affix' | 'dropper';
  bottleX: number;
  bottleY: number;
  bottleTilt: number;
  liquidDrainPercent: number;
  corkPopped: boolean;
  streamActive: boolean;
  streamColor: string;
  streamSecondaryColor: string;
  dropperDripsCount?: number;
}

export const KidsPotionLab: React.FC<KidsPotionLabProps> = ({
  onEarnStar,
  onBackToMenu,
}) => {
  // Game Setup State
  const [selectedWord, setSelectedWord] = useState<KidsWord>(KIDS_WORDS[0]);
  const [selectedPotion, setSelectedPotion] = useState<string>(KIDS_IMBUHAN[0].id);
  const [isIngredientsDrawerOpen, setIsIngredientsDrawerOpen] = useState<boolean>(false);
  const [draftWord, setDraftWord] = useState<KidsWord>(KIDS_WORDS[0]);
  const [draftPotion, setDraftPotion] = useState<string>(KIDS_IMBUHAN[0].id);

  // Synchronize draft selections when drawer opens
  useEffect(() => {
    if (isIngredientsDrawerOpen) {
      setDraftWord(selectedWord);
      setDraftPotion(selectedPotion);
    }
  }, [isIngredientsDrawerOpen, selectedWord, selectedPotion]);

  // Derived active morphology combination (Tatabahasa Dewan baku)
  const activeAffixInfo =
    KIDS_IMBUHAN.find((i) => i.id === selectedPotion) || KIDS_IMBUHAN[0];
  const activeCombination = getKidsCombination(selectedWord.kata, selectedPotion);
  const displayHasil = activeCombination?.hasil || selectedWord.hasil;
  const displayRahsia = activeCombination?.rahsiaHuruf || selectedWord.rahsiaHuruf;
  const displayMakna = activeCombination?.maknaRingkas || selectedWord.maknaRingkas;
  const displayAyat = activeCombination?.ayatContoh || selectedWord.ayatContoh;

  // Experiment Lifecycle State
  const [step, setStep] = useState<ExperimentStep>('campur');
  const [verbPoured, setVerbPoured] = useState<boolean>(false);
  const [affixPoured, setAffixPoured] = useState<boolean>(false);
  const [dropperPoured, setDropperPoured] = useState<boolean>(false);
  const [shakeProgress, setShakeProgress] = useState<number>(0);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [starAwarded, setStarAwarded] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Real Pouring Animation State
  const [pouringData, setPouringData] = useState<PouringData | null>(null);
  const [displayedLiquidLevel, setDisplayedLiquidLevel] = useState<number>(0);

  // Camera & MediaPipe State
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [, setHandState] = useState<HandGestureState>({
    hasHand: false,
    x: 0.5,
    y: 0.5,
    isGrabbing: false,
    isOpen: true,
  });

  // Bottle Positions & Interactive Physics
  const [grabbedItem, setGrabbedItem] = useState<GrabbedItem>(null);
  const [itemPositions, setItemPositions] = useState<{
    verb: { x: number; y: number; isFalling: boolean; tilt: number };
    affix: { x: number; y: number; isFalling: boolean; tilt: number };
    dropper: { x: number; y: number; isFalling: boolean; tilt: number };
  }>({
    verb: { x: 18, y: 64, isFalling: false, tilt: 0 },
    affix: { x: 82, y: 64, isFalling: false, tilt: 0 },
    dropper: { x: 84, y: 34, isFalling: false, tilt: 0 },
  });

  // Shaking Beaker State
  const [isBeakerGrabbed, setIsBeakerGrabbed] = useState<boolean>(false);
  const [beakerShakeOffset, setBeakerShakeOffset] = useState<{ x: number; y: number; tilt: number }>({
    x: 0,
    y: 0,
    tilt: 0,
  });

  // Refs for tracking, video, canvas
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mirrorVideoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handsRef = useRef<MediaPipeHandsInstance | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const physicsFrameIdRef = useRef<number | null>(null);
  const videoAspectRef = useRef<number>(640 / 480);
  const isInitializingCameraRef = useRef<boolean>(false);

  // Tracking smoothing & shake analysis
  const smoothedHandRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const rawHandRef = useRef<{ x: number; y: number; isGrabbing: boolean; isOpen: boolean }>({
    x: 0.5,
    y: 0.5,
    isGrabbing: false,
    isOpen: true,
  });
  const prevSmoothXRef = useRef<number>(0.5);
  const lastShakeDirectionRef = useRef<'left' | 'right' | null>(null);
  const isProcessingFrameRef = useRef<boolean>(false);

  // Synchronized state refs for uninterrupted 60FPS physics loop
  const stepRef = useRef<ExperimentStep>(step);
  stepRef.current = step;
  const grabbedItemRef = useRef<GrabbedItem>(grabbedItem);
  grabbedItemRef.current = grabbedItem;
  const isBeakerGrabbedRef = useRef<boolean>(isBeakerGrabbed);
  isBeakerGrabbedRef.current = isBeakerGrabbed;
  const itemPositionsRef = useRef(itemPositions);
  itemPositionsRef.current = itemPositions;
  const pouringDataRef = useRef(pouringData);
  pouringDataRef.current = pouringData;
  const verbPouredRef = useRef(verbPoured);
  verbPouredRef.current = verbPoured;
  const affixPouredRef = useRef(affixPoured);
  affixPouredRef.current = affixPoured;
  const dropperPouredRef = useRef(dropperPoured);
  dropperPouredRef.current = dropperPoured;
  const selectedPotionRef = useRef<string>(selectedPotion);
  selectedPotionRef.current = selectedPotion;

  // Pointer drag fallback state
  const pointerDragRef = useRef<{
    activeItem: GrabbedItem;
    startX: number;
    startY: number;
  }>({
    activeItem: null,
    startX: 0,
    startY: 0,
  });

  // Beaker Target Zone check: center over beaker resting on lab bench
  const checkIsOverBeaker = useCallback((x: number, y: number) => {
    return x >= 24 && x <= 76 && y >= 34 && y <= 86;
  }, []);

  // Falling animation when bottle is released away from beaker
  const handleBottleFall = useCallback((item: GrabbedItem) => {
    if (!item) return;

    setItemPositions((prev) => ({
      ...prev,
      [item]: {
        ...prev[item],
        isFalling: true,
        tilt: 0,
      },
    }));

    setTimeout(() => {
      const defaultX = item === 'verb' ? 18 : item === 'affix' ? 82 : 84;
      const defaultY = item === 'dropper' ? 34 : 64;

      setItemPositions((prev) => ({
        ...prev,
        [item]: {
          x: defaultX,
          y: defaultY,
          isFalling: false,
          tilt: 0,
        },
      }));
    }, 400);
  }, []);

  // Trigger Reaction Explosion
  const triggerExplosion = useCallback(() => {
    soundManager.playMagicReaction();
    setIsReacting(true);
    setStep('selesai');
    setIsBeakerGrabbed(false);

    setTimeout(() => {
      soundManager.playFanfare();
      setIsReacting(false);
      if (!starAwarded) {
        onEarnStar();
        setStarAwarded(true);
      }
    }, 900);
  }, [starAwarded, onEarnStar]);

  /**
   * ACTUAL ANIMATED POURING SEQUENCE:
   * 1. Bottle moves to beaker lip on the table
   * 2. Cork pops off
   * 3. Bottle tilts smoothly over beaker (~78deg)
   * 4. Glowing liquid stream flows into the beaker
   * 5. Liquid visibly drains from bottle (100% -> 0%)
   * 6. Liquid level inside beaker smoothly rises
   * 7. Bottle straightens, does victory shine, and fades out
   */
  const executePour = useCallback((item: 'verb' | 'affix' | 'dropper') => {
    if (pouringDataRef.current) return;

    if (item === 'verb' || item === 'affix') {
      const isVerb = item === 'verb';
      const bottleX = isVerb ? 40 : 60;
      const bottleY = 47;
      const targetTilt = isVerb ? 78 : -78;
      const currentAffix =
        KIDS_IMBUHAN.find((i) => i.id === selectedPotionRef.current) || KIDS_IMBUHAN[0];
      const streamColor = isVerb ? '#0284C7' : currentAffix.botolColor;
      const streamSecondaryColor = isVerb ? '#38BDF8' : currentAffix.botolSecondary;
      const targetBeakerLevel = (isVerb ? affixPouredRef.current : verbPouredRef.current) ? 65 : 35;
      const startBeakerLevel = displayedLiquidLevel;

      setPouringData({
        item,
        bottleX,
        bottleY,
        bottleTilt: 0,
        liquidDrainPercent: 100,
        corkPopped: false,
        streamActive: false,
        streamColor,
        streamSecondaryColor,
      });

      setTimeout(() => {
        soundManager.playClick();
        setPouringData((prev) =>
          prev
            ? {
                ...prev,
                corkPopped: true,
                bottleTilt: targetTilt,
                streamActive: true,
              }
            : null
        );
        soundManager.playPour();

        const totalDuration = 900;
        const startTime = Date.now();

        const drainInterval = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(1, elapsed / totalDuration);

          const remainingDrain = Math.max(0, Math.round((1 - progress) * 100));
          const currentLevel = startBeakerLevel + (targetBeakerLevel - startBeakerLevel) * progress;
          setDisplayedLiquidLevel(currentLevel);

          setPouringData((prev) =>
            prev ? { ...prev, liquidDrainPercent: remainingDrain } : null
          );

          if (progress >= 1) {
            clearInterval(drainInterval);
            soundManager.playBubble();
            setPouringData((prev) =>
              prev
                ? {
                    ...prev,
                    streamActive: false,
                    liquidDrainPercent: 0,
                    bottleTilt: isVerb ? 20 : -20,
                  }
                : null
            );

            setTimeout(() => {
              setPouringData(null);
              if (isVerb) {
                setVerbPoured(true);
                if (affixPouredRef.current) setStep('magik');
              } else {
                setAffixPoured(true);
                if (verbPouredRef.current) setStep('magik');
              }
            }, 300);
          }
        }, 35);
      }, 200);
    } else if (item === 'dropper') {
      setPouringData({
        item: 'dropper',
        bottleX: 50,
        bottleY: 38,
        bottleTilt: 0,
        liquidDrainPercent: 100,
        corkPopped: false,
        streamActive: false,
        streamColor: '#9333EA',
        streamSecondaryColor: '#EC4899',
        dropperDripsCount: 0,
      });

      setTimeout(() => {
        soundManager.playDrip();
        setDisplayedLiquidLevel(72);
        setPouringData((prev) =>
          prev ? { ...prev, corkPopped: true, dropperDripsCount: 1, liquidDrainPercent: 70 } : null
        );
      }, 300);

      setTimeout(() => {
        soundManager.playDrip();
        setDisplayedLiquidLevel(78);
        setPouringData((prev) =>
          prev ? { ...prev, dropperDripsCount: 2, liquidDrainPercent: 40 } : null
        );
      }, 700);

      setTimeout(() => {
        soundManager.playDrip();
        setDisplayedLiquidLevel(85);
        setPouringData((prev) =>
          prev ? { ...prev, dropperDripsCount: 3, liquidDrainPercent: 0 } : null
        );
      }, 1100);

      setTimeout(() => {
        soundManager.playSuccess();
        setPouringData(null);
        setDropperPoured(true);
        setStep('goncang');
      }, 1500);
    }
  }, [displayedLiquidLevel]);

  // Transition to magik step when both ingredients are poured
  useEffect(() => {
    if (verbPoured && affixPoured && !dropperPoured && step === 'campur') {
      setStep('magik');
    }
  }, [verbPoured, affixPoured, dropperPoured, step]);

  // Unified Camera & MediaPipe Initialization
  const setupCamera = useCallback(async () => {
    if (isInitializingCameraRef.current) return;
    isInitializingCameraRef.current = true;
    setCameraError(null);

    try {
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 },
          },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      if (stream && videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            if (videoRef.current.videoWidth && videoRef.current.videoHeight) {
              videoAspectRef.current = videoRef.current.videoWidth / videoRef.current.videoHeight;
            }
            videoRef.current.play().catch(() => {});
            setCameraReady(true);
            setCameraError(null);
          }
        };

        if (mirrorVideoRef.current) {
          mirrorVideoRef.current.srcObject = stream;
          mirrorVideoRef.current.play().catch(() => {});
        }

        // Initialize MediaPipe hands instance only once
        if (!handsRef.current) {
          const hands = await initMediaPipeHands();
          if (hands) {
            hands.onResults((results) => {
              if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const landmarks = results.multiHandLandmarks[0];
                const { isGrabbing, isOpen, palmX, palmY } = analyzeHandGesture(landmarks);

                const canvas = canvasRef.current;
                let screenXRatio = palmX;
                let screenYRatio = palmY;

                if (canvas) {
                  const rect = canvas.getBoundingClientRect();
                  const cW = rect.width || canvas.width || 640;
                  const cH = rect.height || canvas.height || 480;
                  const canvasAspect = cW / cH;
                  const vAspect = videoAspectRef.current;

                  if (canvasAspect > vAspect) {
                    const renderH = cW / vAspect;
                    const offsetY = (cH - renderH) / 2;
                    screenXRatio = palmX;
                    screenYRatio = (offsetY + palmY * renderH) / cH;
                  } else {
                    const renderW = cH * vAspect;
                    const offsetX = (cW - renderW) / 2;
                    screenXRatio = (offsetX + palmX * renderW) / cW;
                    screenYRatio = palmY;
                  }
                }

                rawHandRef.current = { x: screenXRatio, y: screenYRatio, isGrabbing, isOpen };
                smoothedHandRef.current.x += (screenXRatio - smoothedHandRef.current.x) * 0.45;
                smoothedHandRef.current.y += (screenYRatio - smoothedHandRef.current.y) * 0.45;

                setHandState({
                  hasHand: true,
                  x: smoothedHandRef.current.x,
                  y: smoothedHandRef.current.y,
                  isGrabbing,
                  isOpen,
                  rawLandmarks: landmarks,
                });

                if (canvas) {
                  const rect = canvas.getBoundingClientRect();
                  const w = Math.round(rect.width);
                  const h = Math.round(rect.height);
                  if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
                    canvas.width = w;
                    canvas.height = h;
                  }
                  const ctx = canvas.getContext('2d');
                  if (ctx && canvas.width > 0 && canvas.height > 0) {
                    drawHandSkeleton(
                      ctx,
                      landmarks,
                      canvas.width,
                      canvas.height,
                      isGrabbing,
                      videoAspectRef.current
                    );
                  }
                }
              } else {
                setHandState((prev) => ({ ...prev, hasHand: false }));
                if (canvasRef.current) {
                  const canvas = canvasRef.current;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                  }
                }
              }
            });
            handsRef.current = hands;
          }
        }
      }
    } catch (err: unknown) {
      console.warn('Camera permission denied or blocked:', err);
      setCameraError('Sila klik "Allow" pada dialog pelayar untuk membenarkan kamera!');
      setCameraReady(false);
    } finally {
      isInitializingCameraRef.current = false;
    }
  }, []);

  // Mount effect to start camera if enabled
  useEffect(() => {
    if (cameraEnabled) {
      setupCamera();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraReady(false);
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraEnabled, setupCamera]);

  // Continuous frame processing loop
  useEffect(() => {
    let isRunning = true;

    const processFrame = async () => {
      if (
        cameraReady &&
        videoRef.current &&
        videoRef.current.readyState >= 2 &&
        handsRef.current &&
        !isProcessingFrameRef.current
      ) {
        try {
          isProcessingFrameRef.current = true;
          await handsRef.current.send({ image: videoRef.current });
        } catch {
          // Ignore transient send errors
        } finally {
          isProcessingFrameRef.current = false;
        }
      }

      if (isRunning) {
        animFrameIdRef.current = requestAnimationFrame(processFrame);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(processFrame);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [cameraReady]);

  /**
   * ROCK-SOLID 60 FPS PHYSICS & INTERACTION LOOP:
   * Uses refs for state to eliminate re-subscription overhead and stutter!
   */
  useEffect(() => {
    let isRunning = true;

    const physicsLoop = () => {
      const targetHandX = smoothedHandRef.current.x * 100;
      const targetHandY = smoothedHandRef.current.y * 100;
      const { isGrabbing, isOpen } = rawHandRef.current;

      const deltaX = smoothedHandRef.current.x - prevSmoothXRef.current;
      prevSmoothXRef.current = smoothedHandRef.current.x;

      const currentStep = stepRef.current;
      const currentGrabbed = grabbedItemRef.current;
      const currentPouring = pouringDataRef.current;
      const currentBeakerGrabbed = isBeakerGrabbedRef.current;

      // -------------------------------------------------------------
      // PHASE A: STEP 'goncang' (FREE & DYNAMIC SHAKING ON TABLE)
      // -------------------------------------------------------------
      if (currentStep === 'goncang') {
        const beakerCenterX = 50;
        const beakerCenterY = 63;
        const distToBeaker = Math.hypot(targetHandX - beakerCenterX, targetHandY - beakerCenterY);

        if (isGrabbing) {
          if (!currentBeakerGrabbed && distToBeaker < 30) {
            setIsBeakerGrabbed(true);
            soundManager.playGrab();
          }

          if (currentBeakerGrabbed) {
            const shiftX = Math.max(-110, Math.min(110, (targetHandX - 50) * 2.4));
            const shiftY = Math.max(-20, Math.min(20, (targetHandY - 63) * 0.8));
            const tiltAngle = Math.max(-32, Math.min(32, deltaX * 620));

            setBeakerShakeOffset({ x: shiftX, y: shiftY, tilt: tiltAngle });

            const shakeSpeed = Math.abs(deltaX);

            if (shakeSpeed > 0.009) {
              const gain = Math.min(6, shakeSpeed * 240);
              setShakeProgress((prev) => {
                const next = Math.min(100, prev + gain);
                if (next >= 100) triggerExplosion();
                return next;
              });
            }

            if (deltaX < -0.012 && lastShakeDirectionRef.current !== 'left') {
              lastShakeDirectionRef.current = 'left';
              soundManager.playShake();
              setShakeProgress((prev) => {
                const next = Math.min(100, prev + 10);
                if (next >= 100) triggerExplosion();
                return next;
              });
            } else if (deltaX > 0.012 && lastShakeDirectionRef.current !== 'right') {
              lastShakeDirectionRef.current = 'right';
              soundManager.playShake();
              setShakeProgress((prev) => {
                const next = Math.min(100, prev + 10);
                if (next >= 100) triggerExplosion();
                return next;
              });
            }
          }
        } else if (isOpen) {
          if (currentBeakerGrabbed) {
            setIsBeakerGrabbed(false);
            soundManager.playDrop();
            setBeakerShakeOffset({ x: 0, y: 0, tilt: 0 });
          }
        }
      }

      // -------------------------------------------------------------
      // PHASE B: INGREDIENT BOTTLE GRABBING & ULTRA-SMOOTH MOVING
      // -------------------------------------------------------------
      if (currentStep === 'campur' || currentStep === 'magik') {
        if (isGrabbing) {
          if (!currentGrabbed && !currentPouring) {
            if (!verbPouredRef.current) {
              const distVerb = Math.hypot(
                targetHandX - itemPositionsRef.current.verb.x,
                targetHandY - itemPositionsRef.current.verb.y
              );
              if (distVerb < 20) {
                soundManager.playGrab();
                setGrabbedItem('verb');
              }
            }
            if (!affixPouredRef.current && !grabbedItemRef.current) {
              const distAffix = Math.hypot(
                targetHandX - itemPositionsRef.current.affix.x,
                targetHandY - itemPositionsRef.current.affix.y
              );
              if (distAffix < 20) {
                soundManager.playGrab();
                setGrabbedItem('affix');
              }
            }
            if (currentStep === 'magik' && !dropperPouredRef.current && !grabbedItemRef.current) {
              const distDropper = Math.hypot(
                targetHandX - itemPositionsRef.current.dropper.x,
                targetHandY - itemPositionsRef.current.dropper.y
              );
              if (distDropper < 22) {
                soundManager.playGrab();
                setGrabbedItem('dropper');
              }
            }
          } else if (currentGrabbed && !currentPouring) {
            const current = itemPositionsRef.current[currentGrabbed];
            const lerpFactor = 0.35;
            const nextX = current.x + (Math.max(10, Math.min(90, targetHandX)) - current.x) * lerpFactor;
            const nextY = current.y + (Math.max(15, Math.min(85, targetHandY)) - current.y) * lerpFactor;
            const tilt = Math.max(-18, Math.min(18, deltaX * 320));

            setItemPositions((prev) => ({
              ...prev,
              [currentGrabbed]: {
                x: nextX,
                y: nextY,
                isFalling: false,
                tilt,
              },
            }));
          }
        } else if (isOpen && currentGrabbed && !currentPouring) {
          const currentItem = currentGrabbed;
          const isOverBeaker = checkIsOverBeaker(targetHandX, targetHandY);
          setGrabbedItem(null);

          if (isOverBeaker) {
            executePour(currentItem);
          } else {
            soundManager.playDrop();
            handleBottleFall(currentItem);
          }
        }
      }

      if (isRunning) {
        physicsFrameIdRef.current = requestAnimationFrame(physicsLoop);
      }
    };

    physicsFrameIdRef.current = requestAnimationFrame(physicsLoop);

    return () => {
      isRunning = false;
      if (physicsFrameIdRef.current) {
        cancelAnimationFrame(physicsFrameIdRef.current);
      }
    };
  }, [checkIsOverBeaker, executePour, handleBottleFall, triggerExplosion]);

  // Reset Experiment
  const handleReset = (newWord?: KidsWord, newAffix?: string) => {
    soundManager.playClick();
    const targetWord = newWord || selectedWord;
    let targetAffix = newAffix || selectedPotion;

    // Pastikan gabungan yang dipilih sah mengikut tatabahasa Bahasa Melayu
    if (!isValidKidsCombination(targetWord.kata, targetAffix)) {
      const validAffixes = getValidAffixesForWord(targetWord.kata);
      targetAffix = validAffixes[0] || 'meN-';
    }

    setSelectedWord(targetWord);
    setSelectedPotion(targetAffix);
    setVerbPoured(false);
    setAffixPoured(false);
    setDropperPoured(false);
    setDisplayedLiquidLevel(0);
    setPouringData(null);
    setStep('campur');
    setShakeProgress(0);
    setIsReacting(false);
    setStarAwarded(false);
    setGrabbedItem(null);
    setIsBeakerGrabbed(false);
    setBeakerShakeOffset({ x: 0, y: 0, tilt: 0 });
    setItemPositions({
      verb: { x: 18, y: 64, isFalling: false, tilt: 0 },
      affix: { x: 82, y: 64, isFalling: false, tilt: 0 },
      dropper: { x: 84, y: 34, isFalling: false, tilt: 0 },
    });
  };

  // Interactive Mouse/Touch Handlers
  const handlePointerDownBottle = (item: 'verb' | 'affix' | 'dropper', e: React.PointerEvent) => {
    if (pouringData) return;
    soundManager.playGrab();
    pointerDragRef.current = {
      activeItem: item,
      startX: e.clientX,
      startY: e.clientY,
    };
    setGrabbedItem(item);
  };

  const handlePointerMoveContainer = (e: React.PointerEvent) => {
    const item = pointerDragRef.current.activeItem;
    if (!item || !containerRef.current || pouringData) return;

    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(15, Math.min(85, ((e.clientY - rect.top) / rect.height) * 100));

    setItemPositions((prev) => ({
      ...prev,
      [item]: {
        x: xPct,
        y: yPct,
        isFalling: false,
        tilt: 0,
      },
    }));
  };

  const handlePointerUpContainer = (e: React.PointerEvent) => {
    const item = pointerDragRef.current.activeItem;
    if (!item) return;
    pointerDragRef.current.activeItem = null;
    setGrabbedItem(null);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;

      if (checkIsOverBeaker(xPct, yPct)) {
        executePour(item);
        return;
      }
    }

    soundManager.playDrop();
    handleBottleFall(item);
  };

  // Quick button/tap shaker for mouse/touch users
  const handleManualShakeBeaker = () => {
    soundManager.playShake();
    const newOffset = beakerShakeOffset.x > 0 ? -25 : 25;
    setBeakerShakeOffset({ x: newOffset, y: -5, tilt: newOffset > 0 ? 15 : -15 });
    setTimeout(() => {
      setBeakerShakeOffset({ x: 0, y: 0, tilt: 0 });
    }, 150);

    setShakeProgress((prev) => {
      const next = Math.min(100, prev + 14);
      if (next >= 100) triggerExplosion();
      return next;
    });
  };

  // Dynamic Liquid color inside beaker
  const liquidColor = dropperPoured || pouringData?.item === 'dropper'
    ? '#EC4899'
    : (verbPoured && affixPoured) || (pouringData && (verbPoured || affixPoured))
    ? '#8B5CF6'
    : verbPoured || pouringData?.item === 'verb'
    ? '#0284C7'
    : '#059669';

  const beakerLiquidTopY = 167 - (displayedLiquidLevel / 100) * 105;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMoveContainer}
      onPointerUp={handlePointerUpContainer}
      onPointerCancel={handlePointerUpContainer}
      className="h-full max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden select-none relative bg-slate-950 text-white p-1 sm:p-2"
    >
      {/* 1. IMMERSIVE FULL-SCREEN WIDESCREEN CAMERA FEED & REAL-TIME SKELETON */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {cameraEnabled && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-300 filter contrast-105 brightness-105 ${
              cameraReady ? 'opacity-95' : 'opacity-0'
            }`}
          />
        )}

        {/* Real-time Hand Skeleton & Joint Landmark Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Subtle Ambient Science Lab Vignette */}
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/15 to-slate-950/65 pointer-events-none" />
      </div>

      {/* 2. TOP HUD: Status Bar + Live Face Viewfinder Badge */}
      <div className="relative z-20 flex items-center justify-between gap-1.5 px-2 py-1 bg-slate-900/85 backdrop-blur-md rounded-2xl border border-emerald-400/50 shadow-lg shrink-0">
        {/* Left: Live Face Viewfinder */}
        <div className="flex items-center gap-2">
          {cameraEnabled && cameraReady ? (
            <div className="relative flex items-center gap-1.5 bg-emerald-500/20 px-2 py-0.5 rounded-xl border border-emerald-400">
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-slate-800 shrink-0">
                <video
                  ref={mirrorVideoRef}
                  playsInline
                  muted
                  autoPlay
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-black font-game text-emerald-300 uppercase">
                    Muka Saintis
                  </span>
                </div>
                <span className="text-[8px] text-teal-200 font-bold block">
                  Kamera AR Aktif 🟢
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded-xl border border-slate-700">
              <span className="text-base">🔬</span>
              <span className="text-xs font-black font-game text-amber-300">
                Makmal Saintis AR
              </span>
            </div>
          )}

          {/* Current Step Prompt */}
          <div className="hidden sm:block leading-tight">
            <span className="font-game font-black text-amber-300 text-xs uppercase tracking-wide block">
              {!verbPoured && !affixPoured && '1️⃣ Genggam ✊ Botol Kurus Kata Dasar atau Imbuhan!'}
              {(verbPoured !== affixPoured) && '2️⃣ Masukkan bahan seterusnya ke kelalang!'}
              {verbPoured && affixPoured && !dropperPoured && '3️⃣ Genggam Penitis Magik Kurus! 💧'}
              {step === 'goncang' && '4️⃣ Genggam ✊ Kelalang & Goncang Bebas Kiri-Kanan! 🫨'}
              {step === 'selesai' && '🎉 Keajaiban Terhasil!'}
            </span>
          </div>
        </div>

        {/* Right Controls: Camera Switch, Guide, Reset */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Camera Permission Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setCameraEnabled((prev) => !prev);
            }}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              cameraEnabled && cameraReady
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-rose-500/20 border-rose-400 text-rose-300 hover:bg-rose-500/30 animate-pulse'
            }`}
            title="Buka / Tutup Kamera AR"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Guide Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setShowGuide((prev) => !prev);
            }}
            className="p-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-amber-300 hover:text-white hover:bg-slate-700 cursor-pointer"
            title="Panduan Makmal AR"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guide Popover */}
      {showGuide && (
        <div className="absolute top-14 right-2 sm:right-6 z-40 bg-slate-900/95 border-2 border-amber-400 rounded-2xl p-3.5 max-w-xs shadow-2xl text-xs space-y-2 animate-in fade-in zoom-in-95 backdrop-blur-md">
          <div className="flex items-center justify-between text-amber-300 font-bold font-game">
            <span>🔬 PANDUAN MAKMAL AR:</span>
            <button
              onClick={() => setShowGuide(false)}
              className="text-slate-400 hover:text-white px-1 font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
          <ul className="space-y-1.5 text-teal-100 text-[11px] leading-tight">
            <li>✊ <strong>Genggam Botol (Emas):</strong> Bawa tangan ke botol makmal kurus dan genggam untuk angkat. (Boleh juga klik & seret dengan tetikus/jari!)</li>
            <li>🖐️ <strong>Lepas Atas Kelalang (Hijau):</strong> Buka tangan atas kelalang untuk tuang cecair!</li>
            <li>🫨 <strong>Goncang Bebas:</strong> Genggam kelalang (✊) dan goncang ke kiri dan ke kanan secara bebas!</li>
            <li>⚙️ <strong>Tukar Kata:</strong> Klik butang ramuan di bahagian bawah untuk menukar kata dasar atau imbuhan.</li>
          </ul>
        </div>
      )}

      {/* 3. MAIN AR ARENA: LAB TABLE & MAGICAL BEAKER */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
        {/* Lab Table Surface at bottom */}
        <div className="absolute bottom-0 w-full h-14 sm:h-18 bg-gradient-to-t from-slate-950 via-slate-900/90 to-emerald-950/60 border-t-2 border-emerald-400/40 shadow-2xl flex items-center justify-between px-6 pointer-events-none">
          <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">
            🧪 Meja Makmal Saintis AR (Kawalan Tangan Bebas)
          </span>
          <span className="text-[9px] text-amber-300 font-bold tracking-widest uppercase">
            MediaPipe Hands Tracker
          </span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* NOTIS BAR GONCANGAN: ATAS SEKALI, TIDAK MENUTUP MUKA & BEKAS  */}
        {/* ------------------------------------------------------------- */}
        {step === 'goncang' && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md pointer-events-auto animate-in fade-in slide-in-from-top-4">
            <div className="bg-slate-900/95 border-2 border-amber-400/90 rounded-2xl p-2 sm:p-2.5 text-center shadow-[0_0_30px_rgba(245,158,11,0.4)] backdrop-blur-md space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl animate-bounce">🫨</span>
                <span className="text-xs sm:text-sm font-black font-game text-amber-300 uppercase tracking-wide">
                  {isBeakerGrabbed
                    ? '⚡ KELALANG DIGENGGAM! GONCANG KIRI & KANAN!'
                    : '✊ GENGGAM KELALANG DI MEJA UNTUK MULA GONCANG!'}
                </span>
                <span className="text-xl animate-bounce">🧪</span>
              </div>

              <p className="text-[10px] text-teal-100 font-semibold leading-tight">
                {isBeakerGrabbed
                  ? 'Goncang tangan ke kiri & kanan secara bebas selaju mungkin sehingga meletup! 💥'
                  : 'Bawa tangan ke kelalang di meja dan GENGGAM (✊), atau klik butang di bawah!'}
              </p>

              {/* High-Energy Progress Bar */}
              <div className="w-full bg-slate-950 h-4 sm:h-5 rounded-full overflow-hidden p-0.5 border border-amber-400/60 shadow-inner flex items-center">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-emerald-400 rounded-full transition-all duration-100 flex items-center justify-end pr-2 text-[9px] font-black text-slate-950 shadow-md"
                  style={{ width: `${Math.max(10, shakeProgress)}%` }}
                >
                  {Math.round(shakeProgress)}%
                </div>
              </div>

              {/* Fallback button for mouse/touch shaking */}
              <button
                type="button"
                onClick={handleManualShakeBeaker}
                className="mt-1 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black font-game text-xs uppercase shadow-md active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>⚡ TEKAN UNTUK GONCANG! 🫨</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ACTUAL POURING STREAM ANIMATION: GLOWING ARCHED LIQUID FLOW  */}
        {/* Uses viewBox="0 0 1000 1000" for valid SVG paths without %  */}
        {/* ------------------------------------------------------------- */}
        {pouringData && pouringData.streamActive && (
          <svg
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-35 overflow-visible"
          >
            <defs>
              <linearGradient id="pouringStreamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={pouringData.streamSecondaryColor} stopOpacity="0.95" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor={pouringData.streamColor} stopOpacity="1" />
              </linearGradient>
            </defs>

            {pouringData.item === 'verb' ? (
              <g>
                <path
                  d="M 440 500 Q 470 535 500 555"
                  fill="none"
                  stroke="url(#pouringStreamGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <path
                  d="M 440 500 Q 470 535 500 555"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </g>
            ) : (
              <g>
                <path
                  d="M 560 500 Q 530 535 500 555"
                  fill="none"
                  stroke="url(#pouringStreamGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <path
                  d="M 560 500 Q 530 535 500 555"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </g>
            )}

            <circle cx="500" cy="555" r="9" fill={pouringData.streamColor} opacity="0.8" className="animate-ping" />
            <circle cx="500" cy="555" r="5" fill="#FFFFFF" />
            <circle cx="485" cy="545" r="3.5" fill={pouringData.streamSecondaryColor} className="animate-bounce" />
            <circle cx="515" cy="545" r="3.5" fill="#FFFFFF" className="animate-bounce" />
          </svg>
        )}

        {/* Dropper Pipette Animated Drips */}
        {pouringData && pouringData.item === 'dropper' && (
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 z-35 pointer-events-none flex flex-col items-center">
            <span className="text-2xl text-purple-300 animate-bounce drop-shadow-[0_0_12px_#ec4899]">
              💧
            </span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* CENTER BEAKER (RESTS ON THE LAB BENCH, FACE 100% UNOBSTRUCTED) */}
        {/* ------------------------------------------------------------- */}
        <div
          onClick={() => {
            if (step === 'goncang') {
              handleManualShakeBeaker();
            }
          }}
          style={{
            transform: `translate(calc(-50% + ${beakerShakeOffset.x}px), calc(-50% + ${beakerShakeOffset.y}px)) rotate(${beakerShakeOffset.tilt}deg)`,
            transition: isBeakerGrabbed ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          className={`absolute left-1/2 top-[63%] flex flex-col items-center justify-center cursor-pointer z-20 ${
            isReacting ? 'scale-125 animate-bounce' : ''
          }`}
        >
          {/* Target Zone Glowing Aura when a bottle is grabbed */}
          {grabbedItem && (
            <div className="absolute -inset-8 rounded-full border-4 border-dashed border-amber-400 bg-amber-400/20 animate-ping pointer-events-none" />
          )}

          {/* Bubbles / Reactions above Beaker */}
          <div className="h-6 w-28 flex items-center justify-center pointer-events-none">
            {step === 'goncang' && isBeakerGrabbed && (
              <div className="flex gap-2 items-center">
                <span className="animate-spin text-2xl">✨</span>
                <span className="animate-bounce text-2xl">🫧</span>
                <span className="animate-ping text-2xl">💥</span>
              </div>
            )}
            {grabbedItem && (
              <span className="text-[10px] font-black font-game text-amber-300 uppercase bg-slate-900/90 px-3 py-0.5 rounded-full border-2 border-amber-400 shadow-lg animate-bounce">
                💧 BUKA TANGAN / LEPASKAN UNTUK TUANG!
              </span>
            )}
          </div>

          {/* SVG Beaker Flask */}
          <div className="w-32 h-38 sm:w-44 sm:h-50 relative flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 160 180" className="w-full h-full drop-shadow-2xl overflow-visible">
              <defs>
                <linearGradient id="beakerGlassClean" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#A7F3D0" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
                </linearGradient>

                <linearGradient id="beakerLiquid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={liquidColor} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={liquidColor} stopOpacity="1" />
                </linearGradient>

                <clipPath id="beakerInnerCavityClip">
                  <path d="M 65 22 L 95 22 L 95 50 L 138 145 C 143 156 133 167 120 167 L 40 167 C 27 167 17 156 22 145 L 65 50 Z" />
                </clipPath>
              </defs>

              {/* Beaker Glass Body */}
              <path
                d="M 65 20 L 95 20 L 95 50 L 140 145 C 145 158 135 170 120 170 L 40 170 C 25 170 15 158 20 145 L 65 50 Z"
                fill="url(#beakerGlassClean)"
                stroke="#6EE7B7"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Ticks */}
              <line x1="60" y1="90" x2="72" y2="90" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
              <line x1="55" y1="115" x2="70" y2="115" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
              <line x1="50" y1="140" x2="68" y2="140" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />

              {/* REAL SMOOTH RISING LIQUID INSIDE BEAKER */}
              {displayedLiquidLevel > 0 && (
                <g clipPath="url(#beakerInnerCavityClip)">
                  <rect
                    x="0"
                    y={beakerLiquidTopY}
                    width="160"
                    height={175 - beakerLiquidTopY}
                    fill="url(#beakerLiquid)"
                  />
                  <ellipse
                    cx="80"
                    cy={beakerLiquidTopY}
                    rx={Math.max(14, Math.min(50, 16 + (displayedLiquidLevel / 100) * 36))}
                    ry="4.5"
                    fill="#FFFFFF"
                    opacity="0.65"
                  />
                  <circle cx="70" cy={beakerLiquidTopY + 18} r="3.5" fill="#FFFFFF" opacity="0.8" className="animate-ping" />
                  <circle cx="95" cy={beakerLiquidTopY + 28} r="4" fill="#FFFFFF" opacity="0.7" className="animate-pulse" />
                  <circle cx="82" cy={beakerLiquidTopY + 10} r="2.5" fill="#FFFFFF" opacity="0.9" />
                </g>
              )}

              {/* Rim Lip */}
              <ellipse cx="80" cy="20" rx="18" ry="4" fill="#A7F3D0" opacity="0.8" stroke="#6EE7B7" strokeWidth="2" />
            </svg>

            {/* Label inside Beaker */}
            <div className="absolute bottom-5 flex flex-col items-center text-center pointer-events-none">
              {(verbPoured || (pouringData?.item === 'verb' && pouringData.streamActive)) && (
                <span className="text-xs sm:text-sm font-black font-game text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {selectedWord.kata}
                </span>
              )}
              {(affixPoured || (pouringData?.item === 'affix' && pouringData.streamActive)) && (
                <span className="text-xs sm:text-sm font-black font-game text-amber-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  + {selectedPotion}
                </span>
              )}
              {(dropperPoured || (pouringData?.item === 'dropper')) && (
                <span className="text-[9px] font-black text-pink-300 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  ✨ Cecair Magik
                </span>
              )}
              {displayedLiquidLevel === 0 && (
                <span className="text-[9px] text-teal-300 font-bold bg-slate-900/80 px-2 py-0.5 rounded-full border border-teal-400/40">
                  Bekas Bersedia
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ACTIVE POURING BOTTLE ANIMATION (Tilted & Draining at Beaker) */}
        {/* ------------------------------------------------------------- */}
        {pouringData && (
          <div
            style={{
              left: `${pouringData.bottleX}%`,
              top: `${pouringData.bottleY}%`,
              transform: 'translate3d(-50%, -50%, 0)',
            }}
            className="absolute z-40 pointer-events-none transition-all duration-300 animate-in zoom-in-95"
          >
            <SlimLabBottle
              type={pouringData.item}
              title={
                pouringData.item === 'verb'
                  ? selectedWord.kata
                  : pouringData.item === 'affix'
                  ? selectedPotion
                  : 'Magik'
              }
              category={
                pouringData.item === 'verb'
                  ? 'Kata Dasar'
                  : pouringData.item === 'affix'
                  ? 'Imbuhan'
                  : 'Penitis'
              }
              emoji={
                pouringData.item === 'verb'
                  ? selectedWord.emoji
                  : pouringData.item === 'affix'
                  ? '🧪'
                  : '💧'
              }
              liquidColor={pouringData.streamColor}
              liquidSecondaryColor={pouringData.streamSecondaryColor}
              isGrabbed={false}
              tilt={pouringData.bottleTilt}
              liquidPercent={pouringData.liquidDrainPercent}
              corkPopped={pouringData.corkPopped}
              isPouring={true}
            />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ITEM 1: BOTOL MAKMAL KURUS - KATA DASAR                       */}
        {/* ------------------------------------------------------------- */}
        {!verbPoured && pouringData?.item !== 'verb' && (
          <div
            onPointerDown={(e) => handlePointerDownBottle('verb', e)}
            onClick={() => {
              // Direct click-to-pour helper for touch/mouse
              if (!grabbedItem) executePour('verb');
            }}
            style={{
              left: `${itemPositions.verb.x}%`,
              top: `${itemPositions.verb.y}%`,
              transform: `translate3d(-50%, -50%, 0) scale(${grabbedItem === 'verb' ? 1.15 : 1})`,
              transition: grabbedItem === 'verb' ? 'none' : 'left 0.3s ease-out, top 0.3s ease-out',
            }}
            className={`absolute z-30 cursor-grab active:cursor-grabbing touch-none ${
              itemPositions.verb.isFalling ? 'animate-bottle-drop' : ''
            }`}
          >
            <SlimLabBottle
              type="verb"
              title={selectedWord.kata}
              category="Kata Dasar"
              emoji={selectedWord.emoji}
              liquidColor="#0284C7"
              liquidSecondaryColor="#38BDF8"
              isGrabbed={grabbedItem === 'verb'}
              tilt={itemPositions.verb.tilt}
              liquidPercent={100}
            />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ITEM 2: BOTOL MAKMAL KURUS - IMBUHAN                          */}
        {/* ------------------------------------------------------------- */}
        {!affixPoured && pouringData?.item !== 'affix' && (
          <div
            onPointerDown={(e) => handlePointerDownBottle('affix', e)}
            onClick={() => {
              if (!grabbedItem) executePour('affix');
            }}
            style={{
              left: `${itemPositions.affix.x}%`,
              top: `${itemPositions.affix.y}%`,
              transform: `translate3d(-50%, -50%, 0) scale(${grabbedItem === 'affix' ? 1.15 : 1})`,
              transition: grabbedItem === 'affix' ? 'none' : 'left 0.3s ease-out, top 0.3s ease-out',
            }}
            className={`absolute z-30 cursor-grab active:cursor-grabbing touch-none ${
              itemPositions.affix.isFalling ? 'animate-bottle-drop' : ''
            }`}
          >
            <SlimLabBottle
              type="affix"
              title={selectedPotion}
              category={activeAffixInfo.nama}
              emoji="🧪"
              liquidColor={activeAffixInfo.botolColor}
              liquidSecondaryColor={activeAffixInfo.botolSecondary}
              isGrabbed={grabbedItem === 'affix'}
              tilt={itemPositions.affix.tilt}
              liquidPercent={100}
            />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ITEM 3: BOTOL PENITIS MAKMAL KURUS - MAGIK                    */}
        {/* ------------------------------------------------------------- */}
        {step === 'magik' && !dropperPoured && pouringData?.item !== 'dropper' && (
          <div
            onPointerDown={(e) => handlePointerDownBottle('dropper', e)}
            onClick={() => {
              if (!grabbedItem) executePour('dropper');
            }}
            style={{
              left: `${itemPositions.dropper.x}%`,
              top: `${itemPositions.dropper.y}%`,
              transform: `translate3d(-50%, -50%, 0) scale(${grabbedItem === 'dropper' ? 1.18 : 1})`,
              transition: grabbedItem === 'dropper' ? 'none' : 'left 0.3s ease-out, top 0.3s ease-out',
            }}
            className={`absolute z-30 cursor-grab active:cursor-grabbing touch-none ${
              itemPositions.dropper.isFalling
                ? 'animate-bottle-drop'
                : grabbedItem === 'dropper'
                ? ''
                : 'animate-bounce'
            }`}
          >
            <SlimLabBottle
              type="dropper"
              title="Magik"
              category="Penitis"
              emoji="💧"
              liquidColor="#9333EA"
              liquidSecondaryColor="#EC4899"
              isGrabbed={grabbedItem === 'dropper'}
              tilt={itemPositions.dropper.tilt}
              liquidPercent={100}
            />
          </div>
        )}

        {/* STEP 5: EUREKA RESULT CARD */}
        {step === 'selesai' && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-3 animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 border-4 border-amber-400 rounded-3xl p-3 sm:p-5 max-w-md w-full text-center shadow-2xl space-y-2 relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 border border-amber-400 text-amber-300 text-xs font-black font-game">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>KEJAYAAN EKSPERIMEN SAINTIS! (+1 ⭐)</span>
              </div>

              {/* Result Formula & Name */}
              <div className="py-1">
                <div className="text-xs sm:text-sm font-bold text-teal-300">
                  {selectedWord.kata} + {selectedPotion} =
                </div>
                <div className="text-2xl sm:text-4xl font-black font-game uppercase tracking-wider text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.6)]">
                  {displayHasil}
                </div>
              </div>

              {/* Morphology Secret Explanation */}
              <div className="bg-slate-800 p-2.5 rounded-2xl border border-teal-400/40 text-left space-y-1 text-xs">
                <div className="font-bold text-amber-300 flex items-center gap-1">
                  <span>💡</span>
                  <span><strong>Rahsia Huruf:</strong> {displayRahsia}</span>
                </div>
                <div className="text-teal-200">
                  📖 <strong>Maksud:</strong> {displayMakna}
                </div>
                <div className="text-emerald-300 font-medium italic">
                  ✏️ "{displayAyat}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => handleReset()}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black font-game text-xs sm:text-sm uppercase tracking-wide shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Uji Semula</span>
                </button>

                <button
                  onClick={onBackToMenu}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black font-game text-xs sm:text-sm uppercase tracking-wide shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Menu Utama</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. SLEEK MINIMAL BOTTOM BAR: NAVIGATION DRAWER TRIGGER */}
      <div className="relative z-20 flex items-center justify-between px-2 py-1 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-emerald-400/40 shadow-lg shrink-0">
        <button
          onClick={onBackToMenu}
          className="font-bold text-teal-300 hover:text-white flex items-center gap-1 text-[11px] font-game cursor-pointer py-1 px-2 rounded-xl hover:bg-slate-800 transition-colors"
        >
          ← Peta Menu
        </button>

        {/* Central Ingredient Switcher Pill Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            setIsIngredientsDrawerOpen((prev) => !prev);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/70 text-emerald-300 font-game font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="text-base">{selectedWord.emoji}</span>
          <span className="text-white uppercase font-black">{selectedWord.kata}</span>
          <span className="text-emerald-400 font-mono font-black">+ {selectedPotion}</span>
          <span className="text-amber-300 font-game font-black">→ {displayHasil}</span>
          <span className="text-[10px] text-teal-200 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-teal-400/40 flex items-center gap-1 ml-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Tukar Ramuan ▾</span>
          </span>
        </button>

        <button
          onClick={() => handleReset()}
          className="text-amber-300 hover:text-amber-200 font-bold text-[11px] py-1 px-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Semula 🔄
        </button>
      </div>

      {/* 5. SLIDE-UP INGREDIENTS NAVIGATION DRAWER (Only opens when clicked!) */}
      {isIngredientsDrawerOpen && (() => {
        const draftCombination = getKidsCombination(draftWord.kata, draftPotion);
        const validAffixesForDraftWord = getValidAffixesForWord(draftWord.kata);

        return (
          <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-end p-2 sm:p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-3 sm:p-5 shadow-2xl max-w-xl mx-auto w-full space-y-3 animate-in slide-in-from-bottom-6">
              <div className="flex items-center justify-between border-b border-teal-500/30 pb-2">
                <div className="flex items-center gap-2 text-amber-300 font-game font-black text-xs sm:text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                  <span>PILIH RAMUAN EKSPERIMEN MORFOLOGI:</span>
                </div>
                <button
                  onClick={() => setIsIngredientsDrawerOpen(false)}
                  className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Notice Bar */}
              <div className="text-[10px] sm:text-[11px] text-teal-300/90 bg-teal-950/50 border border-teal-500/30 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                <span>🛡️</span>
                <span>
                  <strong>Hukum Tatabahasa DBP:</strong> Pilihan yang digelapkan / dihitamkan bermaksud tiada gabungan yang sah dalam Bahasa Melayu baku.
                </span>
              </div>

              {/* Word Selection Grid */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-300">
                    1. Pilih Kata Dasar:
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {KIDS_WORDS.length} kata tersedia
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-950/60 rounded-2xl border border-slate-800">
                  {KIDS_WORDS.map((w) => {
                    const isPicked = draftWord.id === w.id;
                    const isValidWithDraftAffix = isValidKidsCombination(w.kata, draftPotion);

                    return (
                      <button
                        key={w.id}
                        onClick={() => {
                          soundManager.playClick();
                          setDraftWord(w);
                          // Jika imbuhan semasa tak sah untuk perkataan baharu, tukar ke imbuhan pertama yang sah
                          if (!isValidKidsCombination(w.kata, draftPotion)) {
                            const validList = getValidAffixesForWord(w.kata);
                            if (validList.length > 0) {
                              setDraftPotion(validList[0]);
                            }
                          }
                        }}
                        className={`flex items-center gap-1.5 p-2 rounded-xl font-game font-black text-xs uppercase transition-all cursor-pointer ${
                          !isValidWithDraftAffix
                            ? 'bg-slate-950 text-zinc-600 border border-zinc-900/90 opacity-40 grayscale hover:opacity-80'
                            : isPicked
                            ? 'bg-amber-400 text-slate-950 border-2 border-white shadow-md scale-102'
                            : 'bg-slate-800/80 hover:bg-slate-700 text-white'
                        }`}
                        title={
                          !isValidWithDraftAffix
                            ? `Tiada gabungan sah dengan ${draftPotion}. Klik untuk pilih kata ini dan kemas kini imbuhan.`
                            : `${w.kata} boleh digabungkan dengan ${draftPotion}`
                        }
                      >
                        <span className="text-base sm:text-lg">{w.emoji}</span>
                        <span className="truncate">{w.kata}</span>
                        {isPicked && <Check className="w-3.5 h-3.5 ml-auto text-slate-950 shrink-0" />}
                        {!isValidWithDraftAffix && (
                          <span className="ml-auto text-[8px] font-mono text-zinc-500 bg-black/60 px-1 rounded">
                            ✕
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Affix Selection Grid */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-teal-300">
                    2. Pilih Formula Imbuhan (untuk kata dasar <span className="text-amber-300 font-mono uppercase">"{draftWord.kata}"</span>):
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono font-bold">
                    {validAffixesForDraftWord.length} sah
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-950/60 rounded-2xl border border-slate-800">
                  {KIDS_IMBUHAN.map((imb) => {
                    const isPicked = draftPotion === imb.id;
                    const isValidForDraftWord = isValidKidsCombination(draftWord.kata, imb.id);

                    if (!isValidForDraftWord) {
                      // GELAP / HITAMKAN jika tidak wujud gabungan!
                      return (
                        <div
                          key={imb.id}
                          className="p-2 rounded-xl font-mono text-xs uppercase text-center bg-black/90 text-zinc-600 border border-zinc-900 opacity-25 grayscale cursor-not-allowed select-none flex flex-col items-center justify-center"
                          title={`Tiada gabungan sah antara "${imb.id}" dengan "${draftWord.kata}"`}
                        >
                          <span className="font-black line-through">{imb.label}</span>
                          <span className="text-[8px] font-sans font-bold text-rose-500/80 mt-0.5">
                            ✕ TAK WUJUD
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={imb.id}
                        onClick={() => {
                          soundManager.playClick();
                          setDraftPotion(imb.id);
                        }}
                        className={`p-2 rounded-xl font-mono font-black text-xs uppercase text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                          isPicked
                            ? `${imb.warna} border-2 border-white shadow-lg scale-102 ring-2 ring-emerald-400/50`
                            : 'bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700'
                        }`}
                      >
                        <span className="text-sm">{imb.label}</span>
                        <span className={`text-[8px] font-sans font-bold mt-0.5 ${isPicked ? 'text-slate-950' : 'text-emerald-400'}`}>
                          {isPicked ? '✓ DIPILIH' : 'BOLEH'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Live Preview of the Formula */}
              <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-emerald-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 shadow-inner">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{draftWord.emoji}</span>
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
                      <span className="font-black text-white uppercase bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                        {draftWord.kata}
                      </span>
                      <span className="font-bold text-teal-400">+</span>
                      <span className="font-black text-amber-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                        {draftPotion}
                      </span>
                      <span className="font-bold text-teal-400">=</span>
                      <span className="font-game font-black text-amber-300 text-base sm:text-lg uppercase tracking-wide drop-shadow-md">
                        {draftCombination?.hasil || '---'}
                      </span>
                    </div>
                    <div className="text-[10px] text-teal-300 mt-0.5 font-medium flex items-center gap-1">
                      <span>💡</span>
                      <span>{draftCombination?.rahsiaHuruf || 'Sila pilih ramuan yang sah.'}</span>
                    </div>
                  </div>
                </div>

                {draftCombination && (
                  <div className="text-[10px] text-emerald-300 bg-slate-900 px-2 py-1 rounded-xl border border-teal-500/30 text-left sm:text-right shrink-0">
                    📖 {draftCombination.maknaRingkas}
                  </div>
                )}
              </div>

              {/* Confirmation Button */}
              <button
                disabled={!draftCombination}
                onClick={() => {
                  soundManager.playClick();
                  handleReset(draftWord, draftPotion);
                  setIsIngredientsDrawerOpen(false);
                }}
                className={`w-full py-2.5 rounded-2xl font-black font-game text-xs sm:text-sm uppercase tracking-wide cursor-pointer transition-transform active:scale-95 shadow-lg ${
                  draftCombination
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-emerald-500/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Simpan & Mula Eksperimen ({draftWord.kata} + {draftPotion} → {draftCombination?.hasil}) 🧪
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
