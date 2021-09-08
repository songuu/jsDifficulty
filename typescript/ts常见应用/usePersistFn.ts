// * ahooks实现
function usePersistFn(fn) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const persistFn = useRef();
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return persistFn.crrent;
}
// * 其他实现
function usePersistFn(fn) {
  const fnRef = useRef();
  const persistFnRef = useRef();

  fnRef.current = fn;

  if (!persistFnRef.current) {
    persistFnRef.current = (...args) => fnRef.current(args);
  }

  return persistFnRef.current;
}

function usePersistFn(fn) {
  const fnRef = useRef();
  fnRef.current = fn;

  return useCallback(() => {
    return fnRef.current();
  }, [fnRef]);
}

// * 作用 ： 保证了返回的引用在usePersistFn被多次调用时都是相同的
