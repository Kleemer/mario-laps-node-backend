import { createApp } from "./app"
import { logger } from "./common/logger"
import * as jwt from "jsonwebtoken"

/**
 * Creates and starts the application.
 */
(async () => {
  try {
    // Create the app instance.
    const app = await createApp()

    // Start the app.
    app.listen(process.env.PORT, () => {
      logger.info(`Listening on port ${process.env.PORT}...`)
    })

    // Dump a valid auth token for convenience.
    logger.info(
      "Valid authorization token: ",
      jwt.sign({}, process.env.JWT_SECRET || "secret")
    )
  } catch (err) {
    logger.fatal(`Failed to start app.`, err)
  }
})()

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err)
})
