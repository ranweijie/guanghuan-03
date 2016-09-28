export default ($window, $http, Upload) => {
  'ngInject'
  return {
    upload: function (file, params) {
      return Upload.upload({
        url: '/api/doc/files/attachment',
        data: Object.assign({}, {file: file}, params || {})
      })
    },

    download: function (file) {
      const fileType = file.content_type
      $http.get('/api/doc/files' + file.file,
        {
          headers: {
            'Content-Type': fileType,
            'Content-Disposition': 'attachment',
            'filename': '"' + file.name + '"'
          },
          responseType: 'arraybuffer'
        })
        .success(function (data) {
          const file = new Blob([data], {type: fileType})
          const fileURL = URL.createObjectURL(file)
          $window.open(fileURL)
        })
    },

    delete: function (id) {
      return $http.delete('/api/doc/files/attachment/' + id)
    },

    get: function (file) {
      const fileType = file.content_type
      return $http.get('/api/doc/files' + file.file,
        {
          headers: {
            'Content-Type': fileType,
            'Content-Disposition': 'attachment',
            'filename': '"' + file.name + '"'
          },
          responseType: 'arraybuffer'
        })
    }
  }
}
