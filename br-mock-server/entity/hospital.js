const hospital1 = {
  "_id": "00001",
  "name": "德格县人民医院",
  "address": "四川省德格县",
  "hospital_location": {
    "longitude": 108.8725926,
    "latitude": 34.1927644
  },
  "contact_name": "王宏",
  "contact_tel": "13812345678",
  "has_ophthalmology_department": "有五官科，没有眼科",
  "equipments": ["AAAAA", "CCC"],
  "operation_room_count": 5,
  "doctor_count": 7,
  "nurse_count": 10,
  "photos": [
    {"_updated": "Tue, 19 Jul 2016 14:48:39 GMT", "_created": "Tue, 19 Jul 2016 14:48:39 GMT", "_id": "578e3dc7fdebb82894af91e1", "file": {"length": 49859, "content_type": "image/png", "file": "/media/578e3dc7fdebb82894af91df", "name": "000-CSR???????.png"}}
  ],
  "result": "可以满足医疗需求, 需自备超声波乳化机",
  "is_match_required": "满足"
}

const hospital2 = {
  "_id": "00002",
  "name": "德格县第二人民医院",
  "address": "四川省德格县",
  "hospital_location": {
    "longitude": 108.8725926,
    "latitude": 34.1927644
  },
  "contact_name": "李军",
  "contact_tel": "13812345678",
  "has_ophthalmology_department": "没有五官科，没有眼科",
  "equipments": [""],
  "operation_room_count": 1,
  "doctor_count": "",
  "nurse_count": 5,
  "photos": [],
  "result": "不满足医疗需求",
  "is_match_required": "不满足"
}

module.exports = {
  getHospitalList: () => [hospital1, hospital2]
}
