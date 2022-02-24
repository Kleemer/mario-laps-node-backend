import { Get, JsonController } from "routing-controllers";
import * as os from "os";
import { Connection, getConnectionManager } from "typeorm";

@JsonController()
export class HealthController {
  @Get("/health")
  health() {
    const activeConnections = getConnectionManager().connections.filter(
      (connection: Connection) => connection.isConnected
    ).length;
    return {
      uptime: os.uptime(),
      activeDatabaseConnections: activeConnections,
    };
  }
}
