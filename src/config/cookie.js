/**
 *
 */

export default {
  prefix: 'x-board-',
  path: '/',
  items: {
    account: 'a',
    token: 't',
    locale: 'l'
  },
  // 退出时无需清除的cookie key
  unless: ['locale'],
  getItem (key) {
    return key ? this.prefix + this.items[key] : ''
  }
}
