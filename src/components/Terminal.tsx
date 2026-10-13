import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useProjects } from '../hooks/useProjects';
import { useExperiences } from '../hooks/useExperiences';
import { useCv } from '../hooks/useCv';
import { skills } from '../data/skills';
import { getLang } from '../lib/lang';

type Line = { id: number; node: ReactNode; tone?: 'cmd' | 'dim' | 'ok' | 'warn' | 'gap' };

const PROMPT = 'elonm@cotonou:~$';
const PAGES: Record<string, string> = {
  '~': '/', home: '/', about: '/about', projects: '/projects', skills: '/skills', journey: '/journey', contact: '/contact',
};
const CONTACTS = [
  { label: 'email', text: 'elonmlucakakpo@gmail.com', href: 'mailto:elonmlucakakpo@gmail.com' },
  { label: 'whatsapp', text: '+229 57 11 38 10', href: 'https://wa.me/22957113810' },
  { label: 'linkedin', text: 'luc-elonm-akakpo', href: 'https://linkedin.com/in/luc-elonm-akakpo/' },
  { label: 'github', text: 'elonmelonm', href: 'https://github.com/elonmelonm' },
];
const SUGGESTIONS = ['help', 'whoami', 'projects', 'skills', 'contact', 'sudo hire me'];

const toneClass: Record<NonNullable<Line['tone']>, string> = {
  cmd: 'text-ink',
  dim: 'text-muted',
  ok: 'text-live',
  warn: 'text-amber-600 dark:text-amber-300',
  gap: 'h-2.5',
};

/**
 * Console du portfolio : s'ouvre avec la touche `, en tapant « sudo » hors d'un champ,
 * ou via le bouton du header (événement « open-terminal »).
 */
