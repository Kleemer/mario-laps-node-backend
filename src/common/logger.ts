import * as bunyan from "bunyan"

const logger = bunyan.createLogger({
  name: process.env.LOG_NAME || "log",
  level: process.env.LOG_LEVEL as bunyan.LogLevel,
  src: true,
})

export { logger }
