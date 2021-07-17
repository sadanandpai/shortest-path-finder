"use strict";

exports.__esModule = true;
exports.useDebounce = exports.useDebounceCallback = void 0;

var React = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("react"));

var _latest = /*#__PURE__*/_interopRequireDefault( /*#__PURE__*/require("@react-hook/latest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useDebounceCallback = (callback, wait = 100, leading = false) => {
  const storedCallback = (0, _latest.default)(callback);
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

exports.useDebounceCallback = useDebounceCallback;

const useDebounce = (initialState, wait, leading) => {
  const state = React.useState(initialState);
  return [state[0], useDebounceCallback(state[1], wait, leading)];
};

exports.useDebounce = useDebounce;