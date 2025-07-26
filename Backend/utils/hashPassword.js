// 



import bcrypt from "bcrypt";

// Hash plain password
export async function hashMyPassword(plainPassword) {
  const hashPassword = await bcrypt.hash(plainPassword, 10);
  return hashPassword;
}

// Compare plain and hashed password
export async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
