export const findMenuGroupById = (menuGroupId, menuGroups) => {
  return menuGroups.find((group) => group.id === menuGroupId)
}

export const findToppingGroupById = (toppingGroupId, toppingGroups) => {
  return toppingGroups.find((group) => group.id === toppingGroupId)
}
