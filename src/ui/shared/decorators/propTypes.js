export function propTypes(pTypes) {
  return target => {
    target.propTypes = pTypes;
  };
}
