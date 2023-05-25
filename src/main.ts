import { invoke } from "@tauri-apps/api/tauri";
import { drawFibo } from "./draw";
import { fibonacci } from "./fibonacci";

async function fibonacciRust(n: number) {
  return await invoke('fibonacci_rust', { n }) as number[];
}

window.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById('start') as HTMLButtonElement;
  startButton.onclick = async () => {
    const xp = document.getElementById('xp') as HTMLDivElement;
    startButton.classList.add('hide')
    xp.classList.remove('hide');
    const n = 40;
    drawFibo('rust', n, fibonacciRust)
    drawFibo('js', n, fibonacci)
  }
});
