
window.debug = window.debug || {};

export function debug(name) {
  return (target) => {
    window.debug[name] = target;
  };
}
