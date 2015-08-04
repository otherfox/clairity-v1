try {
  !!window;
  console.log('outside worker');
} catch (e) {
  console.log('inside worker!');
}
