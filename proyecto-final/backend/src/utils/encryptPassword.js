const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
  const passwordEncrypted = bcrypt.hashSync(password, 10);
  return passwordEncrypted;
};

const comparePasswords = async (passwordLogin, passwordFromMongo) => {
  const passwordEncrypted = bcrypt.hashSync(passwordLogin, 10);
  const passwordCompared = await bcrypt.compare(passwordEncrypted, passwordFromMongo);
  return passwordCompared;
};

module.exports = {
  encryptPassword,
  comparePasswords
}