import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import RadarChart from '../components/RadarChart';
import './Home.css';

const USER = {
  name: 'Marc Solà',
  level: 2,
  focus: 'Dreta',
  streak: 4,
  trainings: 12,
  record: { w: 3, l: 1 },
};

const SKILLS = [
  { label: 'Servei',   value: 60 },
  { label: 'Dreta',    value: 80 },
  { label: 'Tenis IQ', value: 55 },
  { label: 'Volea',    value: 30 },
  { label: 'Revés',    value: 45 },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <main className="page-scroll home-page">

        {/* ── Header ──────────────────────────────── */}
        <header className="home-header">
          <CourtLines />
          <div className="home-header-top">
            <div>
              <p className="home-greeting">Bon dia, jugador</p>
              <h1 className="home-name">{USER.name.toUpperCase()}</h1>
            </div>
            <div className="home-avatar" aria-label="Perfil">
              {USER.name.split(' ').map(w => w[0]).join('')}
            </div>
          </div>
          <div className="home-badges">
            <span className="badge badge-level">Nivell {USER.level}</span>
            <span className="badge badge-focus">● {USER.focus}</span>
            <span className="badge badge-streak">🔥 {USER.streak} dies</span>
          </div>
        </header>

        <div className="home-body">

          {/* ── Train Now CTA ───────────────────── */}
          <button className="train-cta" onClick={() => navigate('/training')}>
            <div className="train-cta-left">
              <TennisBallIcon />
              <div>
                <div className="train-cta-title">ENTRENAR ARA</div>
                <div className="train-cta-sub">Avui: {USER.focus} · Nivell {USER.level}</div>
              </div>
            </div>
            <div className="train-cta-arrow">→</div>
          </button>

          {/* ── Stats row ───────────────────────── */}
          <div className="stats-row">
            <StatCard num={USER.trainings} label="Entrenaments" />
            <StatCard num={`${USER.record.w}W`} label="Victòries" color="var(--court)" />
            <StatCard num={`${USER.record.l}L`} label="Derrotes" color="var(--danger)" />
          </div>

          {/* ── Radar ───────────────────────────── */}
          <section className="card home-radar-card">
            <p className="section-label">Les teves habilitats</p>
            <RadarChart skills={SKILLS} size={240} />
            <div className="radar-legend">
              {SKILLS.map(s => (
                <div key={s.label} className="legend-item">
                  <span className="legend-dot" />
                  <span>{s.label}</span>
                  <span className="legend-val">{s.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Next match prompt ───────────────── */}
          <button className="match-prompt" onClick={() => navigate('/social')}>
            <span className="match-prompt-icon">🎾</span>
            <div>
              <div className="match-prompt-title">Reptar un amic</div>
              <div className="match-prompt-sub">Joan Vidal vol jugar</div>
            </div>
            <span className="match-prompt-badge">NOU</span>
          </button>

        </div>
      </main>
      <BottomNav />
    </div>
  );
}

function StatCard({ num, label, color }) {
  return (
    <div className="stat-card card">
      <div className="stat-num" style={color ? { color } : {}}>{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function TennisBallIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="var(--ball)" />
      <path d="M6 10.5C10 12 12 16 10.5 22M30 13.5C26 15 24 19 25.5 25"
        stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CourtLines() {
  return (
    <svg className="court-bg home-court-bg" viewBox="0 0 430 180" fill="none">
      <rect x="20" y="10" width="390" height="160" stroke="white" strokeWidth="2"/>
      <line x1="215" y1="10" x2="215" y2="170" stroke="white" strokeWidth="1.5"/>
      <rect x="70" y="10" width="290" height="110" stroke="white" strokeWidth="1.5"/>
      <line x1="20" y1="90" x2="410" y2="90" stroke="white" strokeWidth="2"/>
    </svg>
  );
}
