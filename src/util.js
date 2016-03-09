const bindEvents = (events, date) => {
  const boundEvents = {};

  Object.keys(events)
    .forEach((key) => boundEvents[key] = events[key].bind(null, date));

  return boundEvents;
}

const getClsMods = (clsPrefix, mods) =>
  !mods || !mods.classNames ? null : mods.classNames.map((cls) => `${clsPrefix}--${cls}`);

const getModByDate = (mods, date, type) => {
  const modifier = {
    date: null,
    classNames: [],
    events: {}
  };

  mods.filter((mod) => mod.date ? mod.date.isSame(date, type) : null)
    .forEach((_mod) => {
      modifier.date = _mod.date;
      modifier.events = Object.assign(modifier.events, _mod.events);
      modifier.classNames.push(..._mod.classNames);
    });

  return modifier;
}

const getModsWithoutDate = (mods) =>
  mods.filter((mod) => !mod.date)

export const getModsByCompType = (componentType, mods) =>
  mods.filter(({ component }) => component.indexOf(componentType.toLowerCase()) > -1)

export const getMods = (mods, date, clsPrefix, type) => {
  if (!mods) {
    return null;
  }

  const events = {};

  const mod = getModByDate(mods, date, type);
  const clsMods = getClsMods(clsPrefix, mod) || [];
  const clsCompMods = getClsMods(clsPrefix, getModsWithoutDate(mods)) || [];

  getModsWithoutDate(mods)
    .forEach((mod) => Object.assign(events, bindEvents(mod.events, date)));

  if (mod && mod.events) {
    Object.assign(events, bindEvents(mod.events, date));
  }

  return { clsMods: [ ...clsMods, ...clsCompMods ], events };
};
