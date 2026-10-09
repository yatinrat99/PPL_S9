import { Link } from "react-router-dom";
import MouseEffects from "./components/MouseEffects";
import Ticker from "./components/Ticker";
import Navbar from "./components/Navbar";
import PastWinners from "./components/PastWinners";
import "./styles.css";

export default function App() {
  return (
    <div className="site">
      <MouseEffects />
      <Navbar />
      <main className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-content">
          <div className="season-chip">
            <span>●</span> PPL • SEASON 9
          </div>
          <p className="kicker">THE BIGGEST PLAYER AUCTION</p>
          <h1>
            Park Premier
            <br />
            <em>League</em>
          </h1>
          <p className="hero-copy">
            Where players become legends.
            <br />
            Build your squad. Own the season.
          </p>
          <div className="hero-actions">
            <Link to="/auction" className="primary-btn">
              ENTER AUCTION <span>↗</span>
            </Link>
            <a href="#how" className="text-link">
              Explore Season 9 ↓
            </a>
          </div>
        </div>
        <div className="hero-art">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="trophy">🏆</div>
          <div className="bat">🏏</div>
          <div className="ball">●</div>
          <div className="art-card">
            <span>LIVE</span>
            <b>PPL S9</b>
            <small>PLAYER AUCTION</small>
          </div>
        </div>
      </main>
      <Ticker />
      <section id="how" className="section reveal-grid">
        <div>
          <p className="eyebrow">SEASON 09</p>
          <h2>
            One league.
            <br />
            <span>Unlimited moments.</span>
          </h2>
        </div>
        <div className="feature-list">
          <article>
            <b>01</b>
            <div>
              <h3>Pick your player</h3>
              <p>
                Explore every category and reveal the next name in your squad.
              </p>
            </div>
          </article>
          <article>
            <b>02</b>
            <div>
              <h3>Raise the bid</h3>
              <p>
                Compete with confidence and push the live auction price higher.
              </p>
            </div>
          </article>
          <article>
            <b>03</b>
            <div>
              <h3>Make it official</h3>
              <p>
                Close the deal, celebrate the SOLD moment and build your VIII.
              </p>
            </div>
          </article>
        </div>
      </section>
      <PastWinners />
      <footer>
        <span>PPL S9</span>
        <span>CRICKET AUCTION • SEASON 9</span>
      </footer>
    </div>
  );
}
