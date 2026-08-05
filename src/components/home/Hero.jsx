import kolmoMark from "../../../assets/kolmo-mark.svg";
import { ScrollReveal } from "../shared/ScrollReveal";

// Preserved from the previous landing page: brand mark, tagline, and the ambient
// signal-field visual. Content, animation, and layout are intentionally unchanged —
// this is the identity the rest of the page is built to continue.

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="minimal-atmosphere__wash" />
      <div className="minimal-atmosphere__line minimal-atmosphere__line--one" />
      <div className="minimal-atmosphere__line minimal-atmosphere__line--two" />
      <div className="minimal-atmosphere__point minimal-atmosphere__point--one" />
      <div className="minimal-atmosphere__point minimal-atmosphere__point--two" />
    </div>
  );
}

function HeroBrandMark() {
  return (
    <div className="hero-brand-lockup">
      <div className="hero-brand-core" aria-hidden="true">
        <svg className="hero-brand-core__field" viewBox="0 0 512 512" fill="none">
          <defs>
            <linearGradient id="kolmoHeroBlue" x1="64" y1="68" x2="448" y2="444" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EDF3F8" stopOpacity="0.84" />
              <stop offset="0.42" stopColor="#4DA3FF" stopOpacity="0.72" />
              <stop offset="1" stopColor="#D29922" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="kolmoHeroQuiet" x1="102" y1="78" x2="410" y2="430" gradientUnits="userSpaceOnUse">
              <stop stopColor="#EDF3F8" stopOpacity="0.5" />
              <stop offset="1" stopColor="#4DA3FF" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          <path className="hero-brand-core__trace hero-brand-core__trace--outer" d="M256 28L454 142V370L256 484L58 370V142L256 28Z" stroke="url(#kolmoHeroBlue)" />
          <path className="hero-brand-core__trace hero-brand-core__trace--middle" d="M256 74L414 165V347L256 438L98 347V165L256 74Z" stroke="url(#kolmoHeroQuiet)" />
          <path className="hero-brand-core__trace hero-brand-core__trace--inner" d="M256 132L364 194V318L256 380L148 318V194L256 132Z" stroke="#EDF3F8" />
          <path className="hero-brand-core__link hero-brand-core__link--one" d="M128 302C174 266 215 248 256 248C304 248 342 221 384 168" />
          <path className="hero-brand-core__link hero-brand-core__link--two" d="M152 172C194 204 226 232 248 256C278 289 315 312 366 326" />
          <circle className="hero-brand-core__node hero-brand-core__node--one" cx="128" cy="302" r="4" />
          <circle className="hero-brand-core__node hero-brand-core__node--two" cx="384" cy="168" r="4" />
          <circle className="hero-brand-core__node hero-brand-core__node--three" cx="366" cy="326" r="3.5" />
        </svg>

        <div className="hero-brand-core__plate">
          <img src={kolmoMark} alt="" className="hero-brand-core__mark" />
        </div>
      </div>

      <h1 className="hero-brand-lockup__name">Kolmo</h1>
      <div className="max-w-[34rem] text-center">
        <h2 className="text-balance text-2xl font-medium leading-[1.15] text-textPrimary sm:text-[2rem] lg:text-[2.5rem]">
          The AI operating system for energy markets
        </h2>
      </div>
    </div>
  );
}

function HeroSignalField() {
  return (
    <div className="pointer-events-none relative hidden min-h-[28rem] lg:block" aria-hidden="true">
      <div className="absolute left-[12%] top-[18%] h-px w-[68%] bg-[linear-gradient(90deg,transparent,rgba(214,226,240,0.22),transparent)]" />
      <div className="absolute right-[10%] top-[36%] h-px w-[46%] bg-[linear-gradient(90deg,transparent,rgba(77,163,255,0.18),transparent)]" />
      <div className="absolute bottom-[28%] left-[20%] h-px w-[54%] bg-[linear-gradient(90deg,transparent,rgba(210,153,34,0.16),transparent)]" />

      <div className="absolute left-[24%] top-[17%] h-2 w-2 rounded-full bg-[#d6e2f0] shadow-[0_0_24px_rgba(214,226,240,0.42)]" />
      <div className="absolute right-[22%] top-[35%] h-1.5 w-1.5 rounded-full bg-[#4da3ff] shadow-[0_0_24px_rgba(77,163,255,0.48)]" />
      <div className="absolute bottom-[27%] left-[55%] h-1.5 w-1.5 rounded-full bg-[#d29922] shadow-[0_0_24px_rgba(210,153,34,0.4)]" />

      <div className="absolute right-[7%] top-[12%] max-w-[16rem] border-l border-white/10 pl-4 text-[0.64rem] uppercase leading-6 tracking-[0.2em] text-textSecondary">
        <span className="block text-textPrimary">06:13 UTC</span>
        <span>Market signals begin to move before the explanation arrives.</span>
      </div>
      <div className="absolute bottom-[16%] left-[8%] max-w-[18rem] border-l border-[#4da3ff]/30 pl-4 text-[0.64rem] uppercase leading-6 tracking-[0.2em] text-textSecondary">
        <span className="block text-[#4da3ff]">Kolmo agents armed</span>
        <span>A swarm built for continuous market surveillance.</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-stage story-section story-section--hero relative overflow-hidden">
      <div className="story-section__inner story-section__inner--hero">
        <HeroAtmosphere />

        <div className="relative mx-auto grid w-full max-w-[1280px] gap-10 lg:min-h-[34rem] lg:grid-cols-[minmax(0,0.76fr)_minmax(440px,1.24fr)] lg:items-center lg:gap-16 lg:pt-2">
          <ScrollReveal className="w-full min-w-0 max-w-[40rem]">
            <HeroBrandMark />
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <HeroSignalField />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export { HeroAtmosphere };
