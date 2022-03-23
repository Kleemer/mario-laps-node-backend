import { currentConnection } from '../../src/app'
import { Connection } from 'typeorm'

function getTableNames(): string[] {
    const connection = currentConnection()
    if (connection) {
        return connection.entityMetadatas.map((e: any) => (e.tableName))
    }
    return []
}

async function cleanAllDatabaseTables() {
    try {
        const connection = currentConnection()
        const tableNames = getTableNames()
        if (connection) {
            await connection.transaction(async transaction => {
                await transaction.query('SET FOREIGN_KEY_CHECKS = 0')
                await Promise.all(
                  tableNames.map((tableName) => transaction.query(`DELETE FROM \`${tableName}\``))
                )
            })
            await connection.query('SET FOREIGN_KEY_CHECKS = 1')
        }
    } catch (error) {
        throw new Error(`ERROR: Cleaning test db: ${ error }`)
    }
}

async function closeDatabaseConnection(connection: Connection | undefined) {
    if (connection && connection.isConnected) {
        await connection.close()
    }
}

export {
    cleanAllDatabaseTables,
    closeDatabaseConnection,
}
