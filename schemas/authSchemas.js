import Joi from "joi";
import { emailRegExp } from "../authConstants.js/authConstants.js";
import { passwordRegExp } from "../authConstants.js/authConstants.js";

export const authSignupSchema = Joi.object({
  email: Joi.string()
    .ruleset.pattern(emailRegExp)
    .rule({
      message: "Please enter a valid email address (e.g., example@domain.com).",
    })
    .required(),
  password: Joi.string()
    .ruleset.pattern(passwordRegExp)
    .rule({
      message:
        "At least 1 Uppercase; At least 1 Lowercase; At least 1 Number; At least 1 Symbol, symbol allowed --> !@#$%^&*_=+-; Min 8 chars",
    })
    .required(),
});

export const authSetSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.only":
        "Choose one of the following subscriptions: 'starter', 'pro', 'business'.",
    }),
});
