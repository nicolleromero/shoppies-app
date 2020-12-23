function isPromise(obj: any): obj is Promise<any> {
  return obj != null && typeof obj === 'object' && typeof obj['then'] === 'function';
}

export function memoize<P extends any[], R>(fn: (...args: P) => R) {
  const cache: Record<string, R> = Object.create(null);

  return (...args: P) => {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;

    if (isPromise(result)) {
      result.then(null, () => {
        console.warn('Ejecting from memoize cache:', key);
        delete cache[key];
      });
    }

    return result;
  };
}
