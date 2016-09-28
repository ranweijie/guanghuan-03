const patient1 = {
  "_id": "234123412341234001",
  "name": "患者1",
  "age": 50,
  "gender": "男",
  "crystalDegree": 400,
  "illTime": 1,
  "surgeon": "test",
  "otherSymptom": "test",
  "patientContact": "123",
  "familyStatus": "test",
  "patientAdvice": "test"
}

const patient2 = {
  "_id": "234123412341234002",
  "name": "患者2",
  "age": 54,
  "gender": "男",
  "crystalDegree": 500,
  "illTime": 1,
  "surgeon": "test",
  "otherSymptom": "test",
  "patientContact": "126",
  "familyStatus": "test",
  "patientAdvice": "test"
}

const patient3 = {
  "_id": "234123412341234003",
  "name": "患者3",
  "age": 49,
  "gender": "女",
  "crystalDegree": 600,
  "illTime": 1,
  "surgeon": "test",
  "otherSymptom": "test",
  "patientContact": "128",
  "familyStatus": "test",
  "patientAdvice": "test"
}

const patient4 = {
  "_id": "234123412341234004",
  "name": "患者4",
  "age": 66,
  "gender": "女",
  "crystalDegree": 700,
  "illTime": 1,
  "surgeon": "test",
  "otherSymptom": "test",
  "patientContact": "138",
  "familyStatus": "test",
  "patientAdvice": "test"
}

const patient5 = {
  "_id": "234123412341234005",
  "name": "患者5",
  "age": 72,
  "gender": "男",
  "crystalDegree": 800,
  "illTime": 1,
  "surgeon": "test",
  "otherSymptom": "test",
  "patientContact": "140",
  "familyStatus": "test",
  "patientAdvice": "test"
}

module.exports = {
  getPatientList: () => [patient1, patient2, patient3, patient4, patient5]
}
