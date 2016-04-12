const bindEvents = (events, date) => {
  const boundEvents = {};

  if (!events) return null;

  Object.keys(events)
    .forEach((key) => boundEvents[key] = events[key].bind(null, date));

  return boundEvents;
}

const getClsMods = (clsPrefix, mods) =>
  !mods || !mods.classNames ? null : mods.classNames.map((cls) => `${clsPrefix}--${cls}`);

/**
  * Internal: Creates a single modifier object for a date
  */
const getModByDate = (mods, date, type) => {
  const modifier = {
    date: null,
    classNames: [],
    events: {}
  };

  mods.filter((mod) => mod.date ? mod.date.isSame(date, type) : null)
    .forEach((_mod) => {
      modifier.date = _mod.date;
      modifier.events = _mod.events;
      if (Array.isArray(_mod.classNames)) {
        modifier.classNames.push(..._mod.classNames);
      }
    });

  return modifier;
}

const getModsWithDateRange = (mods) =>
  mods.filter((mod) => !!mod.startDate)

const explodeDateRanges = (mods) => {
  return mods.map((mod) => {
    const diff = mod.endDate.diff(mod.startDate, 'days');

    if (!diff) { // if the diff is 0 just return the mod
      mod.date = mod.startDate.clone();
      return mod;
    }

    return Array(diff).fill(mod).map((mod, i) => {
      return {
        ...mod,
        date: mod.startDate.clone().add(i, 'days')
      }
    });
  })
  .reduce((a, b) => a.concat(b), []);
}

const getModsWithSingleDate = (mods) =>
  mods.filter((mod) => !mod.startDate && mod.date)

const getModsWithoutDate = (mods) =>
  mods.filter((mod) => !mod.date)

export const getModsByCompType = (componentType, mods) => {
  if (!Array.isArray(mods)) {
    return [];
  }

  return mods.filter(({ component }) => component.indexOf(componentType.toLowerCase()) > -1)
};

export const getMods = (mods, date, clsPrefix, type) => {
  if (!mods) {
    return null;
  }

  const events = {};
  const exploded = explodeDateRanges(getModsWithDateRange(mods));
  const mod = getModByDate([ ...mods, ...exploded ], date, type);
  const clsMods = getClsMods(clsPrefix, mod) || [];
  const clsCompMods = getClsMods(clsPrefix, getModsWithoutDate(mods)) || [];

  getModsWithoutDate(mods)
    .forEach((mod) => Object.assign(events, bindEvents(mod.events, date)));

  if (mod && mod.events) {
    Object.assign(events, bindEvents(mod.events, date));
  }

  return { clsMods: [ ...clsMods, ...clsCompMods ], events };
};
