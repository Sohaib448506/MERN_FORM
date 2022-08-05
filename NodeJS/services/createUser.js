const User = require("../Models/UserModel");
async function createUser(name, email, password) {
  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  try {
    const result = await user.save();
    return result;
  } catch (ex) {
    console.log(ex.message);
  }
}
module.exports = createUser;
