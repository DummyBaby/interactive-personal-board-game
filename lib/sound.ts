export type SoundName =
  | "click"
  | "roll"
  | "correct"
  | "wrong"
  | "complete"
  | "finish";

let audioCtx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  return audioCtx;
}

function tone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType,
  gainValue: number,
  delay = 0,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0, ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + delay + 0.02);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration,
  );
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.02);
}

export async function playSound(name: SoundName, muted: boolean) {
  if (muted) return;
  const ctx = context();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      return;
    }
  }

  switch (name) {
    case "click":
      tone(ctx, 520, 0.06, "triangle", 0.04);
      break;
    case "roll":
      tone(ctx, 180, 0.12, "square", 0.035);
      tone(ctx, 240, 0.1, "square", 0.03, 0.08);
      tone(ctx, 300, 0.1, "square", 0.03, 0.16);
      break;
    case "correct":
      tone(ctx, 523, 0.12, "sine", 0.05);
      tone(ctx, 659, 0.16, "sine", 0.05, 0.08);
      break;
    case "wrong":
      tone(ctx, 180, 0.18, "sawtooth", 0.03);
      break;
    case "complete":
      tone(ctx, 392, 0.1, "sine", 0.05);
      tone(ctx, 523, 0.12, "sine", 0.05, 0.1);
      tone(ctx, 659, 0.18, "sine", 0.05, 0.2);
      break;
    case "finish":
      tone(ctx, 523, 0.12, "sine", 0.05);
      tone(ctx, 659, 0.12, "sine", 0.05, 0.12);
      tone(ctx, 784, 0.12, "sine", 0.05, 0.24);
      tone(ctx, 1046, 0.22, "sine", 0.05, 0.36);
      break;
    default:
      break;
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
