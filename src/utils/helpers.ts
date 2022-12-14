export const debounce = (
  fn: (...params: any[]) => any,
  n: number,
  immed: boolean = false
) => {
  let timer: number  | undefined = undefined;
  return function (this: any, ...args: any[]) {
    if (timer === undefined && immed) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);
    return timer;
  };
};
