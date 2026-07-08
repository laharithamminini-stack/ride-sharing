
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const JWT_SECRET = "mysecretkey";

// ================= REGISTER =================
exports.register = async (data) => {
  console.log("Register data:", data);

  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Create Driver record
  if (role === "DRIVER") {
    await prisma.driver.create({
      data: {
        userId: user.id,
        vehicleNo: "AP00AA0000",
        latitude: 0,
        longitude: 0,
        status: "AVAILABLE",
      },
    });
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

// ================= LOGIN =================
exports.login = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};