import { uptime } from "os"
import { Get, JsonController } from "routing-controllers"
import { Connection, getConnectionManager } from "typeorm"

@JsonController()
export class HealthController {
  @Get("/health")
  health() {
    const activeDatabaseConnections = getConnectionManager()
      .connections
      .filter((connection: Connection) => connection.isConnected)
      .length

    return {
      uptime: uptime(),
      activeDatabaseConnections,
    }
  }
}
