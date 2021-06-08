function verifyRole(user, role) {
  if (user && user.roles.length > 0) {
    var i;
    for (i = 0; i < user.roles.length; i++) {
      if (user.roles[i].level == role) {
        return true;
      }
    }
  }
  return false;
}

function verifyAnyAdmin(user) {
  return verifyRole(user, 1) || verifyRole(user, 2);
}

function verifySuperAdmin(user) {
  return verifyRole(user, 1);
}

function verifyZooAdmin(user) {
  return verifyRole(user, 2);
}

module.exports = {
  verifyAnyAdmin,
  verifySuperAdmin,
  verifyZooAdmin,
};
