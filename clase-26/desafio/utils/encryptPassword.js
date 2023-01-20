import bcrypt from "bcrypt";

export const encryptPassword = (password) => {
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    return passwordEncrypted;
}