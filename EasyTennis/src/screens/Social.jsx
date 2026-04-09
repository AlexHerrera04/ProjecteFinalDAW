import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import './Social.css';

const ME = { id: 'me', initials: 'MS', name: 'Marc Solà', level: 2, w: 3, l: 1, pts: 11, color: '#2E7D4F', bg: '#EDF7F1' };

const FRIENDS = [
  { id: 'jv', initials: 'JV', name: 'Joan Vidal', level: 3, w: 5, l: 2, pts: 14, color: '#1A4D30', bg: '#D4EDDA' },
  { id: 'lg', initials: 'LG', name: 'Laia Gomà',  level: 2, w: 3, l: 3, pts: 8,  color: '#854F0B', bg: '#FEF3C7' },
  { id: 'pr', initials: 'PR', name: 'Pau Riba',   level: 2, w: 1, l: 4, pts: 7,  color: '#1E40AF', bg: '#DBEAFE' },
];

const RANKING = [ME, ...FRIENDS].sort((a, b) => b.pts - a.pts);

export default function Social() {
  const [tab, setTab]           = useState('amics'); // 'amics' | 'lliga'
  const [showModal, setShowModal] = useState(null);  // friend id
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="app-shell">
      <main className="page-scroll social-page">

        {/* ── Header ──────────────────────────────── */}
        <header className="social-header">
          <h1 className="social-title">SOCIAL</h1>
          <div className="tab-strip">
            {['amics', 'lliga'].map(t => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? 'tab-active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t === 'amics' ? 'Amics' : 'Lliga'}
              </button>
            ))}
          </div>
        </header>

        {/* ── Amics tab ───────────────────────────── */}
        {tab === 'amics' && (
          <div className="social-body">
            <p className="section-label">{FRIENDS.length} amics · tots al nivell mínim</p>

            {FRIENDS.map(f => (
              <div key={f.id} className="friend-card card">
                <div className="friend-avatar" style={{ background: f.bg, color: f.color }}>
                  {f.initials}
                </div>
                <div className="friend-info">
                  <div className="friend-name">{f.name}</div>
                  <div className="friend-meta">Nivell {f.level} · {f.w}V {f.l}D</div>
                </div>
                <div className="friend-actions">
                  <button className="btn-secondary friend-btn" onClick={() => setShowModal(f.id)}>
                    Perfil
                  </button>
                  <button className="btn-accent friend-btn">Retar</button>
                </div>
              </div>
            ))}

            <button className="add-friend-btn">
              <div className="add-friend-plus">+</div>
              <span>Afegir un amic nou</span>
            </button>
          </div>
        )}

        {/* ── Lliga tab ───────────────────────────── */}
        {tab === 'lliga' && (
          <div className="social-body">
            <div className="lliga-card card">
              <div className="lliga-header">
                <span className="lliga-trophy">🏆</span>
                <div>
                  <div className="lliga-title">LLIGA DELS AMICS</div>
                  <div className="lliga-sub">Temporada · Abril 2026</div>
                </div>
              </div>

              <div className="ranking-list">
                {RANKING.map((p, i) => (
                  <RankingRow key={p.id} player={p} pos={i + 1} isMe={p.id === 'me'} />
                ))}
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => setShowResult(true)}
            >
              + REGISTRAR RESULTAT
            </button>

            <div className="lliga-info">
              <InfoItem icon="🎾" text="3 punts per victòria · 1 per derrota · 0 per no jugar" />
              <InfoItem icon="📅" text="La lliga es reinicia cada mes" />
              <InfoItem icon="✅" text="L'adversari ha de confirmar el resultat" />
            </div>
          </div>
        )}
      </main>

      {/* ── Modals ──────────────────────────────────── */}
      {showModal && (
        <FriendModal
          friend={FRIENDS.find(f => f.id === showModal)}
          onClose={() => setShowModal(null)}
        />
      )}

      {showResult && (
        <ResultModal onClose={() => setShowResult(false)} />
      )}

      <BottomNav />
    </div>
  );
}

/* ── Ranking row ─────────────────────────────────────── */
function RankingRow({ player, pos, isMe }) {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' };
  return (
    <div className={`rank-row ${isMe ? 'rank-me' : ''}`}>
      <div className="rank-pos">{medals[pos] || pos}</div>
      <div className="rank-avatar" style={{ background: player.bg, color: player.color }}>
        {player.initials}
      </div>
      <div className="rank-info">
        <div className="rank-name">{isMe ? `${player.name} (tu)` : player.name}</div>
        <div className="rank-record">{player.w}V · {player.l}D</div>
      </div>
      <div className="rank-pts">
        <span className="rank-pts-num">{player.pts}</span>
        <span className="rank-pts-label">pt</span>
      </div>
    </div>
  );
}

/* ── Friend profile modal ────────────────────────────── */
function FriendModal({ friend, onClose }) {
  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="drawer-handle" />
        <div className="modal-avatar" style={{ background: friend.bg, color: friend.color }}>
          {friend.initials}
        </div>
        <h2 className="modal-name">{friend.name}</h2>
        <p className="modal-level">Nivell {friend.level}</p>
        <div className="modal-stats">
          <ModalStat num={friend.w} label="Victòries" color="var(--court)" />
          <ModalStat num={friend.l} label="Derrotes" color="var(--danger)" />
          <ModalStat num={friend.pts} label="Punts" />
        </div>
        <button className="btn-accent" style={{ width: '100%', padding: '14px' }}>
          🎾 Retar a un partit
        </button>
        <button className="modal-close" onClick={onClose}>Tancar</button>
      </div>
    </>
  );
}

function ModalStat({ num, label, color }) {
  return (
    <div className="modal-stat">
      <div className="modal-stat-num" style={color ? { color } : {}}>{num}</div>
      <div className="modal-stat-label">{label}</div>
    </div>
  );
}

/* ── Result entry modal ──────────────────────────────── */
function ResultModal({ onClose }) {
  const [sets, setSets] = useState([{ me: '', opp: '' }]);
  const [opponent, setOpponent] = useState('jv');

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <div className="drawer-handle" />
        <h2 className="result-title">REGISTRAR RESULTAT</h2>

        <div className="result-field">
          <label className="auth-field-label">Adversari</label>
          <select value={opponent} onChange={e => setOpponent(e.target.value)} className="result-select">
            {FRIENDS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>

        <div className="result-sets">
          <p className="section-label">Sets</p>
          {sets.map((s, i) => (
            <div key={i} className="set-row">
              <span className="set-label">Set {i + 1}</span>
              <input
                type="number" min="0" max="7" placeholder="Tu"
                value={s.me}
                onChange={e => setSets(prev => prev.map((ss, si) => si === i ? { ...ss, me: e.target.value } : ss))}
                className="set-input"
              />
              <span className="set-dash">–</span>
              <input
                type="number" min="0" max="7" placeholder="Ell/Ella"
                value={s.opp}
                onChange={e => setSets(prev => prev.map((ss, si) => si === i ? { ...ss, opp: e.target.value } : ss))}
                className="set-input"
              />
            </div>
          ))}
          {sets.length < 3 && (
            <button className="add-set-btn" onClick={() => setSets(p => [...p, { me: '', opp: '' }])}>
              + Afegir set
            </button>
          )}
        </div>

        <button className="btn-primary" onClick={onClose}>ENVIAR RESULTAT</button>
        <p className="result-note">L'adversari haurà de confirmar el resultat</p>
      </div>
    </>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="info-item">
      <span>{icon}</span>
      <p>{text}</p>
    </div>
  );
}
