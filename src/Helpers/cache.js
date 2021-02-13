import { addMinutes } from "date-fns";
const set = (key, value, ttl) => {
  const exp = addMinutes(new Date(Date.now()), ttl);
  const payload = { exp, value };
  localStorage.setItem(key, JSON.stringify(payload));
};
const get = key => {
  let value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const del = key => {
  localStorage.removeItem(key);
};

const isValid = exp => {
  return new Date(exp) > new Date(Date.now());
};

export default { get, set, del, isValid };
