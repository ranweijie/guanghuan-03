import Roles from './roles'
import ProjectStatus from './project-status'

export default [
  {
    name: '首页',
    state: 'base.home',
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_FINANCIER, Roles.ROLE_VOLUNTEER]
  },
  {
    name: '信息查看',
    projectStatus: [ProjectStatus.IN_PROGRESS],
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
    subMenu: [
      {
        name: '进度跟踪',
        state: 'base.progressTracking',
        activeState: 'progressTracking',
        activeIcon: require('../images/progress-udpate-active.png'),
        icon: require('../images/progress-update.png')
      },
      {
        name: '日程安排',
        state: 'base.reviewSchedule.list',
        activeState: 'reviewSchedule',
        activeIcon: require('../images/schedule-active.png'),
        icon: require('../images/schedule.png')
      }, {
        name: '启动仪式',
        state: 'base.launchCeremonyView',
        activeState: 'launchCeremonyView',
        activeIcon: require('../images/launch-ceremony-active.png'),
        icon: require('../images/launch-ceremony.png')
      }
    ]
  }, {
    name: '信息采集',
    projectStatus: [ProjectStatus.IN_PROGRESS],
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
    subMenu: [
      {
        name: '患者就诊',
        state: 'base.patientInfo',
        activeIcon: require('../images/patient-info-active.png'),
        icon: require('../images/patient-info.png')
      }
    ]
  }, {
    name: '信息更新',
    projectStatus: [ProjectStatus.IN_PROGRESS],
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD],
    subMenu: [
      {
        name: '更新进度',
        state: 'base.progressUpdate',
        activeState: 'progressUpdate',
        activeIcon: require('../images/progress-udpate-active.png'),
        icon: require('../images/progress-update.png')
      },
      {
        name: '更新日程',
        state: 'base.updateSchedule.list',
        activeState: 'updateSchedule',
        activeIcon: require('../images/schedule-active.png'),
        icon: require('../images/schedule.png')
      }, {
        name: '更新仪式',
        state: 'base.launchCeremonyForm',
        activeState: 'launchCeremonyForm',
        activeIcon: require('../images/launch-ceremony-active.png'),
        icon: require('../images/launch-ceremony.png')
      }
    ]
  },
  {
    name: '项目归档',
    projectStatus: [ProjectStatus.ARCHIVE],
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER],
    subMenu: [
      {
        name: '项目经验',
        state: 'base.projectExperience',
        activeState: 'projectExperience',
        activeIcon: require('../images/experience-active.png'),
        icon: require('../images/experience.png'),
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD]
      },
      {
        name: '填写反馈',
        state: 'base.feedback.form',
        activeState: 'feedback.form',
        activeIcon: require('../images/feedback-active.png'),
        icon: require('../images/feedback.png'),
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_VOLUNTEER]
      },
      {
        name: '查看反馈',
        state: 'base.feedback.view',
        activeState: 'feedback.view',
        activeIcon: require('../images/feedback-active.png'),
        icon: require('../images/feedback.png'),
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD]
      },
      {
        name: '治愈情况',
        state: 'base.curedStatus.view',
        activeState: 'curedStatus',
        activeIcon: require('../images/schedule-update-active.png'),
        icon: require('../images/schedule-update.png'),
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD]
      },
      {
        name: 'SROI',
        state: 'base.sroi',
        activeState: 'sroi',
        activeIcon: require('../images/sroi-active.png'),
        icon: require('../images/sroi.png'),
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD]
      }
    ]
  }, {
    name: '项目总结',
    projectStatus: [ProjectStatus.ARCHIVE],
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
    subMenu: [
      {
        name: '项目总览',
        state: 'base.projectSummary',
        activeState: 'projectSummary',
        activeIcon: require('../images/progress-tracking-active.png'),
        icon: require('../images/progress-tracking.png')
      }
    ]
  }, {
    name: '项目信息',
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
    projectStatus: [ProjectStatus.PREPARING, ProjectStatus.IN_PROGRESS, ProjectStatus.ARCHIVE],
    subMenu: [
      {
        name: '基本信息',
        state: 'base.projectInfo.view',
        activeState: 'projectInfo',
        activeIcon: require('../images/project-info-active.png'),
        icon: require('../images/project-info.png')
      }, {
        name: '参与人员',
        state: 'base.participants.list',
        activeState: 'participants',
        activeIcon: require('../images/participants-active.png'),
        icon: require('../images/participants.png')
      }, {
        name: '术前筛查',
        state: 'base.operationSurvey.view',
        activeState: 'operationSurvey',
        activeIcon: require('../images/operation-survey-active.png'),
        icon: require('../images/operation-survey.png')
      }, {
        name: '启动仪式',
        state: 'base.launchCeremonyView',
        activeState: 'launchCeremonyView',
        projectStatus: [ProjectStatus.PREPARING, ProjectStatus.ARCHIVE],
        activeIcon: require('../images/launch-ceremony-active.png'),
        icon: require('../images/launch-ceremony.png')
      }, {
        name: '项目日程',
        state: 'base.updateSchedule.list',
        projectStatus: [ProjectStatus.PREPARING],
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD],
        activeState: 'updateSchedule',
        activeIcon: require('../images/schedule-active.png'),
        icon: require('../images/schedule.png')
      }
    ]
  }, {
    name: '实地考察',
    projectStatus: [ProjectStatus.PREPARING],
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD],
    subMenu: [
      {
        name: '基本情况',
        state: 'base.investigation.view',
        activeState: 'investigation',
        activeIcon: require('../images/project-info-active.png'),
        icon: require('../images/project-info.png')
      }, {
        name: '当地医院',
        state: 'base.hospital.list',
        activeState: 'hospital',
        activeIcon: require('../images/hospital-active.png'),
        icon: require('../images/hospital.png')
      }, {
        name: '当地酒店',
        state: 'base.hotel.list',
        activeState: 'hotel',
        activeIcon: require('../images/hotel-active.png'),
        icon: require('../images/hotel.png')
      },
      {
        name: '考察记录',
        state: 'base.trip.list',
        activeState: 'trip',
        activeIcon: require('../images/investigate-record-active.png'),
        icon: require('../images/investigate-record.png')
      },
      {
        name: '导出报告',
        state: 'base.reportExport.view',
        activeState: 'reportExport',
        activeIcon: require('../images/report-export-active.png'),
        icon: require('../images/report-export.png')
      }
    ]
  }, {
    name: '财务信息',
    icon: require('../images/schedule-update.png'),
    projectStatus: [ProjectStatus.PREPARING, ProjectStatus.IN_PROGRESS, ProjectStatus.ARCHIVE],
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_FINANCIER],
    subMenu: [
      {
        name: '经费情况',
        state: 'base.finance',
        activeState: 'finance',
        activeIcon: require('../images/finance-active.png'),
        icon: require('../images/finance.png')
      }
    ]
  }, {
    name: '账户管理',
    roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_FINANCIER, Roles.ROLE_VOLUNTEER],
    subMenu: [
      {
        name: '修改密码',
        state: 'base.resetPassword',
        roles: [Roles.ROLE_CSR, Roles.ROLE_CSR_LEAD, Roles.ROLE_LEAD, Roles.ROLE_FINANCIER, Roles.ROLE_VOLUNTEER],
        activeIcon: require('../images/reset-password-active.png'),
        icon: require('../images/reset-password.png')
      }
    ]
  },
  // none project selected menu defined as follow
  {
    name: '项目列表',
    state: 'static.projectList',
    noneProjectSelected: true
  }, {
    name: '关于光明行',
    noneProjectSelected: true,
    subMenu: [
      {
        name: '历年记录',
        state: 'base.projectHistory',
        projectNotSelected: true,
        activeIcon: require('../images/project-history-active.png'),
        icon: require('../images/project-history.png')
      },
      {
        name: '数据查看',
        state: 'base.viewData',
        projectNotSelected: true,
        activeIcon: require('../images/view-data-active.png'),
        icon: require('../images/view-data.png')
      }
    ]
  }, {
    name: '账户管理',
    adminOnly: true,
    noneProjectSelected: true,
    subMenu: [
      {
        name: '修改密码',
        state: 'base.resetPassword',
        adminOnly: true,
        noneProjectSelected: true,
        activeIcon: require('../images/reset-password-active.png'),
        icon: require('../images/reset-password.png')
      }, {
        name: '用户管理',
        state: 'base.userManagement',
        adminOnly: true,
        noneProjectSelected: true,
        activeIcon: require('../images/user-management-active.png'),
        icon: require('../images/user-management.png'),
        roles: [Roles.ROLE_ADMIN]
      }
    ]
  }
]
