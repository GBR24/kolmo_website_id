import { NEWSLETTER_EMBED_URL } from "../../lib/constants";

function NewsletterEmbed() {
  return (
    <iframe
      src={NEWSLETTER_EMBED_URL}
      data-test-id="beehiiv-embed"
      title="Kolmo newsletter signup"
      width="100%"
      height="250"
      frameBorder="0"
      scrolling="no"
      style={{
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        margin: 0,
        backgroundColor: "transparent",
      }}
    />
  );
}

function NewsletterFallback() {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.02)] p-4">
      <div className="text-[0.72rem] uppercase tracking-[0.22em] text-textSecondary">Newsletter signup</div>
      <p className="mt-3 text-sm leading-7 text-textSecondary">
        Some mobile browsers block the embedded form. Open the secure subscribe page in a new tab to join Kolmo early
        access.
      </p>
      <div className="mt-5">
        <a
          href={NEWSLETTER_EMBED_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm tracking-[0.12em] text-textPrimary transition hover:border-white/18 hover:bg-white/[0.09]"
        >
          Open Subscribe Form
        </a>
      </div>
    </div>
  );
}

export function NewsletterModal({ isMobileFallback, onDismiss }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(3,7,11,0.72)] px-4 py-6 backdrop-blur-md">
      <div className="relative w-full max-w-[760px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,22,0.96),rgba(7,12,18,0.98))] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.42)] sm:p-6">
        <button
          type="button"
          onClick={onDismiss}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-textSecondary transition hover:border-white/18 hover:text-textPrimary"
          aria-label="Dismiss early access signup"
        >
          ×
        </button>

        <div className="mx-auto max-w-2xl px-4 text-center">
          <h3 className="font-serif-display text-3xl leading-[0.98] text-textPrimary sm:text-[2.5rem]">
            Join Kolmo early access.
          </h3>
          <p className="mt-4 text-base leading-8 text-textSecondary">
            Receive periodic notes on energy market structure, risk, and what Kolmo is building — and early access
            invitations as new workspaces open up.
          </p>
        </div>

        <div className="mt-6">
          {isMobileFallback ? (
            <NewsletterFallback />
          ) : (
            <div className="rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.02)] p-3 sm:p-4">
              <NewsletterEmbed />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <span className="text-sm leading-7 text-textSecondary">Dismiss once and it will not appear automatically again on this browser.</span>
          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2.5 text-sm tracking-[0.12em] text-textSecondary transition hover:border-white/16 hover:text-textPrimary"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
