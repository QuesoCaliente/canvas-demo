export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);
}

export function CanvasRenderer(canvas: HTMLCanvasElement) {
  canvas.width = 520;
  canvas.height = 240;
  canvas.style.background = "#000";
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Fallo al obtener el contexto 2D del canvas");

  const cheese = document.createElement("img");
  cheese.src = "queso.webp";

  cheese.addEventListener("load", () => {
    ctx.drawImage(cheese, 80, 45); // Mismas dimensiones (32x32)

    ctx.imageSmoothingEnabled = false; // Respeta pixel art
    ctx.drawImage(cheese, 65, 110, 64, 64); // Ampliación x2      (64x64)
  });

  // Inicialización
  let y = 100,
    dy = 4;
  const x = 100,
    dx = 2,
    radius = 25;

  // Actualización de lógica
  const update = () => {
    y += dy;
    if (y + radius > canvas.height || y - radius < 0) dy *= -1;
  };

  // Renderizado y pintado
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "deeppink";
    ctx.fill();
    ctx.closePath();

    ctx.drawImage(cheese, canvas.width - cheese.width - 30, 45); // Mismas dimensiones (32x32)
    ctx.imageSmoothingEnabled = false; // Respeta pixel art
  };

  // Bucle del juego (update, draw, reinicio)
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
}
