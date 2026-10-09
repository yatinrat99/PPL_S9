import { useEffect, useMemo, useState } from "react";

export default function PlayerModal({
  player,
  bid,
  onBidChange,
  onClose,
  onSold,
  teams,
  teamBalance,
  teamHasCategory,
}) {
  const [team, setTeam] = useState(teams[0]);
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  const amount = Number(bid || 0);
  const available = Number(teamBalance[team] || 0);
  const alreadyHasGroup = teamHasCategory(team, player.category, player.id);
  const canAfford = amount > 0 && amount <= available;
  const eligible = canAfford && !alreadyHasGroup;
  const affordableTeams = useMemo(
    () =>
      teams.filter(
        (t) =>
          Number(teamBalance[t] || 0) >= amount &&
          !teamHasCategory(t, player.category, player.id),
      ),
    [teams, teamBalance, amount, teamHasCategory, player.category, player.id],
  );
  useEffect(() => {
    if (amount > 0 && !eligible) {
      const next = affordableTeams[0];
      if (next && next !== team) setTeam(next);
    }
  }, [amount, eligible, affordableTeams, team]);
  const changeBid = (v) => {
    const digits = String(v).replace(/[^0-9]/g, "");
    const next = digits === "" ? "" : Number(digits);
    onBidChange(next);
    setFlash(true);
    setError("");
    window.setTimeout(() => setFlash(false), 300);
  };
  const raise = () => {
    const next = amount + 10;
    const nextTeamBalance = Number(teamBalance[team] || 0);
    if (
      next > nextTeamBalance ||
      teamHasCategory(team, player.category, player.id)
    ) {
      setError(
        teamHasCategory(team, player.category, player.id)
          ? `${team} ने ${player.category} group मधून आधीच player घेतला आहे.`
          : `${team} कडे फक्त ₹${nextTeamBalance.toLocaleString("en-IN")} बाकी आहेत.`,
      );
      return;
    }
    changeBid(next);
  };
  const sell = () => {
    if (!eligible) {
      setError(
        alreadyHasGroup
          ? `${team} ने ${player.category} group मधून आधीच player घेतला आहे.`
          : `${team} कडे ₹${available.toLocaleString("en-IN")} बाकी आहेत. ₹${amount.toLocaleString("en-IN")} ला हा player घेता येणार नाही.`,
      );
      return;
    }
    const result = onSold(player.id, team, amount);
    if (!result?.ok) {
      setError(result?.reason || "SOLD करता आले नाही.");
      return;
    }
    setError("");
  };
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`auction-modal ${player.isSold ? "is-sold" : ""}`}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <div className="modal-topline">
          <span>PLAYER REVEAL</span>
          <span>{player.category} CATEGORY</span>
        </div>
        <div className="modal-grid">
          <div className="player-visual">
            <div className="visual-ring" />
            <img src={player.image} alt={player.name} />
            <span className="visual-badge">PPL S9</span>
          </div>
          <div className="player-info">
            <div className="eyebrow">
              LOT #{String(player.id.split("-")[1]).padStart(2, "0")}
            </div>
            <h2>{player.name}</h2>
            <div className="role-pill">{player.role}</div>
            <div className="stat-grid">
              <div>
                <small>फलंदाजी</small>
                <strong>{player.batting}</strong>
              </div>
              <div>
                <small>गोलंदाजी</small>
                <strong>{player.bowling}</strong>
              </div>
              <div>
                <small>BASE PRICE</small>
                <strong>₹{player.basePrice.toLocaleString("en-IN")}</strong>
              </div>
            </div>
            <div className={`bid-box ${flash ? "flash" : ""}`}>
              <div>
                <small>CURRENT BID — EDITABLE</small>
                <div className="bid-edit-row">
                  <span>₹</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    max={available || 3000}
                    value={bid ?? ""}
                    onChange={(e) => changeBid(e.target.value)}
                    disabled={player.isSold}
                  />
                </div>
              </div>
              <span>LIVE</span>
            </div>
            <div className="team-row">
              <label>Winning team</label>
              <select
                value={team}
                disabled={player.isSold}
                onChange={(e) => {
                  setTeam(e.target.value);
                  setError("");
                }}
              >
                {teams.map((t) => (
                  <option
                    key={t}
                    value={t}
                    disabled={
                      Number(teamBalance[t] || 0) < amount ||
                      teamHasCategory(t, player.category, player.id)
                    }
                  >
                    {t} — ₹{Number(teamBalance[t] || 0).toLocaleString("en-IN")}{" "}
                    बाकी
                    {teamHasCategory(t, player.category, player.id)
                      ? ` — ${player.category} घेतले आहे`
                      : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className={`purse-check ${eligible ? "ok" : "bad"}`}>
              {alreadyHasGroup
                ? `⚠ ${team} ने ${player.category} group मधून आधीच player घेतला आहे.`
                : canAfford
                  ? `✓ ${team} कडे हा bid घेण्यासाठी पुरेसा purse आहे.`
                  : `⚠ ${team} कडे फक्त ₹${available.toLocaleString("en-IN")} बाकी — ₹${amount.toLocaleString("en-IN")} bid जास्त आहे.`}
            </div>
            {error && <div className="auction-error">⚠ {error}</div>}
            {!player.isSold ? (
              <div className="action-row">
                <button
                  className="ghost-btn"
                  onClick={raise}
                  disabled={!eligible || amount + 10 > available}
                >
                  + ₹10 BID
                </button>
                <button
                  className="sold-btn"
                  disabled={!eligible}
                  onClick={sell}
                >
                  {eligible
                    ? `SOLD TO ${team.toUpperCase()} 🏆`
                    : alreadyHasGroup
                      ? `${player.category} ALREADY TAKEN`
                      : `PURSE EXCEEDED`}
                </button>
              </div>
            ) : (
              <div className="sold-banner">
                🏆 SOLD!{" "}
                <span>हा player आधीच auction मध्ये विकला गेला आहे.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
