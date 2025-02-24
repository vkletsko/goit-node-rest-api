import {Sequelize} from "sequelize";

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT,
          dialect: process.env.DATABASE_DIALECT,
          dialectOptions: {
            ssl: true,
          },
    });


    this.connect();
    Database.instance = this;
    Object.freeze(this);
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Database connection successful");
    } catch (error) {
      console.error("Database connection error:", error.message);
      process.exit(1);
    }
  }
}

const dbInstance = new Database();
export default dbInstance;
export const sequelize = dbInstance.sequelize;