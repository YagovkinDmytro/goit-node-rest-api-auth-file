import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import {
  emailRegExp,
  passwordRegExp,
} from "../../authConstants.js/authConstants.js";

const User = sequelize.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail(value) {
        if (!emailRegExp.test(value)) {
          throw new Error(
            "Please enter a valid email address (e.g., example@domain.com)."
          );
        }
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isPassword(value) {
        if (!passwordRegExp.test(value)) {
          throw new Error(
            "At least 1 Uppercase; At least 1 Lowercase; At least 1 Number; At least 1 Symbol, symbol allowed --> !@#$%^&*_=+-; Min 8 chars"
          );
        }
      },
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// await User.sync();
// await User.sync({ force: true });
// await User.drop();

export default User;
