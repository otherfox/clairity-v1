
export function exposeMethods(methods) {
  return (target) => {
    let ref = this.refs.inner;
    for (let method in methods) {
      target.prototype[method] = function() {
        return ref[method].apply(ref, arguments);
      }
    }
  }
}
