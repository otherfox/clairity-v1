export function contextTypes(pTypes) {
  return target => {
    target.defaultProps = pTypes;
  };
}
