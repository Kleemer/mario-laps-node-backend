import request from "supertest"
import { createApp, currentConnection } from "../src/app"
import { Express } from "express"
import { User } from "../src/entity/User"
import { jwtHeader } from "./util/rest"
import {
  cleanAllDatabaseTables,
  closeDatabaseConnection,
} from "./util/database"
import f from "faker"

describe("User Controller", () => {
  let app: Express

  beforeAll(async () => {
    app = await createApp()
    await cleanAllDatabaseTables()
  })

  afterAll(async () => {
    await closeDatabaseConnection(currentConnection())
  })

  it("Should get all users", async () => {
    const e1 = { id: f.random.uuid(), username: "e1" }
    const e2 = { id: f.random.uuid(), username: "e2" }

    // Users to be returned.
    const users = [ e1, e2 ]

    await Promise.all(users.map((user) => User.create({ ...user }).save()))

    await request(app)
      .get("/users")
      .set(jwtHeader())
      .expect(200)
      .expect((res) =>
        expect(res.body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ id: e1.id }),
            expect.objectContaining({ id: e2.id }),
          ])
        )
      )
  })
})
