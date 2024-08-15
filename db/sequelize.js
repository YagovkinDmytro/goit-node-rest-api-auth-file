import { Sequelize } from "sequelize";

const {
  DATABASE_DIALECT,
  DATABASE_USERNAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

const databaseConfig = {
  dialect: DATABASE_DIALECT,
  username: DATABASE_USERNAME,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialectOptions: {
    ssl: true,
  },
};

const sequelize = new Sequelize(databaseConfig);

export default sequelize;
