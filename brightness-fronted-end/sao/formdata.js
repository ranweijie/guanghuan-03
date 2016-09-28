export default function ($resource) {
  'ngInject'

  return {
    BASIC_PROJECT: $resource('/api/doc/basic_project'),

    PROJECT: $resource('/api/doc/:project_status/project/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    PROJECT_INFO: $resource('/api/doc/:project_status/project/info/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    PROJECT_PRE_CHECK: $resource('/api/doc/:project_status/project/precheck/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    PROJECT_LAUNCH_CEREMONY: $resource('/api/doc/:project_status/project/launch_ceremony/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    PROJECT_FINANCE: $resource('/api/doc/:project_status/project/finance/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    PROJECT_FINANCE_USAGE: $resource('/api/doc/:project_status/project/:project_id/finance_usage/:id', {}, {
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      }
    }),

    PROJECT_PARTICIPANT: $resource('/api/doc/:project_status/project/:project_id/project_participant/:id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      },
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      }
    }),

    PROJECT_SCHEDULE: $resource('/api/doc/:project_status/project/:project_id/project_schedule/:id', {}, {
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      }
    }),

    PROJECT_PROGRESS: $resource('/api/doc/:project_status/project/:project_id/project_progress/'),

    CURED_NUMBERS: $resource('/api/doc/:project_status/project/cured_numbers/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    PROJECT_PATIENT_INFO: $resource('/api/doc/:project_status/project/:project_id/project_patient_info/:id', {}, {
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      }
    }),

    INVESTIGATION: $resource('/api/doc/:project_status/project/investigation/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    HOSPITAL: $resource('/api/doc/:project_status/project/:project_id/investigation_hospital/:id', {}, {
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      },
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    HOTEL: $resource('/api/doc/:project_status/project/:project_id/investigation_hotel/:id', {}, {
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      },
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    TRIP: $resource('/api/doc/:project_status/project/:project_id/investigation_trip/:id', {}, {
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      }
    }),

    PROJECT_EXPERIENCE: $resource('api/doc/:project_status/project/experience/:project_id', {}, {
      patch: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PATCH'
        }
      }
    }),

    PROJECT_FEEDBACK: $resource('api/doc/:project_status/project/:project_id/project_feedback/:id', {}, {
      put: {
        method: 'POST',
        headers: {
          'X-HTTP-Method-Override': 'PUT'
        }
      }
    })
  }
}
