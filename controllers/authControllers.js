import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { getGravatarUrl } from "../helpers/generate-gravatar.js";
import { getAvatarPath } from "../helpers/getAvatarPath.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email } = req.body;
  const avatar = req.file
    ? await getAvatarPath(req.file)
    : getGravatarUrl(email);

  const newUser = await authServices.signup({ ...req.body, avatar });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

  await authServices.updateUser({ id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: null });

  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const setSubscription = async (req, res) => {
  const { id } = req.user;
  const data = req.body;
  const { email, subscription } = await authServices.updateUser({ id }, data);

  res.json({
    user: {
      email,
      subscription,
    },
  });
};

const addAvatar = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  // const { id } = req.user;
  // const data = req.body;
  // const { avatarURL } = await authServices.updateUser({ id }, data);
  // res.json({
  //   user: {
  //     avatarURL,
  //   },
  // });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  setSubscription: ctrlWrapper(setSubscription),
  addAvatar: ctrlWrapper(addAvatar),
};
