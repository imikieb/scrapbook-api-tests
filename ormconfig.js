require('dotenv').config();

module.exports = {
    type: process.env.DATABASE_TYPE,
    url: process.env.DATABASE_URL,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    migrations: [
        'src/database/migrations/**/*.ts'
    ],
    entities: [
        'src/database/entities/**/*.ts'
    ],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations'
    }
}