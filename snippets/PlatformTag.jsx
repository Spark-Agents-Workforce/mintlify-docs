export const PlatformTag = ({ platform = "any" }) => {
  // "Works on any platform" was on ~every page — ubiquity made it noise, so it
  // renders nothing (JD, 2026-07-07). The tag stays in page source as metadata,
  // and the OpenSubs-specific badge still renders where it genuinely signals.
  if (platform !== "opensubs") return null;
  return (
    <span
      className="os-sticker inline-block px-2 py-0.5 text-xs not-prose"
      style={{ backgroundColor: "#FFDE00", color: "#000" }}
    >
      OpenSubs platform
    </span>
  );
};
