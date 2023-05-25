type Coord = {
  x: number;
  y: number;
}

function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, col: string) {
  ctx.beginPath();
  ctx.arc(x, y, radius, Math.PI / 4, 3 * Math.PI / 4);
  ctx.strokeStyle = col;
  ctx.stroke();
  ctx.closePath();
}

function draw(ctx: CanvasRenderingContext2D, end: Coord, fibonacci: number[], scale: number) {
  ctx.save();
  const col = '#fff';
  ctx.translate(end.x, end.y);
  for (let i = 0; i < fibonacci.length; i++) {
      drawCircle(ctx, (fibonacci[i] * 1.4142 * scale) / 2, -(fibonacci[i] * 1.4142 * scale) / 2, fibonacci[i] * scale, col)
      end.x = fibonacci[i];
      end.y = 0;
      ctx.translate(end.x * 1.4142 * scale, end.y);
      ctx.rotate(Math.PI/180 * -90);
  }
  ctx.restore();
}

export async function drawFibo(type: 'rust' | 'js', n: number, fibo: (m: number) => Promise<number[]>) {
  const canvas = document.getElementById(`canvas-${type}`) as HTMLCanvasElement;
  const loading = document.getElementById(`loading-${type}`) as HTMLDivElement;
  const size = { x: canvas.width, y: canvas.height };
  const center = { x: size.x / 2, y: size.y / 2 };
  const end = { x: center.x, y: center.y };
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const fiboResult = await fibo(n);
    loading.classList.add('hide')
    canvas.classList.remove('hide');
    draw(ctx, end, fiboResult, 0.025);
  }
}
