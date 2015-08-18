
import Store from '../store'

export function querySalesMetrics(month) {
  let result = Store.data.get('salesMetric')
    .toList()
    .filter(u => u.get('month') === month);
  return result.size > 0 ? result.toJS() : null;
}
