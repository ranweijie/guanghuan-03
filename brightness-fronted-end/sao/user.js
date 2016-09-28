export default function ($resource, $http) {
  'ngInject'

  return {
    resource: () => {
      return $resource('/api/user/:id', null, {
        resetPassword: {method: 'POST', url: '/api/user/password'},
        username: {method: 'GET', url: '/api/user/username/:username'},
        reset: {method: 'POST', url: '/api/user/reset'},
        export: {method: 'POST', url: 'api/user/export'}
      })
    },
    batchDelete: (userIds) => {
      return $http({
        method: 'DELETE', url: '/api/user', data: userIds,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'arraybuffer'
      })
    }
  }
}
