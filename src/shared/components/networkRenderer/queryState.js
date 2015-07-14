import Store, {MessageTypes} from '../../store'

export default class QueryState {

  constructor(props, options, cb) {
    this.props = props;
    this.options = options;
    this.cb = cb;
    this.update = this.update.bind(this);
    this.write = this.write.bind(this);
  }

  get state() {
    return {[this.options.propName]: this.data};
  }

  get data() {
    return this.options.cacheMethod(this.props, this.options)
  }

  get ready() {
    return this.data != null;
  }

  update() {
    this.cb();
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
    return this;
  }

}
