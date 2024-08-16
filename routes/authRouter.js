import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../decorators/validateBody.js";
import {
  authSetSubscriptionSchema,
  authSignupSchema,
} from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const signupMiddleware = validateBody(authSignupSchema);
const setSubscriptionMidellware = validateBody(authSetSubscriptionSchema);

const authRouter = Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  signupMiddleware,
  authControllers.signup
);
authRouter.post("/login", signupMiddleware, authControllers.signin);
authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.patch(
  "/subscription",
  authenticate,
  setSubscriptionMidellware,
  authControllers.setSubscription
);
authRouter.patch("/avatars", authenticate, authControllers.addAvatar);
export default authRouter;