export default function Terminal() {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { projects } = useProjects();
  const { experiences } = useExperiences();
  const cvFr = useCv('fr');
  const cvEn = useCv('en');

  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const historyRef = useRef<string[]>([]);
  const historyIndex = useRef(0);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const bootedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fermé : hors du parcours clavier et des lecteurs d'écran.
  useEffect(() => {
    sectionRef.current?.toggleAttribute('inert', !open);
  }, [open]);

  const print = useCallback((node: ReactNode, tone?: Line['tone']) => {
    setLines((prev) => [...prev, { id: idRef.current++, node, tone }]);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const download = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  const go = (path: string) => {
    navigate(path);
    close();
  };

  const accent = (text: string) => <span className="text-indigo">{text}</span>;
  const grid = (rows: [ReactNode, ReactNode][]) => (
    <span className="grid grid-cols-[max-content_1fr] gap-x-[18px] gap-y-0.5">
      {rows.map(([a, b], i) => <span key={i} className="contents"><span className="text-live">{a}</span><span>{b}</span></span>)}
    </span>
  );

  const commands: Record<string, { desc?: string; run: (args: string[]) => void }> = {
    help: {
      desc: t('terminal.help.help'),
      run: () => {
        print(accent(t('terminal.commands')));
        print(grid(Object.entries(commands).filter(([, c]) => c.desc).map(([name, c]) => [name, <span className="text-muted">{c.desc}</span>])));
      },
    },
    whoami: {
      desc: t('terminal.help.whoami'),
      run: () => {
        print(<>{accent('Elonm Luc Akakpo')} — {t('about.role')}</>);
        print(t('home.hero.subtitle'), 'dim');
        print(`${t('about.stats.years_val')} · ${t('contact.info.location.val')} · FR / EN`, 'dim');
      },
    },
    projects: {
      desc: t('terminal.help.projects'),
      run: ([query]) => {
        if (query) {
          const q = query.toLowerCase();
          const match = projects.find((p) => p.slug?.startsWith(q)) ?? projects.find((p) => p.slug?.includes(q));
          if (!match?.slug) return print(t('terminal.project_not_found', { name: query }), 'warn');
          print(`→ /projects/${match.slug}`, 'ok');
          return go(`/projects/${match.slug}`);
        }
        if (!projects.length) return print(t('terminal.loading'), 'dim');
        print(grid(projects.map((p) => [
          p.slug ?? '—',
          <><b className="font-semibold">{lang === 'fr' ? p.title_fr : p.title_en}</b></>,
        ])));
        print(t('terminal.projects_hint'), 'dim');
      },
    },
    skills: {
      desc: t('terminal.help.skills'),
      run: () => {
        for (const category of ['Frontend', 'Backend', 'Tools']) {
          print(accent(t(`skills.categories.${category.toLowerCase()}`)));
          print(skills.filter((s) => s.category === category).map((s) => s.title).join(' · '), 'dim');
        }
      },
    },
    journey: {
      desc: t('terminal.help.journey'),
      run: () => {
        if (!experiences.length) return print(t('terminal.loading'), 'dim');
        print(grid(experiences.map((e) => [
          lang === 'fr' ? e.period_fr : e.period_en,
          <>{lang === 'fr' ? e.title_fr : e.title_en}{e.company && <span className="text-muted"> · {e.company}</span>}</>,
        ])));
      },
    },
    cv: {
      desc: t('terminal.help.cv'),
      run: (args) => {
        const cv = args.includes('--en') ? cvEn : args.includes('--fr') ? cvFr : lang === 'fr' ? cvFr : cvEn;
        print(t('terminal.cv_download'), 'ok');
        download(cv.url, cv.downloadName);
      },
    },
    contact: {
      desc: t('terminal.help.contact'),
      run: () => {
        print(grid(CONTACTS.map((c) => [
          c.label,
          <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-indigo underline-offset-2 hover:underline">{c.text}</a>,
        ])));
      },
    },
    cd: {
      desc: t('terminal.help.cd'),
      run: ([target = '~']) => {
        const path = PAGES[target.replace(/^\/|\/$/g, '') || '~'];
        if (!path) return print(t('terminal.no_page', { name: target }), 'warn');
        print(`→ ${path}`, 'ok');
        go(path);
      },
    },
    theme: {
      desc: t('terminal.help.theme'),
      run: () => {
        toggleTheme();
        print(t('terminal.theme_set', { theme: theme === 'light' ? t('terminal.dark') : t('terminal.light') }), 'ok');
      },
    },
    lang: {
      desc: t('terminal.help.lang'),
      run: ([next]) => {
        const target = next === 'en' || next === 'fr' ? next : lang === 'fr' ? 'en' : 'fr';
        i18n.changeLanguage(target);
        print(target === 'fr' ? 'langue : français' : 'language: English', 'ok');
      },
    },
    clear: { desc: t('terminal.help.clear'), run: () => setLines([]) },
    exit: { desc: t('terminal.help.exit'), run: () => close() },
    // Commandes cachées
    ls: { run: () => print(accent('about/  projects/  skills/  journey/  contact/  cv.pdf')) },
    rm: { run: () => print(t('terminal.rm'), 'warn') },
    sudo: {
      run: (args) => {
        const rest = args.join(' ').toLowerCase();
        if (rest === 'hire me' || rest === 'hire elonm') {
          print(t('terminal.sudo_password'), 'dim');
          print(<>{t('terminal.sudo_granted')} <a href="mailto:elonmlucakakpo@gmail.com" className="text-indigo hover:underline">elonmlucakakpo@gmail.com</a></>, 'ok');
        } else {
          print(<>{t('terminal.sudo_try')} {accent('sudo hire me')}</>, 'dim');
        }
      },
    },
  };

  const run = (raw: string) => {
    const line = raw.trim();
    print(<><span className="text-live">{PROMPT}</span> {line}</>, 'cmd');
    if (line) {
      historyRef.current.push(line);
      historyIndex.current = historyRef.current.length;
      const [name, ...args] = line.split(/\s+/);
      const command = commands[name.toLowerCase()];
      if (command) command.run(args);
      else print(<>{t('terminal.not_found', { name })} {accent('help')}</>, 'warn');
    }
    print(null, 'gap');
  };

  // Message d'accueil à la première ouverture, focus sur la saisie.
  useEffect(() => {
    if (!open) return;
    if (!bootedRef.current) {
      bootedRef.current = true;
      print(<>{accent('elonm.luc')} — {t('terminal.welcome')}</>, 'dim');
      print(t('terminal.welcome_hint'), 'dim');
      print(null, 'gap');
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [open, print, t]);

  useEffect(() => {
    outRef.current?.scrollTo({ top: outRef.current.scrollHeight });
  }, [lines]);

  // Raccourcis globaux.
  useEffect(() => {
    let typed = '';
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const inField = !!el && (/INPUT|TEXTAREA|SELECT/.test(el.tagName) || el.isContentEditable);
      const inTerminal = el === inputRef.current;
      if (e.key === 'Escape' && open) { e.preventDefault(); close(); return; }
      if (e.key === '`' && (!inField || inTerminal)) { e.preventDefault(); setOpen((o) => !o); return; }
      if (!inField && e.key.length === 1) {
        typed = (typed + e.key.toLowerCase()).slice(-4);
        if (typed === 'sudo') { setOpen(true); typed = ''; }
      }
    };
    const onOpen = () => setOpen((o) => !o);
    document.addEventListener('keydown', onKey);
    window.addEventListener('open-terminal', onOpen);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('open-terminal', onOpen);
    };
  }, [open, close]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const history = historyRef.current;
    if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault();
      historyIndex.current = Math.max(0, historyIndex.current - 1);
      setValue(history[historyIndex.current]);
    } else if (e.key === 'ArrowDown' && history.length) {
      e.preventDefault();
      historyIndex.current = Math.min(history.length, historyIndex.current + 1);
      setValue(history[historyIndex.current] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(commands).filter((k) => commands[k].desc && k.startsWith(value));
      if (matches.length === 1) setValue(`${matches[0]} `);
      else if (matches.length) print(matches.join('  '), 'dim');
    }
  };

  const gutter = 'px-4 sm:px-6 lg:px-14';

  return (
    <>
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-[70] bg-black/25 transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <section
        id="terminal"
        role="dialog"
        aria-label={t('terminal.title')}
        aria-hidden={!open}
        ref={sectionRef}
        className={`site fixed inset-x-0 top-0 z-[71] flex h-[min(62vh,560px)] flex-col border-b border-indigo bg-paper/95 font-mono text-[0.92rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none ${open ? 'translate-y-0' : '-translate-y-[102%]'}`}
      >
        <div className={`flex items-center justify-between gap-3 border-b border-rule py-2.5 text-[0.78rem] text-muted ${gutter}`}>
          <span>elonm@cotonou — zsh</span>
          <button type="button" onClick={close} className="rounded hover:text-ink focus-ring">{t('terminal.close')}</button>
        </div>

        <div ref={outRef} aria-live="polite" className={`flex-1 overflow-y-auto pb-2 pt-4 leading-[1.65] ${gutter}`}>
          {lines.map((line) =>
            line.tone === 'gap'
              ? <div key={line.id} className={toneClass.gap} />
              : <p key={line.id} className={`m-0 whitespace-pre-wrap break-words ${line.tone ? toneClass[line.tone] : ''}`}>{line.node}</p>
          )}
        </div>

        <div className={`flex flex-wrap gap-1.5 pb-3 ${gutter}`}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { run(s); inputRef.current?.focus(); }}
              className="rounded-full border border-rule bg-surface px-2.5 py-0.5 text-xs text-muted hover:border-indigo hover:text-ink focus-ring"
            >
              {s}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); run(value); setValue(''); }}
          className={`flex items-center gap-2 border-t border-rule pb-3.5 pt-2.5 ${gutter}`}
        >
          <label htmlFor="terminal-input" className="whitespace-nowrap text-live">{PROMPT}</label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onInputKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-ink caret-indigo outline-none"
          />
        </form>
      </section>
    </>
  );
}
