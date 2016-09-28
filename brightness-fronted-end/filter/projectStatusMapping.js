import projectStatus from 'root/constant/project-status'

export default function () {
  'ngInject'

  return function (status) {
    switch (status) {
      case projectStatus.PREPARING:
        return '准备中'
      case projectStatus.IN_PROGRESS:
        return '执行中'
      case projectStatus.ARCHIVE:
        return '归档中'
    }
  }
}
