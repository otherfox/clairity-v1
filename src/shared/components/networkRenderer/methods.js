
export function exposeMethods(methods) {
  return (target) => {
    for (let n in methods) {
      let method = methods[n];
      target.prototype[method] = function() {
        let ref = this.refs.inner;
        return ref[method].apply(ref, arguments);
      }
    }
  }
}
