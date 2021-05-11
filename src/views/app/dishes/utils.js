export const findMenuGroupById = (menuGroupId, menuGroups) => {
  return menuGroups.find((group) => group.id === menuGroupId)
}
