export async function fibonacci(n: number) {
  const res = new Array(n + 1);
  function fib(m: number) {
    switch(m) {
      case 0: {
        res[0] = 0;
        return 0;
      }
      case 1: {
        res[1] = 1;
        return 1;
      }
      default: {
        res[m] = fib(m - 1) + fib(m - 2);
        return res[m];
      }
    }
  }
  fib(n);
  return res;
}