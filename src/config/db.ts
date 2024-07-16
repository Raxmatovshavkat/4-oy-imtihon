import * as dotenv from "dotenv";
dotenv.config();
console.log({
    DATABASE_DIALECT: process.env.DATABASE_DIALECT,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_DATABASE: process.env.DATABASE_DATABASE,
    DATABASE_AUTO_LOAD_MODELS: process.env.DATABASE_AUTO_LOAD_MODELS,
    DATABASE_SYNCHRONIZE: process.env.DATABASE_SYNCHRONIZE,
});

import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const databaseConfig = (): SequelizeModuleOptions => ({
    dialect: process.env.DATABASE_DIALECT as any,
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    autoLoadModels: process.env.DATABASE_AUTO_LOAD_MODELS === 'true',
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: false
});

