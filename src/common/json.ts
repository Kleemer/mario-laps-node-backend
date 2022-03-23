interface AsJson {
  toJson: () => any
}

type Convertible = AsJson | AsJson[] | undefined

/**
 * Performs a (shallow) transform of the supplied object by calling the objects toJson function.
 * Accepts AsJson | AsJson[] | undefined, or a Promise of these types.
 *
 * All this simply allows us to do some explicit toJson() marshalling from our entities.
 */
function toJson(obj: Convertible | Promise<Convertible>): any {
  // If obj is an array.
  if (Array.isArray(obj)) {
    return obj.map((o) => toJson(o))
  }

  // If the obj is undefined.
  if (!obj) {
    return {}
  }

  // If obj is a promise
  if (typeof (obj as any).then === "function") {
    const p = obj as Promise<Convertible>

    return p.then((o: Convertible) => {
      return toJson(o)
    })
  }

  // obj is an AsJSON
  return (obj as AsJson).toJson()
}

export { toJson, AsJson }
