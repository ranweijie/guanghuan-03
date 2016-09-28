import './feedback-form.scss'

function FeedbackFormController ($element, ConfirmModal, FormData, CurrentProject) {
  'ngInject'

  let vm = this
  vm.feedback = {}
  vm.scoreOptions = [1, 2, 3, 4, 5]

  vm.submit = (form) => {
    form.$setSubmitted()

    if (form.$invalid) {
      const firstInvalid = $element[0].querySelector('form .ng-invalid')
      if (firstInvalid) {
        firstInvalid.focus()
      }
      return
    }

    submitFeedback(vm.feedback)
  }

  const submitFeedback = (feedbackData) => {
    const currentProject = CurrentProject.getCurrentProject()
    FormData.PROJECT_FEEDBACK.save({ project_status: currentProject.status, project_id: currentProject._id }, feedbackData).$promise
      .then(() => (ConfirmModal.open('提交成功')))
  }
}

export default FeedbackFormController
