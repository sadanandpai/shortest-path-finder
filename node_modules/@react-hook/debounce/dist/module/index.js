import * as React from 'react';
import useLatest from '@react-hook/latest';
export const useDebounceCallback = (callback, wait = 100, leading = false) => {
  const storedCallback = useLatest(callback);
  const timeout = React.useRef();
  const deps = [wait, leading, storedCallback]; // Cleans up pending timeouts when the deps change

  function _ref() {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = void 0;
  }

  React.useEffect(() => _ref, deps);

  function _ref2() {
    timeout.current = void 0;
  }

  return React.useCallback(function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const {
      current
    } = timeout; // Calls on leading edge

    if (current === void 0 && leading) {
      timeout.current = setTimeout(_ref2, wait); // eslint-disable-next-line prefer-spread

      return storedCallback.current.apply(null, args);
    } // Clear the timeout every call and start waiting again


    current && clearTimeout(current); // Waits for `wait` before invoking the callback

    timeout.current = setTimeout(() => {
      timeout.current = void 0;
      storedCallback.current.apply(null, args);
    }, wait);
  }, deps);
};
export const useDebounce = (initialState, wait, leading) => {
  const state = React.useState(initialState);
  return [state[0], useDebounceCallback(state[1], wait, leading)];
};