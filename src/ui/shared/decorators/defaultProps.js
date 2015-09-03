export function defaultProps(pTypes) {
  return target => {
    target.defaultProps = pTypes;
  };
}
