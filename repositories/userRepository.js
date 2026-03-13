const User = require("../models/User");

const findByEmail = (email) => User.findOne({ email });
const findById = (id) => User.findById(id);
const create = (data) => User.create(data);
const findAll = () => User.find({});

module.exports = { findByEmail, findById, create, findAll };
