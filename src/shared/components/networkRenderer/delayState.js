
export default class DelayState {

  constructor(props, options, cb) {
    this._props = props;
    this.options = options;
    this.ready = false;
    this.cb = cb;
    this.data = options.cacheMethod(props, options);
  }

  get state() {
    return {[this.options.propName]: this.data}
  }

  get ready() {
    return this.ready || this.options.optional;
  }

  set props(val) {
    this._props = props;
    this.data = options.cacheMethod(val, this.options);
  }

  update() {
    this.data = options.cacheMethod(this.props, this.options);
  }

  fetch() {
    this.options.serviceMethod(this.props, this.options)
      .then(this.write);
  }

  write(results) {
    this.options.writeMethod(data, this.options);
    this.update();
    this.cb();
  }

}
