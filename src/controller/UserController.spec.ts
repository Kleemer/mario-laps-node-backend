import { UserController } from "./UserController"
import { User } from "../entity/User"
import { toJson } from "../common"

const getUsers = jest.fn()
const getUser = jest.fn()

const userService = {
  getUsers,
  getUser,
} as any

const controller = new UserController(userService)

describe("User Controller", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("Should get all users", async () => {
    const users = [
      mock({ id: '1', username: 'one', avatar: 'url' }),
      mock({ id: '2' , username: 'two' }),
    ]

    getUser.mockReturnValue(users)

    // Get all users
    const result = await controller.getAll()

    // Assert that the users were returned.
    expect(result.data).toEqual(toJson(users))
  })

  it("Should get single user", async () => {
    const user = mock({ id: '1', username: 'one', avatar: 'url' })
    getUser.mockReturnValue(user)

    // Get one user
    const result = await controller.getOne('1')

    // Assert that the user was returned.
    expect(result.data).toEqual(toJson(user))
    expect(getUser).toHaveBeenCalledWith('1')
  });
});

function mock(data?: Partial<User>): User {
  const user = new User();

  user.id = data?.id ?? user?.id;
  user.username = data?.username ?? user?.username;
  user.avatar = data?.avatar ?? user?.avatar;

  return user;
}
