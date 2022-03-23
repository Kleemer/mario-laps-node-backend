import { toJson } from "./json"

const o = { testAttribute: 1, toJson: () => ({ test_attribute: 1 }) }
const a = [o, o]

describe("Json", () => {
  it("Should convert object to json", async () => {
    expect(toJson(o)).toEqual(o.toJson())
    expect(await toJson(Promise.resolve(o))).toEqual(o.toJson())
  })

  it("Should convert array to json", async () => {
    expect(toJson(a)).toEqual([o.toJson(), o.toJson()])
    expect(await toJson(Promise.resolve(a))).toEqual([o.toJson(), o.toJson()])
  })

  it("Should convert undefined to empty json", async () => {
    expect(toJson(undefined)).toEqual({})
    expect(await toJson(Promise.resolve(undefined))).toEqual({})
  })
})
