import { UserService } from "./UserService"

const mockFindOne = jest.fn()
const mockCreate = jest.fn()
const mockSave = jest.fn()

// The service under test.
const service = new UserService({} as any)

describe("User Controller", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("Should create user", async () => {
    const user = { id: "1" } as any

    // Call createUser on the service.
    const result = await service["createUser"](user)

    // Assert that create tenant was called.
    // expect(mockCreate).toBeCalledWith({
    //   id: user.id,
    //   name: tenant.fqdn,
    //   fqdn: tenant.fqdn,
    // })
    expect(mockSave).toBeCalledTimes(1)
    // expect(result).toEqual(expected)
  })

  xit("Should not create tenant if already exists", async () => {
    // const user = { id: "1" } as any
    // const tenant = { id: "1", fqdn: "test.fqdn" } as any
    // mockFindOne.mockReturnValue(tenant)

    // // Call findOrCreate on the service.
    // const result = await service["findOrCreate"](environment, tenant)

    // // Assert that create tenant was not called.
    // expect(mockSave).toBeCalledTimes(0)
    // expect(result).toEqual(undefined)
  })
})
