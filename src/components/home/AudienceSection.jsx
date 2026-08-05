import { ScrollReveal } from "../shared/ScrollReveal";
import { BookDemoLink } from "../shared/CtaLink";
import { audienceGroups } from "../../lib/constants";

// Preserved from the previous landing page: same audience strip, same tag list, same
// primary CTA. Only the wrapping id (for nav anchoring) and CTA label are new.

function AudienceStrip() {
  return (
    <div className="flex flex-col items-center gap-7 text-center">
      <div>
        <div className="text-[0.72rem] uppercase tracking-[0.28em] text-textSecondary">Built for the desk</div>
      </div>
      <ul className="flex flex-wrap justify-center gap-2.5" aria-label="Who Kolmo is built for">
        {audienceGroups.map((group) => (
          <li
            key={group}
            className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-3 text-[0.72rem] uppercase tracking-[0.18em] text-textSecondary"
          >
            {group}
          </li>
        ))}
      </ul>
      <BookDemoLink size="md">Book a 30-minute demo</BookDemoLink>
    </div>
  );
}

export function AudienceSection() {
  return (
    <section id="audience" className="story-section story-section--audience" aria-label="Who Kolmo is for">
      <div className="story-section__inner story-section__inner--compact">
        <ScrollReveal>
          <AudienceStrip />
        </ScrollReveal>
      </div>
    </section>
  );
}
