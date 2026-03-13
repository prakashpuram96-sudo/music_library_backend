const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/userRepository");
const adminRepo = require("../repositories/adminRepository");

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

const registerUser = async ({ name, email, phone, password }) => {
  const exists = await userRepo.findByEmail(email);
  if (exists) throw new Error("User already exists");
  const hashed = await bcrypt.hash(password, 10);
  const user = await userRepo.create({ name, email, phone, password: hashed });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  };
};

const registerAdmin = async ({ name, email, password }) => {
  const exists = await adminRepo.findByEmail(email);
  if (exists) throw new Error("Admin already exists");
  const hashed = await bcrypt.hash(password, 10);
  const admin = await adminRepo.create({ name, email, password: hashed });
  return {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id, admin.role),
  };
};

const loginUser = async ({ email, password }) => {
  let account = await userRepo.findByEmail(email);
  let role = "user";
  if (!account) {
    account = await adminRepo.findByEmail(email);
    role = "admin";
  }
  if (!account) throw new Error("Invalid credentials");
  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) throw new Error("Invalid credentials");
  return {
    _id: account._id,
    name: account.name,
    email: account.email,
    role,
    token: generateToken(account._id, role),
  };
};

module.exports = { registerUser, registerAdmin, loginUser };
