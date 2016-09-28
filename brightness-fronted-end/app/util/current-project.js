import {isString, isEqual, isArray, includes} from 'lodash'
const KEY = 'CURRENT_PROJECT'

export default class currentProjectService {
  constructor ($state, $http, SessionStorage) {
    'ngInject'
    this.$state = $state
    this.$http = $http
    this.SessionStorage = SessionStorage
  }

  setCurrentProject (project) {
    this.SessionStorage.set(KEY, project)
    this.currentProject = project
  }

  getCurrentProject () {
    if (!this.currentProject) {
      this.currentProject = this.SessionStorage.get(KEY)
    }
    return this.currentProject
  }

  getProjectId () {
    if (!this.currentProject) {
      this.currentProject = this.SessionStorage.get(KEY)
    }
    return this.currentProject._id
  }

  checkProjectStatus (status) {
    const currentProjectStatus = this.SessionStorage.get(KEY).status
    if (isString(status)) {
      return isEqual(status, currentProjectStatus)
    } else if (isArray(status)) {
      return includes(status, currentProjectStatus)
    }
  }

  clear () {
    this.SessionStorage.remove(KEY)
    this.currentProject = null
  }
}
