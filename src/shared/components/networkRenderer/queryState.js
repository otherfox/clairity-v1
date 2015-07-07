import Store, {MessageTypes} from '../../store'

export default class QueryState {

  constructor(props, options, cb) {
    this._props = props;
    this.options = options;
    this.cb = cb;
    this.data = options.cacheMethod(props, options);
    this.update = this.update.bind(this);
  }

  get state() {
    return {[this.options.propName]: this.data};
  }

  get ready() {
    return this.data != null;
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

  listen() {
    Store.on('update', this.update);
  }

  stop() {
    Store.off('update', this.update);
  }

  write(results) {
    this.options.writeMethod(data, this.options);
    this.update();
    this.cb();
  }

}
