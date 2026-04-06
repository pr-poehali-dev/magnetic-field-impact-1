import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";



const NAV_ITEMS = [
  { id: "hero", label: "Главная" },
  { id: "theory", label: "Теория" },
  { id: "analysis", label: "Анализ" },
  { id: "recommendations", label: "Рекомендации" },
  { id: "contacts", label: "Контакты" },
];

const THEORY_CARDS = [
  {
    icon: "Magnet",
    title: "Биомагнетизм",
    text: "Все живые организмы генерируют слабые магнитные поля, обусловленные биоэлектрическими процессами. Клетки реагируют на внешние поля через ионные каналы мембран.",
  },
  {
    icon: "Leaf",
    title: "Влияние на растения и микроорганизмы",
    text: "Постоянные магнитные поля малой интенсивности стимулируют прорастание семян и рост корневой системы у более 30 видов растений. Бактерии-магнетотактики синтезируют кристаллы магнетита для ориентирования в пространстве — внешние поля нарушают их поведение и метаболизм.",
  },
  {
    icon: "PawPrint",
    title: "Влияние на животных",
    text: "Многие животные используют магнитное поле Земли для навигации: птицы, рыбы, черепахи. Искусственные поля дезориентируют их миграционное поведение. У млекопитающих зафиксированы изменения в работе эндокринной и нервной систем при длительном воздействии.",
  },
  {
    icon: "Zap",
    title: "ЭМП и клетки",
    text: "Кальциевые каналы клеточных мембран особенно чувствительны к низкочастотным полям. Это объясняет возможные биохимические изменения при хроническом воздействии.",
  },
];

const EXPERIMENTS = [
  {
    label: "Прорастание семян пшеницы",
    control: 68,
    experiment: 89,
    unit: "%",
    note: "В поле 50 мТл, 7 суток",
  },
  {
    label: "Длина корня редиса",
    control: 4.2,
    experiment: 6.1,
    unit: "см",
    note: "В поле 30 мТл, 10 суток",
  },
  {
    label: "Активность E. coli",
    control: 100,
    experiment: 73,
    unit: "%",
    note: "В поле 100 мТл, 24 ч",
  },
  {
    label: "Масса биомассы водорослей",
    control: 1.0,
    experiment: 1.38,
    unit: "г/л",
    note: "В поле 20 мТл, 14 суток",
  },
];

const RISKS = [
  {
    level: "Низкий",
    color: "#16a34a",
    text: "Статическое поле <1 мТл — бытовые магниты, мониторы, бытовая техника. Риск для здоровья не выявлен.",
  },
  {
    level: "Умеренный",
    color: "#d97706",
    text: "Переменное поле 50 Гц >0.3 мкТл — ЛЭП, трансформаторные подстанции. Требует ограничения времени пребывания.",
  },
  {
    level: "Высокий",
    color: "#dc2626",
    text: "Промышленные магниты, МРТ-аппараты >1 Тл — специализированные учреждения. Строгий регламент доступа.",
  },
];

