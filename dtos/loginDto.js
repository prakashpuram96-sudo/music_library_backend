const loginDto = ({ email, password }) => {
  const errors = [];

  if (!email || !email.trim()) errors.push("Email is required");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email format");
  if (!password) errors.push("Password is required");

  return { errors, data: { email, password } };
};

module.exports = loginDto;
