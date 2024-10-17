const rolePermission = {
    superadmin: ['manageAdmins','viewReports','deleteUser'],
    admin: ['viewReports','createUser'],
    backendsystem: ['viewReports']
}

function hasPermission(role,permission){
    return rolesPermission[role] && rolePermission[role].includes(permission);
}

module.exports = {
    hasPermission
}