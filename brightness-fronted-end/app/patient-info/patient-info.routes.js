import Roles from 'root/constant/roles'
import PatientInfoController from './patient-info.controller'
import PatientInfoTemplate from 'raw!./patient-info.html'

export default ($stateProvider) => {
  'ngInject'

  $stateProvider
      .state('base.patientInfo', {
        url: 'patientInfo/:id',
        controller: PatientInfoController,
        controllerAs: 'vm',
        template: PatientInfoTemplate,
        data: {
          roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
          auth: true
        },
        resolve: {
          PatientInfo: PatientInfoController.getPatientInfo
        }
      })
}
