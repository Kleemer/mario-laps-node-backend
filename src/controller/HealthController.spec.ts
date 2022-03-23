import { HealthController } from "./HealthController"

const controller = new HealthController()

jest.mock("typeorm", () => ({
  getConnectionManager: () => ({
    connections: [{ isConnected: true }, { isConnected: false }],
  }),
}))

describe("Health Controller", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("Should get health", async () => {
    const result = controller.health()
    expect(result.uptime).toBeTruthy()
    expect(result.activeDatabaseConnections).toEqual(1)
  })
})
