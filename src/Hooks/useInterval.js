import { useEffect, useRef } from 'react';

/**
 * example:
 * function Counter() {
    let [count, setCount] = useState(0);
    let [delay, setDelay] = useState(1000);

    useInterval(() => {
      // Your custom logic here
      setCount(count + 1);
    }, delay);

    function handleDelayChange(e) {
      setDelay(Number(e.target.value));
    }

    return (
      <>
        <h1>{count}</h1>
        <input value={delay} onChange={handleDelayChange} />
      </>
    );
  }
 *
 * @export
 * @param {*} callback
 * @param {*} delay
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
