/** Fixed, decorative backdrop: faint grid and two slow-moving glows. Hidden from assistive tech. */
export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div className="glow glow-a -left-[10vw] -top-[18vh] h-[48vh] w-[48vw] min-h-72 min-w-72" />
      <div className="glow glow-b -right-[12vw] top-[28vh] h-[42vh] w-[42vw] min-h-64 min-w-64" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,11,14,0.85)_100%)]" />
    </div>
  );
}
