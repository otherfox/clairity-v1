
export function exposeMethods(methods) {
  return (target) => {
    for (let method in methods) {
      target.prototype[method] = function() {
        let ref = this.refs.inner;
        return ref[method].apply(ref, arguments);
      }
    }
  }
}
