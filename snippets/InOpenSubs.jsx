export const InOpenSubs = ({ children }) => (
  <div
    className="not-prose my-4 p-4"
    style={{
      border: "3px solid #000",
      backgroundColor: "#FFF9C4",
      boxShadow: "3px 3px 0 0 #000",
    }}
  >
    <span
      className="inline-block px-2 py-0.5 text-xs font-extrabold uppercase mb-2"
      style={{ backgroundColor: "#FFDE00", border: "2px solid #000", color: "#000" }}
    >
      In opensubs
    </span>
    <div className="text-sm font-medium" style={{ color: "#000" }}>{children}</div>
  </div>
);
