export const InOpenSubs = ({ children }) => (
  <div className="not-prose my-4 p-4" style={{ backgroundColor: "var(--nh2-well-pie)", borderRadius: "20px" }}>
    <span className="os-chip mb-2">IN OPENSUBS</span>
    <div className="text-sm" style={{ color: "var(--nh2-ink)", fontWeight: 435, lineHeight: 1.6 }}>
      {children}
    </div>
  </div>
);
