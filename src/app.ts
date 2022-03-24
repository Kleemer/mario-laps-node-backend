import dotenv from 'dotenv'
dotenv.config({ path: process.env.DOTENV || '.env' })

import bodyParser from 'body-parser'
import express, { Express } from 'express'
import { middleware as OpenApiValidator } from 'express-openapi-validator'
import 'reflect-metadata'
import { useExpressServer } from 'routing-controllers'
import {
  Connection, createConnection, getConnectionOptions,
} from 'typeorm'

// The TypeORM connection.
let connection: Connection | undefined

/**
 * Creates the express application.
 */
async function createApp(): Promise<Express> {
  // Create the database connection.
  connection = await createConnection({
    ...(await getConnectionOptions()),
  })

  // Instantiate Express.
  const app = express()

  app.get('/healthz', function(_req, res) {
    res.send('OK')
  })

  app.use(bodyParser.json())

  // Load the OpenApi validator
  app.use(
    OpenApiValidator({
      apiSpec: 'openapi.yml',
      validateRequests: true,
      validateResponses: true,
    }),
  )

  // Initialise Routing Controllers.
  useExpressServer(app, {
    controllers: [ __dirname + '/controller/*' ],
    middlewares: [ __dirname + '/middleware/*' ],
  })

  return app
}

/**
 * Returns the current connection (or undefined if there is none).
 */
function currentConnection(): Connection | undefined {
  return connection
}

export { createApp, currentConnection }
