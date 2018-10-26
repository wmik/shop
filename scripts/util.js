function pick(object, ...keys) {
  const o = {};
  if (Array.isArray(keys[0])) {
    keys = keys[0];
  }
  for (const key of keys) {
    o[key] = object[key];
  }
  return o;
}
