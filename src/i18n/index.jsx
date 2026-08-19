import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DICT, LANGS } from './dict';

const KEY = 'valords.lang';
const DEFAULT = 'es';

const Ctx = createContext(null);

function initial() {
  if (typeof window === 'undefined') return DEFAULT;
  const saved = window.localStorage?.getItem(KEY);
  if (saved && DICT[saved]) return saved;
  /* the browser gets one guess, and only among the four the office speaks */
  for (const tag of navigator.languages || []) {
    const code = tag.slice(0, 2).toLowerCase();
    if (DICT[code]) return code;
  }
  return DEFAULT;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initial);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { window.localStorage?.setItem(KEY, lang); } catch { /* private mode */ }
  }, [lang]);

  const setLang = useCallback((code) => {
    if (DICT[code]) setLangState(code);
  }, []);

  /* Falls back to Spanish, then to the key itself. A missing key showing its
     own name is deliberate: it is obvious in review, whereas silently showing
     English would look like a finished translation that simply reads wrong. */
  const t = useCallback(
    (key) => DICT[lang]?.[key] ?? DICT[DEFAULT]?.[key] ?? key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t, langs: LANGS }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export { LANGS };
