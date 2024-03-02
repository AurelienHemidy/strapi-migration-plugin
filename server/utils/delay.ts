export const delay = (ms: number) =>
  new Promise(res => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      return res(null);
    }, ms);
  });
