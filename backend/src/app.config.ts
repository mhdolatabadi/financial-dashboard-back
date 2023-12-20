import { DataSourceOptions } from 'typeorm'
import { ProfitEntity, TransactionEntity, UserEntity } from './domain'

export interface ServerConfig {
  port: number
  host: string
}

export interface ProjectConfig {
  server: ServerConfig
  db: DataSourceOptions
  development: boolean
}

const getServerConfig = (): ServerConfig => ({
  port: Number(process.env.SERVER_PORT),
  host: process.env.SERVER_HOST,
})

export const getOrmConfig = (): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: Boolean(process.env.DB_SYNC),
  entities: [UserEntity, TransactionEntity, ProfitEntity],
  logging: true,
  // migrationsRun: !Boolean(process.env.DB_SYNC),
  // migrations: [join(__dirname, '..', 'migrations', '*.{js,ts}')],
})

export const getConfig = (): ProjectConfig => ({
  server: getServerConfig(),
  db: getOrmConfig(),
  development: Boolean(process.env.DEVELOPMENT),
})