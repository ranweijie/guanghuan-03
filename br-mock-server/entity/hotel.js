const hotel1 = {
  "_id": "00001",
  "name": "甘孜雍康酒店",
  "address": "四川省德格县",
  "hotel_location": {
    "longitude": 108.8725926,
    "latitude": 34.1927644
  },
  "contact_name": "王宏",
  "contact_tel": "13812345678",
  "room_capacity": 230,
  "parking_capacity": 550,
  "has_premier_room": "有",
  "premier_room_capacity": 5,
  "meals": ["早餐", "午餐" ],
  "air_condition_type": ["暖气" , "空调"],
  "network_condition": "无网络",
  "photos": [
    {"_updated": "Tue, 19 Jul 2016 14:48:39 GMT", "_created": "Tue, 19 Jul 2016 14:48:39 GMT", "_id": "578e3dc7fdebb82894af91e1", "file": {"length": 49859, "content_type": "image/png", "file": "/media/578e3dc7fdebb82894af91df", "name": "000-CSR???????.png"}}
  ],
  "result": "这个酒店条件还行，可以选择",
  "is_match_required": "满足"
}

const hotel2 = {
  "_id": "00002",
  "name": "德格宾馆",
  "address": "四川省德格县",
  "hotel_location": {
    "longitude": 108.8725926,
    "latitude": 34.1927644
  },
  "contact_name": "李军",
  "contact_tel": "13812345678",
  "room_capacity": 100,
  "parking_capacity": 300,
  "has_premier_room": "无",
  "premier_room_capacity": "",
  "meals": ["午餐", "晚餐"],
  "air_condition_type": [""],
  "network_condition": "",
  "photos": [],
  "result": "这个酒店条件凑合，可以选择",
  "is_match_required": "满足"
}

module.exports = {
  getHotelList: () => [hotel1, hotel2]
}
