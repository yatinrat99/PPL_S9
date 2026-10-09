import { useEffect } from "react";

export default function TeamSquadModal({ team, sales, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const players = sales.filter((s) => s.team === team);
  const spent = players.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const balance = Math.max(0, 3000 - spent);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="team-squad-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <p className="eyebrow">TEAM SQUAD • LIVE</p>
        <h2>{team}</h2>
        <div className="squad-summary">
          <div><small>PLAYERS</small><strong>{players.length}</strong></div>
          <div><small>SPENT</small><strong>₹{spent.toLocaleString("en-IN")}</strong></div>
          <div><small>BALANCE</small><strong>₹{balance.toLocaleString("en-IN")}</strong></div>
        </div>
        {players.length === 0 ? (
          <div className="empty">या team ने अजून कोणताही player घेतलेला नाही.</div>
        ) : (
          <div className="squad-list">
            {players.map((p, i) => (
              <div className="squad-row" key={`${p.playerId}-${i}`}>
                <span className="sale-no">{String(i + 1).padStart(2, "0")}</span>
                <div><strong>{p.name}</strong><small>{p.category}</small></div>
                <b>₹{Number(p.price).toLocaleString("en-IN")}</b>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
