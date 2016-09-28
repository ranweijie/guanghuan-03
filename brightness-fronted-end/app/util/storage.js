import angular from 'angular'

const KEY = 'HNA-GUANGMINGXING-STORE'

class Storage {
  constructor (storage) {
    this.storage = storage
  }

  set (key, value) {
    var data = this._getJson()
    data[key] = value
    this._setJson(data)
    return this
  }

  get (key) {
    var data = this._getJson()
    if (data[key]) {
      return data[key]
    }
  }

  remove (key) {
    var data = this._getJson()
    if (data.hasOwnProperty(key)) {
      delete data[key]
      this._setJson(data)
    }
    return this
  }

  _getJson () {
    return angular.fromJson(this.storage.getItem(KEY)) || {}
  }

  _setJson (object) {
    this.storage.setItem(KEY, angular.toJson(object))
    return this
  }
}

export class LocalStorage extends Storage {
  constructor ($window) {
    'ngInject'
    super($window.localStorage)
  }
}

export class SessionStorage extends Storage {
  constructor ($window) {
    'ngInject'
    super($window.sessionStorage)
  }
}
