export default {
  query(info) {
    console.log('query request received', info);
    return Promise.resolve(info);
  },
  action(info) {
    console.log('action request received', info);
    return Promise.resolve(info);
  }
}
