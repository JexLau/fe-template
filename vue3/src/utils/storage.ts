import Keys from "@/constant/key";

export const getLanguage = () => localStorage.getItem(Keys.languageKey);
export const setLanguage = (language: string) =>
  localStorage.setItem(Keys.languageKey, language);

export const getToken = () => localStorage.getItem(Keys.tokenKey);
export const setToken = (token: string) =>
  localStorage.setItem(Keys.tokenKey, token);
export const removeToken = () => localStorage.removeItem(Keys.tokenKey);

export const getProjectId = () => localStorage.getItem(Keys.projectIdKey);
export const setProjectId = (projectId: string) =>
  localStorage.setItem(Keys.projectIdKey, projectId);
