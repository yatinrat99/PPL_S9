import { winners } from "../data/players";

export default function PastWinners() {
  return (
    <section className="winners-section" id="past-winners">
      <div className="winners-heading">
        <div>
          <p className="eyebrow">THE LEGACY</p>
          <h2>Past <span>Winners.</span></h2>
          <p className="winners-subtitle">Eight seasons. Eight champions. One PPL legacy.</p>
        </div>
        <div className="winners-scroll-hint">SCROLL TO EXPLORE <span>↓</span></div>
      </div>

      <div className="winners-timeline">
        {winners.map((winner, index) => (
          <article className="winner-card" key={winner.season} style={{ "--winner-delay": `${index * 50}ms` }}>
            <div className="winner-season">
              <span>SEASON</span>
              <strong>{winner.season}</strong>
            </div>
            <div className="winner-photo-wrap">
              <div className="winner-glow" />
              <img src={winner.image} alt={`${winner.name} - PPL Season ${winner.season} winner`} />
              <span className="winner-trophy">🏆</span>
            </div>
            <div className="winner-info">
              <span className="winner-label">PPL CHAMPION</span>
              <h3>{winner.name}</h3>
              <p>{winner.team}</p>
              <div className="winner-line" />
              <span className="winner-year">SEASON {winner.season} • CHAMPION</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
