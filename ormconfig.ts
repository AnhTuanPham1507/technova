import './src/boilerplate.polyfill';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { SnakeNamingStrategy } from './src/snake-naming.strategy';

config({
  path: '.env',
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
  process.env[envName] = process.env[envName]?.replace(/\\n/g, '\n');
}

export const connectionSource = new DataSource({
  logging: false,
  synchronize: true,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_APP_USER,
  password: process.env.DB_APP_PASS,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    __dirname + 'src/modules/**/entities/*.entity{.ts,.js}',
    __dirname + 'src/modules/**/*.view-entity{.ts,.js}',
    __dirname + 'src/common/entities/*.entity{.ts,.js}',
    __dirname + 'src/modules/**/models/*.entity{.ts,.js}',
    __dirname + '/src/**/*.entity.{ts,js}',
  ],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
});
