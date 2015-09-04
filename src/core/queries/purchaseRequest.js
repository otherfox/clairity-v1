import Store from '../store'

export function queryPurchaseRequest() {
  let result = Store.data.get('purchaseRequest')
    .toList()
  return result.size > 0 ? result : null;
}
