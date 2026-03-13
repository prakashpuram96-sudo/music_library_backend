const registerUserDto = ({ name, email, phone, password }) => {
  const errors = [];

  if (!name || !name.trim()) errors.push("Name is required");
  if (!email || !email.trim()) errors.push("Email is required");
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email format");
  if (!phone || !phone.trim()) errors.push("Phone is required");
  if (!password) errors.push("Password is required");
  if (password && password.length < 6)
    errors.push("Password must be at least 6 characters");

  return { errors, data: { name, email, phone, password } };
};

module.exports = registerUserDto;
