// Credit: https://www.joshwcomeau.com/snippets/javascript/range/
export function range(start: number, end?: number, step = 1) {
  let output = [];
  if (end === undefined) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
}

// Credit: https://www.joshwcomeau.com/snippets/javascript/random/
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
