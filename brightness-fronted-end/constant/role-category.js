const BaseCategory = [
  {id: 1001, name: '项目组'},
  {id: 1002, name: '策划组'},
  {id: 1003, name: '后勤保障组'},
  {id: 1004, name: '传播组'},
  {id: 1005, name: '志愿者组'}
]

const ScheduleCategory = [
  {id: 1000, name: '全部人员'}
]

export default class RoleCategory {

  static get baseCategory () {
    return BaseCategory
  }

  static get scheduleCategory () {
    return ScheduleCategory.concat(BaseCategory)
  }
}
