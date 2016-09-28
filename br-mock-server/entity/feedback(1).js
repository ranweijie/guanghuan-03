const feedback1 = {
  "_id":"232312341234",
  "score": 5,
  "well": "做的不错",
  "less_well": "没好吃的",
  "other_comment": "如果好吃的多点就好了"
}

const feedback2 = {
  "_id":"232312341235",
  "score": 4,
  "well": "很好",
  "less_well": "不太好",
  "other_comment": "不知道"
}

const feedback3 = {
  "_id":"232312341236",
  "score": 5,
  "well": "非常好",
  "less_well": "一般吧",
  "other_comment": "没有"
}

const feedback4 = {
  "_id":"232312341237",
  "score": 4,
  "well": "还可以",
  "less_well": "组织混乱",
  "other_comment": "不知道说什么"
}

const feedback5 = {
  "_id":"232312341238",
  "score": 5,
  "well": "棒",
  "less_well": "水果太少",
  "other_comment": "随便写写"
}

const feedback6 = {
  "_id":"232312341239",
  "score": 5,
  "well": "好呀好呀好呀好呀好",
  "less_well": "住宿一般",
  "other_comment": "写累了"
}

module.exports = {
  getFeedbackList: () => [feedback1, feedback2, feedback3, feedback4, feedback5, feedback6]
}
