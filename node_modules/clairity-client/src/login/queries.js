import Store from '../shared/store'

export function isLoggedIn() {
  return Store.data.get('user')
    .map(v => v.has('token'))
    .reduce((a, b) => !!a || !!b) || false
}

export function getCurrentUser() {
  return Store.data.get('user')
    .filter(v => v.has('token'))
    .first() || null
}

Store.Queries.isLoggedIn = isLoggedIn;
Store.Queries.getCurrentUser = getCurrentUser;
