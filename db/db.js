import {Sequelize} from "sequelize";

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.sequelize = new Sequelize({
      dialect: process.env.DATABASE_DIALECT || "postgres",
      username: process.env.DATABASE_USERNAME || "postgres",
      password: process.env.DATABASE_PASSWORD || "postgres",
      host: process.env.DATABASE_HOST || "postgres",
      database: process.env.DATABASE_NAME || "postgres",
      port: process.env.DATABASE_PORT || 5432,
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