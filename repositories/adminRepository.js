const Admin = require("../models/Admin");

const findByEmail = (email) => Admin.findOne({ email });
const create = (data) => Admin.create(data);

module.exports = { findByEmail, create };
