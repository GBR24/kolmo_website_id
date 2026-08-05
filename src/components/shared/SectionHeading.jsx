export function SectionHeading({ eyebrow, title, body, align = "left", titleAs: TitleTag = "h2" }) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? <span className="text-[0.64rem] uppercase tracking-[0.24em] text-textSecondary">{eyebrow}</span> : null}
      {title ? (
        <TitleTag className="max-w-4xl text-balance text-2xl font-medium leading-[1.1] text-textPrimary sm:text-3xl lg:text-[2.65rem]">
          {title}
        </TitleTag>
      ) : null}
      {body ? <p className="max-w-2xl text-pretty text-[0.92rem] leading-7 text-textSecondary sm:text-[0.96rem]">{body}</p> : null}
    </div>
  );
}
