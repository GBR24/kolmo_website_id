export function CookieBanner({ onAccept, onDecline }) {
  return (
    <div
      role="region"
      aria-label="Privacy notice"
      className="fixed inset-x-4 bottom-4 z-[65] mx-auto w-full max-w-[760px] rounded-[1.25rem] border border-white/10 bg-[rgba(7,12,18,0.94)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:inset-x-6 sm:p-4"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <div className="text-[0.66rem] uppercase tracking-[0.2em] text-textSecondary">Privacy notice</div>
          <p className="mt-1.5 text-[0.92rem] leading-6 text-textSecondary">
            We use optional Google Analytics cookies to understand visits, countries, referral sources, and the pages
            people engage with. You can accept or decline analytics cookies, and you can change this choice later from
            the footer.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onDecline}
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-4 py-2.5 text-[0.82rem] tracking-[0.1em] text-textSecondary transition hover:border-white/16 hover:text-textPrimary"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-[0.82rem] tracking-[0.1em] text-textPrimary transition hover:border-white/18 hover:bg-white/[0.09]"
          >
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
