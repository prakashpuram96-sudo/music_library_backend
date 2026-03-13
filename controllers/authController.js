const authService = require("../services/authService");
const registerUserDto = require("../dtos/registerUserDto");
const registerAdminDto = require("../dtos/registerAdminDto");
const loginDto = require("../dtos/loginDto");

const registerUser = async (req, res) => {
  const { errors, data } = registerUserDto(req.body);
  if (errors.length > 0) return res.status(400).json({ message: errors[0] });
  try {
    const result = await authService.registerUser(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const registerAdmin = async (req, res) => {
  const { errors, data } = registerAdminDto(req.body);
  if (errors.length > 0) return res.status(400).json({ message: errors[0] });
  try {
    const result = await authService.registerAdmin(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { errors, data } = loginDto(req.body);
  if (errors.length > 0) return res.status(400).json({ message: errors[0] });
  try {
    const result = await authService.loginUser(data);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

module.exports = { registerUser, registerAdmin, loginUser, logoutUser };
