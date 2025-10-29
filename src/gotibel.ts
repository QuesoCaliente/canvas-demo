export const GotibelRenderer = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Error al obtener el contexto 2D del canvas");
  canvas.width = 600;
  canvas.height = 600;

  const drawUpperBody = () => {
    const leftBase = { x: 180, y: 210 };
    const tip = { x: 170, y: 70 };
    const rightBase = { x: 410, y: 200 };

    const control1 = { x: leftBase.x + 55, y: leftBase.y - 35 };
    const control2 = { x: leftBase.x + 40, y: leftBase.y - 95 };
    const controlRight = { x: 300, y: 50 };

    ctx.beginPath();
    ctx.moveTo(leftBase.x, leftBase.y);

    ctx.bezierCurveTo(
      control1.x,
      control1.y,
      control2.x,
      control2.y,
      tip.x,
      tip.y
    );

    ctx.quadraticCurveTo(
      controlRight.x,
      controlRight.y,
      rightBase.x,
      rightBase.y
    );

    ctx.closePath();

    ctx.fillStyle = "#8dcdcf";
    ctx.fill();
    ctx.lineWidth = 3;
  };

  const drawBody = (x: number, y: number) => {
    ctx.beginPath();
    ctx.ellipse(x, y, 150, 150, Math.PI / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#8dcdcf";
    ctx.fill();
    drawUpperBody();
  };

  const drawEyes = () => {
    ctx.beginPath();
    ctx.ellipse(250, 260, 35, 25, 180, 0, Math.PI * 2);
    ctx.ellipse(340, 260, 35, 25, 90, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(257, 268, 20, 25, 100, 0, Math.PI * 2);
    ctx.ellipse(336, 268, 20, 25, 170, 0, Math.PI * 2);
    ctx.fillStyle = "#cbdbbb";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(260, 270, 12, 15, 100, 0, Math.PI * 2);
    ctx.ellipse(333, 273, 12, 15, 170, 0, Math.PI * 2);
    ctx.fillStyle = "#000000ff";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(263, 260, 8, 8, 100, 0, Math.PI * 2);
    ctx.ellipse(329, 263, 8, 8, 170, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffffff";
    ctx.fill();
    ctx.closePath();
  };

  const drawMouth = () => {
    ctx.beginPath();
    ctx.ellipse(295, 320, 40, 40, 0, 0, Math.PI);
    ctx.fillStyle = "#de6ea6";
    ctx.fill();
    ctx.closePath();
  };

  drawBody(canvas.width / 2, canvas.height / 2);
  drawEyes();
  drawMouth();
};

export const PixelPainter = (
  canvas: HTMLCanvasElement,
  options?: { color?: string; pixelSize?: number; preventDefault?: boolean }
) => {
  canvas.style.background = "#153f65";
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Error al obtener el contexto 2D del canvas");
  const color = options?.color ?? "#ff0000";
  const pixelSize = Math.max(1, Math.floor(options?.pixelSize ?? 20));
  const preventDefault = options?.preventDefault ?? true;
  canvas.width = canvas.width || 600;
  canvas.height = canvas.height || 600;

  const getCanvasCoords = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);
    return { x, y };
  };

  let painting = false;

  const paintAt = (clientX: number, clientY: number) => {
    const { x, y } = getCanvasCoords(clientX, clientY);
    ctx.fillStyle = color;
    const half = Math.floor(pixelSize / 2);
    ctx.fillRect(x - half, y - half, pixelSize, pixelSize);
  };

  const onPointerDown = (ev: PointerEvent) => {
    if (preventDefault) ev.preventDefault();
    painting = true;
    const targetDown = ev.target as Element | null;
    if (
      targetDown &&
      typeof (targetDown as any).setPointerCapture === "function"
    ) {
      (targetDown as any).setPointerCapture(ev.pointerId);
    }
    paintAt(ev.clientX, ev.clientY);
  };

  const onPointerMove = (ev: PointerEvent) => {
    if (!painting) return;
    if (preventDefault) ev.preventDefault();
    paintAt(ev.clientX, ev.clientY);
  };

  const onPointerUp = (ev: PointerEvent) => {
    if (preventDefault) ev.preventDefault();
    painting = false;
    const targetUp = ev.target as Element | null;
    if (
      targetUp &&
      typeof (targetUp as any).releasePointerCapture === "function"
    ) {
      (targetUp as any).releasePointerCapture(ev.pointerId);
    }
  };

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  globalThis.addEventListener("pointerup", onPointerUp);
  return {
    stop() {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      globalThis.removeEventListener("pointerup", onPointerUp);
    },
  };
};
