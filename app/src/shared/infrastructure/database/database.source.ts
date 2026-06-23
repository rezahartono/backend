import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const PostgresDatasource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'rezahr',
  password: process.env.DB_PASSWORD || 'rezahr',
  database: process.env.DB_DATABASE || 'library_db',
  entities: ['dist/data/entities/**/*.entity{.ts,.js}'],
  migrations: ['dist/core/database/migrations/*{.ts,.js}'],
  synchronize: true, // Disable for production
  logging: ['error', 'query', 'migration', 'log', 'warn', 'schema'],
});
