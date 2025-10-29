import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { CanvasRenderer } from "./functions.ts";
import { PixelPainter, GotibelRenderer } from "./gotibel.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div class="card">
      <canvas id="canvas"></canvas>
      <canvas id="canvas2"></canvas>
      <canvas id="canvas3"></canvas>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

CanvasRenderer(document.querySelector<HTMLCanvasElement>("#canvas")!);
PixelPainter(document.querySelector<HTMLCanvasElement>("#canvas2")!, {
  pixelSize: 6,
});
GotibelRenderer(document.querySelector<HTMLCanvasElement>("#canvas3")!);
