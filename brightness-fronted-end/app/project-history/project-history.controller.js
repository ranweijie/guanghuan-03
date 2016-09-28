import {includes} from 'lodash'

function ProjectHistoryController (ProjectList, ProjectStatus) {
  'ngInject'

  let vm = this

  vm.projectList = ProjectList._items ? ProjectList._items.filter((project) => {
    return includes([ProjectStatus.END], project.status)
  }) : []
}

ProjectHistoryController.resolver = function (FormData) {
  'ngInject'

  return FormData.BASIC_PROJECT.get().$promise
}

export default ProjectHistoryController
