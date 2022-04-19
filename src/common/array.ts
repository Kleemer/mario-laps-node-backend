interface Entity {
  createdAt: Date
}

export const sortByCreated = (item1: Entity, item2: Entity) => {
  return item1.createdAt.getTime() - item2.createdAt.getTime()
}
