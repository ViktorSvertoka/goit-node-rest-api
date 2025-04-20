import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(chalk.green('✅ Database connection successful!'));
  } catch (error) {
    console.error(
      chalk.red(`❌ Error connection to database: ${error.message}...`)
    );
    process.exit(1);
  }
};

export { sequelize, connectDB };
