const patient1 = {
  "_id": "234123412341234001",
  "name": "患者1",
  "age": 50,
  "gender": "男",
  "crystal_degree": 400,
  "ill_time": 1,
  "surgeon": "test",
  "other_symptom": "test",
  "patient_contact": "123",
  "family_status": "test",
  "patient_advice": "test"
}

const patient2 = {
  "_id": "234123412341234002",
  "name": "患者2",
  "age": 54,
  "gender": "男",
  "crystal_degree": 500,
  "ill_time": 1,
  "surgeon": "test",
  "other_symptom": "test",
  "patient_contact": "126",
  "family_status": "test",
  "patient_advice": "test"
}

const patient3 = {
  "_id": "234123412341234003",
  "name": "患者3",
  "age": 49,
  "gender": "女",
  "crystal_degree": 600,
  "ill_time": 1,
  "surgeon": "test",
  "other_symptom": "test",
  "patient_contact": "128",
  "family_status": "test",
  "patient_advice": "test"
}

const patient4 = {
  "_id": "234123412341234004",
  "name": "患者4",
  "age": 66,
  "gender": "女",
  "crystal_degree": 700,
  "ill_time": 1,
  "surgeon": "test",
  "other_symptom": "test",
  "patient_contact": "138",
  "family_status": "test",
  "patient_advice": "test"
}

const patient5 = {
  "_id": "234123412341234005",
  "name": "患者5",
  "age": 72,
  "gender": "男",
  "crystal_degree": 800,
  "ill_time": 1,
  "surgeon": "test",
  "other_symptom": "test",
  "patient_contact": "140",
  "family_status": "test",
  "patient_advice": "test"
}

module.exports = {
  getPatientList: () => [patient1, patient2, patient3, patient4, patient5]
}
