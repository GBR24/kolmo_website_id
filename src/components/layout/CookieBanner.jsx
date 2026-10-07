export function CookieBanner({ onAccept, onDecline }) {
  return <div className="cookie-notice" role="region" aria-label="Privacy notice"><p>We use optional analytics to understand how people use Kolmo. Your choice is always yours.</p><div><button type="button" onClick={onDecline}>Decline</button><button type="button" onClick={onAccept}>Accept analytics <span aria-hidden="true">↗</span></button></div></div>;
}
