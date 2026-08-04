export const InOpenSubs = ({ children }) => (
  <div className="not-prose my-4 p-5" style={{ backgroundColor: "var(--nh2-well-pie)", borderRadius: "20px" }}>
    <span className="os-chip mb-2">IN OPENSUBS</span>
    <div style={{ color: "var(--nh2-ink)", fontSize: "17px", fontWeight: 435, lineHeight: 1.7 }}>
      {children}
    </div>
  </div>
);
