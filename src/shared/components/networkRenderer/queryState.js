import Store, {MessageTypes} from '../../store'

export default class QueryState {

  constructor(props, options, cb) {
    this._props = props;
    this.options = options;
    this.cb = cb;
    this.data = options.cacheMethod(props, options);
    this.update = this.update.bind(this);
    this.write = this.write.bind(this);
  }

  get state() {
    return {[this.options.propName]: this.data};
  }

  get ready() {
    return this.data != null;
  }

  set props(val) {
    this._props = val;
    this.data = this.options.cacheMethod(val, this.options);
  }

  get props() {
    return this._props;
  }

  update() {
    this.data = this.options.cacheMethod(this.props, this.options);
    return this;
  }

  fetch() {
    this.options.serviceMethod(this.props, this.options)
      .then(this.write);
    return this;
  }

  listen() {
    Store.on('update', this.update);
    return this;
  }

  stop() {
    Store.off('update', this.update);
    return this;
  }

  write(results) {
    this.options.writeMethod(results, this.options);
    this.update();
    this.cb();
    return this;
  }

}
