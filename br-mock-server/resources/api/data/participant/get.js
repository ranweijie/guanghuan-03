'use strict';

const Participant = require('entity/participant');
const Project = require('entity/project');

module.exports = function(req, res, next) {
  if (req.params.project_id === Project.id) {
    res.send([Object.assign({}, Participant, {project_id: Project.id}, {id: '1'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: '王磊'}, {id: '2'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: 'Tony'}, {is_team_leader: true}, {category: 1004}, {id: '3'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: '韩梅梅'}, {is_team_leader: true}, {id: '4'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: 'Melody'}, {category: 1004}, {id: '5'}),



      Object.assign({}, Participant, {project_id: Project.id}, {id: '6'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: '王磊'}, {id: '7'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: 'Tony'}, {is_team_leader: true}, {category: 1003}, {id: '8'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: '韩梅梅'}, {is_team_leader: true}, {id: '9'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: 'Melody'}, {category: 1003}, {id: '10'}),


      Object.assign({}, Participant, {project_id: Project.id}, {id: '11'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: '王磊'}, {id: '12'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: 'Tony'}, {is_team_leader: true}, {category: 1003}, {id: '14'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: '韩梅梅'}, {is_team_leader: true}, {id: '13'}),
      Object.assign({}, Participant, {project_id: Project.id}, {name: 'Melody'}, {category: 1004}, {id: '15'})
    ]);
  } else {
    res.send(404);
  }
  next();
};
