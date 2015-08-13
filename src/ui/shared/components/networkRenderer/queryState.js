import Store, {MessageTypes} from '../../../../core/store'
import _ from 'lodash'

export default class QueryState {

  constructor(props, options, cb) {
    this._props = props;
    this.options = options;
    this.tableName = options.tableName;
    if (!options.tableName) {
      throw new Error('Cannot construct a queryState object without a tableName option.');
    }
    this.cb = cb;
    this.update = this.update.bind(this);
    this.write = this.write.bind(this);
    this.table = Store.data.get(this.tableName);
    this._data = null;
  }

  get state() {
    return {[this.options.propName]: this.data};
  }

  get data() {
    if (this._data == null) {
      this._data = this.options.cacheMethod(this.props, this.options);
    }
    return this._data;
  }

  get ready() {
    return this.data != null;
  }

  get props() {
    return this._props;
  }

  set props(props) {
    let old = this._props;
    this._props = props;
    if (!_.eq(props, old)) {
      this.fetch();
    }
    this._data = null;
  }

  update() {
    let table = Store.data.get(this.tableName);
    if (table !== this.table) {
      this._data = null;
      this.table = table;
      this.cb();
    }
    return this;
  }

  fetch() {
    this.options.serviceMethod(this.props, this.options)
      .then(this.write);
    return this;
  }

  listen() {
    this.table = Store.data.get(this.tableName);
    Store.on(['update', this.tableName], this.update);
    return this;
  }

  stop() {
    Store.off(['update', this.tableName], this.update);
    return this;
  }

  write(results) {
    this.options.writeMethod(results, this.options);
    return this;
  }

}
