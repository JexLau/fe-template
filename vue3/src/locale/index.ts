import { LangKey } from "@/typings/lang";
import { getLanguage } from "@/utils/storage";
import { createI18n } from "vue-i18n";
import localeLangJa from "./ja";
import localeLangZhCn from "./zh-cn";
import localeLangEnUs from "./en-us";

export const messages: { [key in LangKey]: any } = {
  "zh-cn": {
    ...localeLangZhCn,
  },
  ja: {
    ...localeLangJa,
  },
  "en-US": {
    ...localeLangEnUs
  },
};

export const getLocale = (): LangKey => {
  // 先寻找缓存里的lang
  const localLanguage = getLanguage();
  if (localLanguage) {
    return localLanguage as LangKey;
  }
  // 如果缓存没有设置lang，根据所在地查询配置并显示对应lang
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale as LangKey;
    }
  }

  // 没有对应的语言配置，显示默认语言
  return "ja";
};

const i18n = createI18n<typeof createI18n>({
  // 设置地区
  locale: getLocale(),
  // 设置地区信息
  messages,
  // Composition API 使用 I18n 需要配置
  legacy: false,
});

export default i18n;
