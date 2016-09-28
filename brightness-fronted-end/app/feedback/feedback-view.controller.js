import './feedback-view.scss'

import { isEmpty } from 'lodash'

function FeedbackViewController (FeedbackList) {
  'ngInject'

  let vm = this
  vm.currentPage = {
    well: 1,
    lessWell: 1,
    comment: 1
  }
  vm.pageSize = 5

  vm.feedbackList = isEmpty(FeedbackList._items) ? [] : FeedbackList._items

  vm.averageScore = vm.feedbackList.reduce((sum, curr) => sum + curr.score, 0) / vm.feedbackList.length

  let scoreOptions = [1, 2, 3, 4, 5]
  vm.chartData = {
    column: scoreOptions.map((item) => `${item}分`),
    value: scoreOptions.map((item) => vm.feedbackList.filter((feedback) => feedback.score === item).length)
  }

  vm.wellList = vm.feedbackList.slice(0, 5).map((item) => item.well)
  vm.lessWellList = vm.feedbackList.slice(0, 5).map((item) => item.less_well)
  vm.commentList = vm.feedbackList.slice(0, 5).map((item) => item.other_comment)

  vm.onChangeWellList = () => {
    vm.wellList = onChangeList(vm.currentPage.well).map((item) => item.well)
  }

  vm.onChangeLessWellList = () => {
    vm.lessWellList = onChangeList(vm.currentPage.lessWell).map((item) => item.less_well)
  }

  vm.onChangeCommentList = () => {
    vm.commentList = onChangeList(vm.currentPage.comment).map((item) => item.other_comment)
  }

  const onChangeList = (currentPage) => vm.feedbackList.slice((currentPage - 1) * vm.pageSize, currentPage * vm.pageSize)
}

FeedbackViewController.resolver = (FormData, CurrentProject) => {
  'ngInject'

  const currentProject = CurrentProject.getCurrentProject()
  return FormData.PROJECT_FEEDBACK.get({ project_status: currentProject.status, project_id: currentProject._id }).$promise
}

export default FeedbackViewController