function BarChart({ data }: { data: typeof EXPERIMENTS }) {
  const max = Math.max(...data.flatMap((d) => [d.control, d.experiment]));
  return (
    <div className="space-y-6">
      {data.map((item, i) => (
        <div key={i}>
          <div className="flex flex-wrap justify-between items-baseline mb-1 gap-1">
            <span className="font-semibold text-gray-900 text-sm md:text-base">{item.label}</span>
            <span className="text-xs text-gray-500">{item.note}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-24 text-xs text-gray-600 shrink-0">Контроль</span>
              <div className="flex-1 bg-gray-100 rounded-full h-7 relative overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                  style={{ width: `${(item.control / max) * 100}%`, background: "#1e3a5f" }}
                >
                  <span className="text-white text-xs font-bold">
                    {item.control}
                    {item.unit}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-24 text-xs text-gray-600 shrink-0">Опыт</span>
              <div className="flex-1 bg-gray-100 rounded-full h-7 relative overflow-hidden">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                  style={{ width: `${(item.experiment / max) * 100}%`, background: "#0ea5e9" }}
                >
                  <span className="text-white text-xs font-bold">
                    {item.experiment}
                    {item.unit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({
  icon,
  label,
  title,
  subtitle,
}: {
  icon: string;
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
          <Icon name={icon} size={16} className="text-white" />
        </div>
        <span className="text-sky-600 font-bold text-sm uppercase tracking-wider">{label}</span>
      </div>
      <h2
        className="font-display font-black text-navy mb-3"
        style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
      >
        {title}
      </h2>
      <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">{subtitle}</p>
      <div className="w-16 h-1 bg-navy rounded-full mt-4" />
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-main bg-white text-gray-900 min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b-2 border-navy shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center">
              <Icon name="Magnet" size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-navy text-sm md:text-base leading-tight">
              Магнитные поля
            </span>
          </div>

          <div className="hidden md:flex gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeSection === item.id
                    ? "bg-navy text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-navy" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                  activeSection === item.id
                    ? "bg-navy text-white"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={(el) => {
          sectionRefs.current["hero"] = el;
        }}
        className="pt-16 min-h-screen flex flex-col"
      >
        <div className="relative flex-1 flex flex-col">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/d7371280-2f0a-47ab-9efd-21ba71da3ff3/files/cd763d19-0b4e-4d05-8feb-17e2c176c51f.jpg"
              alt="Магнитное поле"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-12 bg-navy" />
              <a
                href="https://spt42.kemobl.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-navy rounded-full px-4 py-1.5 hover:bg-navy hover:text-white transition-all duration-200 group"
              >
                <Icon name="GraduationCap" size={16} className="text-navy group-hover:text-white transition-colors" />
                <span className="text-navy group-hover:text-white font-bold text-xs md:text-sm tracking-wide uppercase transition-colors">
                  Сибирский политехнический техникум
                </span>
                <Icon name="ExternalLink" size={13} className="text-navy group-hover:text-white transition-colors" />
              </a>
              <div className="h-px flex-1 max-w-12 bg-navy" />
            </div>

            <div className="text-center mb-8">
              <h1
                className="font-display font-black text-navy leading-none mb-4"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                Воздействие магнитных
                <br />
                <span className="text-sky-600">полей на живые</span>
                <br />
                организмы
              </h1>
              <div className="w-24 h-1.5 bg-navy mx-auto mb-6 rounded-full" />
              <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                Научно-исследовательский проект по изучению биологических эффектов
                электромагнитных полей
              </p>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex flex-col items-center gap-1 bg-navy text-white px-6 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <Icon name="User" size={18} className="text-sky-300" />
                  <span className="font-bold text-base md:text-lg">Тюриков Елисей Андреевич</span>
                </div>
                <span className="text-sky-300 text-sm font-medium">студент группы ПР-25</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { icon: "BookOpen", text: "Изучить теории влияния полей на биопроцессы" },
                { icon: "FlaskConical", text: "Провести лабораторные опыты с растениями и микробами" },
                { icon: "BarChart2", text: "Проанализировать данные и оценить риски" },
                { icon: "Shield", text: "Сформировать рекомендации по защите" },
              ].map((goal, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-4 flex gap-3 items-start shadow-sm hover:border-navy transition-colors"
                >
                  <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={goal.icon} size={18} className="text-white" />
                  </div>
                  <p className="text-gray-800 text-sm font-semibold leading-snug pt-1">{goal.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => scrollTo("theory")}
                className="inline-flex flex-col items-center gap-1 text-gray-500 hover:text-navy transition-colors"
              >
                <span className="text-sm font-medium">Перейти к исследованию</span>
                <Icon name="ChevronDown" size={24} className="animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* THEORY */}
      <section
        id="theory"
        ref={(el) => {
          sectionRefs.current["theory"] = el;
        }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            icon="BookOpen"
            label="Раздел 1"
            title="Теоретические основы"
            subtitle="Существующие научные теории о влиянии магнитных полей на биологические процессы"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THEORY_CARDS.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-navy transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center mb-4 group-hover:bg-sky-600 transition-colors">
                  <Icon name={card.icon} size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg mb-2">{card.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-3xl border-2 border-gray-100 p-8">
            <h3 className="font-display font-bold text-navy text-xl mb-6 flex items-center gap-2">
              <Icon name="Layers" size={22} className="text-sky-600" />
              Классификация магнитных полей
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Постоянные",
                  desc: "Геомагнитное поле Земли (~50 мкТл), неодимовые магниты, МРТ-аппараты",
                  range: "0.05 мкТл — 10 Тл",
                },
                {
                  name: "Переменные",
                  desc: "ЛЭП, бытовая электросеть (50 Гц), трансформаторы, электродвигатели",
                  range: "50 нТл — 10 мТл",
                },
                {
                  name: "Импульсные",
                  desc: "Молнии, медицинские процедуры (ТМС), радарные установки",
                  range: "Пиковые до 100 Тл",
                },
              ].map((type, i) => (
                <div key={i} className="border-l-4 border-navy pl-4">
                  <h4 className="font-bold text-navy text-base mb-1">{type.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="inline-block bg-navy/10 text-navy text-xs font-bold px-2 py-1 rounded-lg">
                    {type.range}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ANALYSIS */}
      <section
        id="analysis"
        ref={(el) => {
          sectionRefs.current["analysis"] = el;
        }}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            icon="FlaskConical"
            label="Раздел 2"
            title="Лабораторные опыты и анализ"
            subtitle="Результаты экспериментов по оценке влияния магнитных полей на рост растений и активность микроорганизмов"
          />

          <div
            className="bg-navy rounded-3xl p-8 mb-10 text-white cursor-pointer hover:ring-2 hover:ring-sky-400 transition-all group"
            onClick={() => setVideoOpen(true)}
          >
            <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <Icon name="ClipboardList" size={20} className="text-sky-300" />
              Методология исследования
              <span className="ml-auto flex items-center gap-1.5 text-sm bg-sky-500/20 hover:bg-sky-500/40 transition-colors px-3 py-1 rounded-full">
                <Icon name="Play" size={14} className="text-sky-300" />
                <span className="text-sky-200 font-medium">Смотреть видео</span>
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "Magnet",
                  title: "Оборудование",
                  text: "Неодимовые магниты (10–100 мТл), катушки Гельмгольца, тесламетр. Контрольные и опытные группы в идентичных условиях.",
                },
                {
                  icon: "Sprout",
                  title: "Объекты",
                  text: "Семена пшеницы и редиса, культуры E. coli, зелёные водоросли Chlorella vulgaris.",
                },
                {
                  icon: "Timer",
                  title: "Длительность",
                  text: "Серия опытов продолжительностью от 24 часов до 14 суток. Повторность — 3 независимых серии.",
                },
              ].map((m, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={m.icon} size={18} className="text-sky-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{m.title}</h4>
                    <p className="text-sky-100 text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 mb-10 border-2 border-gray-100">
            <h3 className="font-display font-bold text-navy text-xl mb-2 flex items-center gap-2">
              <Icon name="BarChart2" size={20} className="text-sky-600" />
              Сравнительные результаты опытов
            </h3>
            <p className="text-gray-500 text-sm mb-6">Контрольная группа vs. группа в магнитном поле</p>
            <BarChart data={EXPERIMENTS} />
            <div className="flex gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-navy" />
                <span className="text-sm text-gray-700 font-medium">Контрольная группа</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-sky-500" />
                <span className="text-sm text-gray-700 font-medium">Опытная группа (в поле)</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-navy text-xl mb-6 flex items-center gap-2">
              <Icon name="AlertTriangle" size={22} className="text-amber-500" />
              Уровни риска для здоровья человека
            </h3>
            <div className="space-y-4">
              {RISKS.map((risk, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-4 items-start bg-white border-2 rounded-2xl p-5"
                  style={{ borderColor: risk.color + "40" }}
                >
                  <div
                    className="shrink-0 text-center py-1.5 px-4 rounded-xl font-bold text-white text-sm"
                    style={{ background: risk.color }}
                  >
                    {risk.level}
                  </div>
                  <p className="text-gray-800 text-sm md:text-base leading-relaxed">{risk.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section
        id="recommendations"
        ref={(el) => {
          sectionRefs.current["recommendations"] = el;
        }}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            icon="Shield"
            label="Раздел 3"
            title="Рекомендации"
            subtitle="Меры по снижению потенциально вредного воздействия магнитных полей"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: "Home",
                title: "В быту",
                color: "#0ea5e9",
                items: [
                  "Держать спальное место на расстоянии >1 м от электроприборов",
                  "Не использовать мобильный телефон непосредственно перед сном",
                  "Отдавать предпочтение LED-освещению вместо трансформаторных систем",
                  "Регулярно проветривать помещения — снижает напряжённость поля",
                ],
              },
              {
                icon: "Building2",
                title: "На производстве",
                color: "#1e3a5f",
                items: [
                  "Соблюдать нормы СанПиН 2.2.4.3359-16 по ЭМП на рабочих местах",
                  "Использовать экранирующие материалы (пермаллой, электротехническая сталь)",
                  "Ограничивать время работы вблизи мощных источников поля",
                  "Проводить медицинские осмотры сотрудников зон воздействия",
                ],
              },
              {
                icon: "Sprout",
                title: "Для агрохозяйств",
                color: "#16a34a",
                items: [
                  "Применять предпосевную обработку семян полем 30–50 мТл для стимуляции роста",
                  "Учитывать близость к ЛЭП при выборе сельскохозяйственных угодий",
                  "Мониторить урожайность культур вблизи трансформаторных подстанций",
                ],
              },
              {
                icon: "GraduationCap",
                title: "В образовании",
                color: "#7c3aed",
                items: [
                  "Включить основы биоэлектромагнетизма в курс физики и биологии",
                  "Оборудовать учебные классы заземлёнными экранами компьютерного излучения",
                  "Проводить профилактические беседы о рисках ЭМП для школьников",
                ],
              },
            ].map((rec, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ background: rec.color }}
                  >
                    <Icon name={rec.icon} size={18} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-lg">{rec.title}</h3>
                </div>
                <ul className="space-y-2">
                  {rec.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-700">
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                        style={{ background: rec.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-navy rounded-3xl p-8 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-500/20 rounded-2xl flex items-center justify-center shrink-0">
                <Icon name="Lightbulb" size={24} className="text-sky-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-3">Вывод исследования</h3>
                <p className="text-sky-100 leading-relaxed text-base">
                  Магнитные поля оказывают реальное и измеримое воздействие на живые организмы. Слабые
                  постоянные поля способны стимулировать биологические процессы, тогда как интенсивные
                  переменные поля несут риски для здоровья человека при хроническом воздействии.
                  Соблюдение действующих нормативов и простых правил безопасности позволяет существенно
                  снизить потенциальные вредные эффекты.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section
        id="contacts"
        ref={(el) => {
          sectionRefs.current["contacts"] = el;
        }}
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            icon="Mail"
            label="Контакты"
            title="Связаться с автором"
            subtitle="Вопросы по исследованию и сотрудничество"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-navy rounded-3xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center">
                  <Icon name="User" size={32} className="text-sky-300" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">Тюриков Елисей Андреевич</h3>
                  <p className="text-sky-200 text-sm">Автор исследования</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="GraduationCap" size={18} className="text-sky-300 shrink-0" />
                  <span className="text-sky-100 text-sm">Сибирский политехнический техникум</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Users" size={18} className="text-sky-300 shrink-0" />
                  <span className="text-sky-100 text-sm">Группа ПР-25</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="BookOpen" size={18} className="text-sky-300 shrink-0" />
                  <span className="text-sky-100 text-sm">Научно-исследовательский проект, 2026</span>
                </div>
                <a
                  href="mailto:turikovelisej7@gmail.com"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Icon name="Mail" size={18} className="text-sky-300 shrink-0" />
                  <span className="text-sky-100 text-sm">turikovelisej7@gmail.com</span>
                </a>
                <a
                  href="tel:+79134027189"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Icon name="Phone" size={18} className="text-sky-300 shrink-0" />
                  <span className="text-sky-100 text-sm">+7 913 402 71 89</span>
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100">
              <h3 className="font-display font-bold text-navy text-lg mb-5">Задать вопрос</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-navy transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Сообщение</label>
                  <textarea
                    placeholder="Ваш вопрос или предложение..."
                    rows={4}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-navy transition-colors resize-none"
                  />
                </div>
                <button className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-sky-700 transition-colors flex items-center justify-center gap-2">
                  <Icon name="Send" size={18} className="text-white" />
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden w-full max-w-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Icon name="Play" size={18} className="text-navy" />
                <span className="font-display font-bold text-navy">Воздействие магнитных полей на живые организмы</span>
              </div>
              <button
                onClick={() => setVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={16} className="text-gray-700" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Воздействие магнитных полей на живые организмы"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500 text-center">
              Нажмите вне окна или на ✕ чтобы закрыть
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-navy text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500/20 rounded-full flex items-center justify-center">
              <Icon name="Magnet" size={16} className="text-sky-300" />
            </div>
            <div>
              <p className="font-bold text-sm">Воздействие магнитных полей на живые организмы</p>
              <p className="text-sky-300 text-xs">Тюриков Елисей Андреевич © 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sky-200 text-xs">
            <Icon name="GraduationCap" size={14} className="text-sky-300" />
            <span>Сибирский политехнический техникум</span>
          </div>
        </div>
      </footer>
    </div>
  );
}