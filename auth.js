/*
 * Created Date: Monday June 3rd 2019
 * Author: lugusliu
 * Copyright (c) 2019 doBell
 * HISTORY:
 */
import { isValidJSON } from '@/utils';

export const getSession = key => {
  return isValidJSON(window.sessionStorage.getItem(key))
    ? JSON.parse(window.sessionStorage.getItem(key))
    : window.sessionStorage.getItem(key);
};

export const setSession = (key, value) => {
  return window.sessionStorage.setItem(key, value);
};

export const removeSession = key => {
  return window.sessionStorage.removeItem(key);
};

export const getLocal = key => {
  return window.localStorage.getItem(key);
};

export const setLocal = (key, value) => {
  return window.localStorage.setItem(key, value);
};

export const removeLocal = key => {
  return window.localStorage.removeItem(key);
};
