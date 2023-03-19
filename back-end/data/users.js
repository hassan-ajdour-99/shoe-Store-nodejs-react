import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "jhon@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mike Doe",
    email: "Mike@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Anna Doe",
    email: "Anna@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
