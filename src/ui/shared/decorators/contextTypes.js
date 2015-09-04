export function contextTypes(cTypes) {
  return target => {
    target.contextTypes = cTypes;
  };
}
