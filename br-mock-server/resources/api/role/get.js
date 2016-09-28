

module.exports = function(req, res, next) {

  res.send([{"roleCode":"ROLE_ADMIN","roleName":"Admin"},
    {"roleCode":"ROLE_CSR","roleName":"CSR"},
    {"roleCode":"ROLE_CSR_LEAD","roleName":"光明行负责人"},
    {"roleCode":"ROLE_FINANCIER","roleName":"财务专员"},
    {"roleCode":"ROLE_LEAD","roleName":"集团领导"},
    {"roleCode":"ROLE_VOLUNTEER","roleName":"志愿者"}]);
  next();
};
