const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const WIDTH = 1024;
const HEIGHT = 1024;

// Colors
const BG_COLOR = { r: 11, g: 11, b: 15, a: 255 }; // #0B0B0F
const ACCENT_COLOR = { r: 255, g: 90, b: 54, a: 255 }; // #FF5A36
const ACCENT_WARM = { r: 255, g: 138, b: 61, a: 255 }; // #FF8A3D
const ACCENT_CORE = { r: 255, g: 240, b: 230, a: 255 }; // Bright warm center

function isInsideLightbulb(x, y) {
  const dx = x - 512;
  const dy = y - 480;

  // 1. Bulb sphere
  const sphereR = 195;
  const inSphere = dx * dx + dy * dy <= sphereR * sphereR;

  // 2. Bulb neck (tapering downwards from y = 480 to y = 640)
  const neckTopY = 480;
  const neckBottomY = 640;
  const inNeckRange = y >= neckTopY && y <= neckBottomY;
  const neckProgress = (y - neckTopY) / (neckBottomY - neckTopY);
  const neckHalfWidth = 195 * (1 - neckProgress) + 105 * neckProgress;
  const inNeck = inNeckRange && Math.abs(dx) <= neckHalfWidth;

  // 3. Base screw threads (3 horizontal rounded segments)
  let inBase = false;
  if (y > 640 && y < 735) {
    const threadIndex = Math.floor((y - 640) / 32);
    const threadY = 640 + threadIndex * 32 + 16;
    const threadDistY = Math.abs(y - threadY);
    const baseWidth = 95 - threadIndex * 8;
    if (Math.abs(dx) <= baseWidth && threadDistY <= 13) {
      inBase = true;
    }
  }

  // 4. Bottom contact point
  const inBottomCap = y >= 735 && y <= 760 && Math.abs(dx) <= 50 && (dx * dx + (y - 740) * (y - 740) <= 50 * 50);

  return inSphere || inNeck || inBase || inBottomCap;
}

function getSparkCore(x, y) {
  // Center 4-point spark at (512, 470)
  const dx = Math.abs(x - 512);
  const dy = Math.abs(y - 470);
  const sparkRadius = 140;

  const sparkVal = Math.sqrt(dx / sparkRadius) + Math.sqrt(dy / sparkRadius);
  return sparkVal <= 1.0;
}

function createIconPNG(isForegroundOnly = false) {
  const png = new PNG({ width: WIDTH, height: HEIGHT });

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const idx = (WIDTH * y + x) << 2;

      const insideBulb = isInsideLightbulb(x, y);
      const insideSpark = getSparkCore(x, y);

      if (insideBulb) {
        // Vertical gradient inside bulb
        const gradT = Math.max(0, Math.min(1, (y - 280) / 480));
        let r = Math.round(ACCENT_COLOR.r * (1 - gradT * 0.2) + ACCENT_WARM.r * (gradT * 0.2));
        let g = Math.round(ACCENT_COLOR.g * (1 - gradT) + ACCENT_WARM.g * gradT);
        let b = Math.round(ACCENT_COLOR.b * (1 - gradT) + ACCENT_WARM.b * gradT);

        // Core highlight
        if (insideSpark) {
          const coreDist = Math.hypot(x - 512, y - 470) / 100;
          const blend = Math.max(0, 1 - coreDist);
          r = Math.round(r * (1 - blend) + ACCENT_CORE.r * blend);
          g = Math.round(g * (1 - blend) + ACCENT_CORE.g * blend);
          b = Math.round(b * (1 - blend) + ACCENT_CORE.b * blend);
        }

        png.data[idx] = r;
        png.data[idx + 1] = g;
        png.data[idx + 2] = b;
        png.data[idx + 3] = 255;
      } else {
        // Soft ambient glow outside bulb
        const distFromCenter = Math.hypot(x - 512, y - 500);
        if (!isForegroundOnly && distFromCenter < 380) {
          const glow = Math.pow(1 - distFromCenter / 380, 2) * 0.18;
          png.data[idx] = Math.round(BG_COLOR.r * (1 - glow) + ACCENT_COLOR.r * glow);
          png.data[idx + 1] = Math.round(BG_COLOR.g * (1 - glow) + ACCENT_COLOR.g * glow);
          png.data[idx + 2] = Math.round(BG_COLOR.b * (1 - glow) + ACCENT_COLOR.b * glow);
          png.data[idx + 3] = 255;
        } else if (isForegroundOnly) {
          png.data[idx] = 0;
          png.data[idx + 1] = 0;
          png.data[idx + 2] = 0;
          png.data[idx + 3] = 0;
        } else {
          png.data[idx] = BG_COLOR.r;
          png.data[idx + 1] = BG_COLOR.g;
          png.data[idx + 2] = BG_COLOR.b;
          png.data[idx + 3] = 255;
        }
      }
    }
  }

  return png;
}

const assetsDir = path.join(__dirname, '..', 'assets', 'images');

// 1. Generate full icon (1024x1024 on #0B0B0F)
const iconPng = createIconPNG(false);
const iconPath = path.join(assetsDir, 'icon.png');
fs.writeFileSync(iconPath, PNG.sync.write(iconPng));
console.log('Generated:', iconPath);

// 2. Generate splash icon (1024x1024 on #0B0B0F)
const splashPath = path.join(assetsDir, 'splash-icon.png');
fs.writeFileSync(splashPath, PNG.sync.write(iconPng));
console.log('Generated:', splashPath);

// 3. Generate adaptive icon foreground (transparent background)
const fgPng = createIconPNG(true);
const fgPath = path.join(assetsDir, 'android-icon-foreground.png');
fs.writeFileSync(fgPath, PNG.sync.write(fgPng));
console.log('Generated:', fgPath);

// 4. Generate adaptive icon background (#0B0B0F)
const bgPng = new PNG({ width: WIDTH, height: HEIGHT });
for (let i = 0; i < WIDTH * HEIGHT; i++) {
  const idx = i << 2;
  bgPng.data[idx] = BG_COLOR.r;
  bgPng.data[idx + 1] = BG_COLOR.g;
  bgPng.data[idx + 2] = BG_COLOR.b;
  bgPng.data[idx + 3] = 255;
}
const bgPath = path.join(assetsDir, 'android-icon-background.png');
fs.writeFileSync(bgPath, PNG.sync.write(bgPng));
console.log('Generated:', bgPath);
