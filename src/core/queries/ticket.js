import Store from '../store'

export function queryTickets() {
  let result = Store.data.get('ticket')
    .toList()
  return result.size > 0 ? result : null;
}
