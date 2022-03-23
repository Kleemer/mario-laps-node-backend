import { Error } from "./Error"

const mockNext = jest.fn()
const mockJson = jest.fn()
const mockStatus = jest.fn()
const mockResponse = {
  status: mockStatus,
  finished: false,
}

const middleware = new Error()

describe("Error middleware", () => {
  beforeEach(() => {
    jest.resetAllMocks()
    mockStatus.mockImplementation(function () {
      return { json: mockJson }
    })
  })

  it("Should render error", () => {
    const message = "foo"
    const status = 401
    const errors = [{ message: "bar" }]

    middleware.error({ message, errors, status }, {}, mockResponse, mockNext)

    expect(mockStatus).toHaveBeenCalledWith(status)
    expect(mockJson).toHaveBeenCalledWith({ message, errors })
    expect(mockNext).toBeCalledTimes(0)
  })

  it("Should render 500 error if no error status", () => {
    const message = "foo"
    middleware.error({ message }, {}, mockResponse, mockNext)

    expect(mockStatus).toHaveBeenCalledWith(500)
    expect(mockJson).toHaveBeenCalledWith({ message })
    expect(mockNext).toBeCalledTimes(0)
  })

  it("Should not render errors to a finished response.", () => {
    middleware.error({}, {}, { finished: true }, mockNext)
    expect(mockStatus).toHaveBeenCalledTimes(0)
    expect(mockJson).toHaveBeenCalledTimes(0)
    expect(mockNext).toBeCalledTimes(0)
  })
})
