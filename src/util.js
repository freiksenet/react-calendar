export const getClsMods = (clsPrefix, mods) =>
  !mods || !mods.classNames ? null : mods.classNames.map((cls) => `${clsPrefix}--${cls}`);

export const getModsByCompType = (componentType, mods) =>
  mods.filter(({ component }) => component.indexOf(componentType.toLowerCase()) > -1)

export const getComponentMods = (mods) =>
  mods.filter(({ component }) => !component.date)
