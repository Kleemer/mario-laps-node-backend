import { Auth } from './Auth'
import { jwtHeader } from '../../test/util/rest'

const next = jest.fn()

function mockResponse() {
  const resp = {} as any
  resp.status = jest.fn().mockReturnValue(resp)
  resp.send = jest.fn().mockReturnValue(resp)
  return resp
}

describe('auth', () => {

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('Should respond with error when token is missing.', () => {

    const resp = mockResponse()

    new Auth().use({ headers: {} } as any, resp, next)

    expect(resp.status).toHaveBeenCalledWith(401)
    expect(resp.send).toHaveBeenCalledWith({ error: 'Missing authorization header.' })
    expect(next).toBeCalledTimes(0)
  })

  it('Should respond with error when header is invalid.', () => {

    const resp = mockResponse()

    new Auth().use({ headers: { authorization: 'Bearer ' } } as any, resp, next)

    expect(resp.status).toHaveBeenCalledWith(401)
    expect(resp.send).toHaveBeenCalledWith({ error: 'Invalid authorization header.' })
    expect(next).toBeCalledTimes(0)
  })

  it('Should respond with error when token is invalid.', () => {

    const resp = mockResponse()

    new Auth().use({ headers: { authorization: 'Bearer notavalidtoken' } } as any, resp, next)

    expect(resp.status).toHaveBeenCalledWith(401)
    expect(resp.send).toHaveBeenCalledWith({ error: 'Invalid authorization token.' })
    expect(next).toBeCalledTimes(0)
  })

  it('Should call next when token is invalid.', () => {

    const resp = mockResponse()

    new Auth().use({ headers: jwtHeader() } as any, resp, next)

    expect(resp.status).toHaveBeenCalledTimes(0)
    expect(resp.send).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
