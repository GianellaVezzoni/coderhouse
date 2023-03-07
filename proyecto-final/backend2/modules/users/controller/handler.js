import { cartMongo } from "../../../modules/cart/routes/cart.js";
import passport from "passport";
import { Strategy } from "passport-local";
import { userContainer as users } from "../../../modules/users/routes/index.js";
import {
  validatePassword,
  generatePassword,
} from "../../../utils/passwordUtils.js";
import { sendEmailRegistration } from "../../../utils/sendEmailUtils.js";

const customFields = {
  usernameField: "userEmail",
  passwordField: "userPassword",
  passReqToCallback: true,
};

async function LoginVerifyCallBack(req, userEmail, userPassword, done) {
  try {
    const user = await users.findOne({ email: userEmail });
    if (!user) {
      return done(null, false);
    } else if (validatePassword(userPassword, user.hash, user.salt)) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
}

async function RegisterVerifyCallBack(req, userEmail, userPassword, done) {
  const { userName, userAddress, userAge, userPhone, userPicture } = req.body;
  try {
    const user = await users.findOne({ email: userEmail });
    if (user) {
      return done(null, false);
    } else {
      const newCart = { timestamp: Date.now(), productos: [] };
      const userCartId = (await cartMongo.save(newCart))._id.toString();
      const { salt, hash } = generatePassword(userPassword);
      const newUser = new users({
        timestamp: Date.now(),
        nombre: userName,
        direccion: userAddress,
        edad: userAge,
        telefono: userPhone,
        foto: userPicture,
        carritoId: userCartId,
        email: userEmail,
        salt: salt,
        hash: hash,
      });
      await newUser.save();
      const userWithId = await users.findOne({ email: userEmail });
      req.userData = userWithId;
      sendEmailRegistration(`<h1>Nuevo registro en la app</h1>
      <p>Datos<br>Nombre: ${userName}
      <br>Email: ${userEmail}
      </p>`);
      return done(null, userWithId);
    }
  } catch (error) {
    done(error);
  }
}

export const loginStrategy = new Strategy(customFields, LoginVerifyCallBack);
export const registerStrategy = new Strategy(
  customFields,
  RegisterVerifyCallBack
);
export async function postUser(_, res) {
  res.redirect(303, "/");
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await users.findById(userId);
    user ? done(null, user) : null;
  } catch (error) {
    done(error);
  }
});
