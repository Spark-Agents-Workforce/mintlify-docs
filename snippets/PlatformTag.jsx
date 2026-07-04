export const PlatformTag = ({ platform = "any" }) => (
  <span
    className={`os-sticker inline-block px-2 py-0.5 text-xs not-prose ${
      platform === "opensubs" ? "" : "os-sticker-alt"
    }`}
    style={{
      backgroundColor: platform === "opensubs" ? "#FFDE00" : "#C5F542",
      color: "#000",
    }}
  >
    {platform === "opensubs" ? "OpenSubs platform" : "Works on any platform"}
  </span>
);
