const trip1 = {
    "_id": "000001",
    "start_date": "2016-07-02",
    "end_date": "2016-07-23",
    "participant_names": "王一, 宋二",
    "remark": "考察组先后拜访德格县人民政府，人民医院，宗萨寺，并与当地领导洽谈。"
};

const trip2 = {
  "_id": "000002",
  "start_date": "2016-08-01",
  "end_date": "2016-08-09",
  "participant_names": "张三, 李四, 王五",
  "remark": "考察组干了挺多事, 但是懒得填。"
};

module.exports = {
  getTripList: () => [trip1, trip2]
}
