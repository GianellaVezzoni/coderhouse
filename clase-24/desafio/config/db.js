export const options = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}

export const optionsSqlite = {
    client: 'sqlite3',
    connection: {
        filename: "./ecommerce.sqlite"
    },
    useNullAsDefault: true
}
