import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import './Training.css';

const MODULES = [
  {
    id: 'dreta',
    label: 'Dreta',
    color: '#2E7D4F',
    exercises: [
      { id: 1, name: 'Grip continental',   meta: '15 repeticions',          status: 'done' },
      { id: 2, name: 'Swing bàsic',        meta: '20 repeticions',          status: 'done' },
      { id: 3, name: 'Dreta creuada',      meta: 'Vídeo · 3 punts clau',   status: 'active' },
      { id: 4, name: 'Dreta paral·lela',   meta: '20 repeticions',          status: 'locked' },
    ],
  },
  {
    id: 'servei',
    label: 'Servei',
    color: '#7E5CC8',
    exercises: [
      { id: 1, name: 'Llançament de pilota', meta: '10 minuts',             status: 'open' },
      { id: 2, name: 'Moviment de braç',     meta: 'Vídeo · 5 punts clau', status: 'locked' },
    ],
  },
  {
    id: 'reves',
    label: 'Revés',
    color: '#C06A2A',
    exercises: [
      { id: 1, name: 'Revés a dues mans', meta: 'Bloquejat · Acaba Servei', status: 'locked' },
    ],
  },
];

const total     = MODULES.flatMap(m => m.exercises).length;
const completed = MODULES.flatMap(m => m.exercises).filter(e => e.status === 'done').length;

export default function Training() {
  const [selected, setSelected] = useState(null); // { module, exercise }
  const [done, setDone]         = useState(['dreta-1', 'dreta-2']);

  const isDone = (mid, eid) => done.includes(`${mid}-${eid}`);

  const markDone = (mid, eid) => {
    const key = `${mid}-${eid}`;
    setDone(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    setSelected(null);
  };

  const completedCount = done.length;
  const pct = Math.round((completedCount / total) * 100);

  return (
    <div className="app-shell">
      <main className="page-scroll training-page">

        {/* ── Header ──────────────────────────────── */}
        <header className="training-header">
          <div className="training-header-top">
            <div>
              <h1 className="training-title">ENTRENAMENT</h1>
              <p className="training-sub">Nivell 2 · {completedCount}/{total} completats</p>
            </div>
            <div className="pct-ring" aria-label={`${pct}% completat`}>
              <svg viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4"/>
                <circle
                  cx="24" cy="24" r="20"
                  fill="none"
                  stroke="var(--ball)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - pct / 100)}`}
                  transform="rotate(-90 24 24)"
                />
                <text x="24" y="29" textAnchor="middle" fontSize="11" fontWeight="700"
                  fontFamily="DM Sans,sans-serif" fill="white">
                  {pct}%
                </text>
              </svg>
            </div>
          </div>

          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </header>

        {/* ── Module tabs ─────────────────────── */}
        <div className="module-list">
          {MODULES.map(mod => (
            <Module
              key={mod.id}
              mod={mod}
              selected={selected}
              onSelect={setSelected}
              isDone={isDone}
              onMarkDone={markDone}
            />
          ))}

          {/* Unlock teaser */}
          <div className="unlock-teaser">
            <div className="unlock-icon">🔓</div>
            <div className="unlock-text">
              <strong>Volea · Nivell 3</strong>
              <span>Completa {total - completedCount} exercicis més per desbloquejar</span>
            </div>
            <div className="unlock-bar-wrap">
              <div className="unlock-bar" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

      </main>

      {/* ── Exercise detail drawer ─────────────── */}
      {selected && (
        <ExerciseDrawer
          exercise={selected.exercise}
          modId={selected.modId}
          isDone={isDone(selected.modId, selected.exercise.id)}
          onClose={() => setSelected(null)}
          onMarkDone={() => markDone(selected.modId, selected.exercise.id)}
        />
      )}

      <BottomNav />
    </div>
  );
}

/* ── Module section ──────────────────────────────────── */
function Module({ mod, selected, onSelect, isDone, onMarkDone }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mod-section">
      <button className="mod-header" onClick={() => setOpen(o => !o)} style={{ '--mod-color': mod.color }}>
        <div className="mod-dot" />
        <span className="mod-label">{mod.label}</span>
        <span className="mod-count">
          {mod.exercises.filter(e => isDone(mod.id, e.id)).length}/{mod.exercises.length}
        </span>
        <span className="mod-chevron" style={{ transform: open ? 'rotate(180deg)' : 'none' }}>▾</span>
      </button>

      {open && (
        <div className="mod-exercises">
          {mod.exercises.map((ex, idx) => {
            const done   = isDone(mod.id, ex.id);
            const locked = ex.status === 'locked';
            const active = selected?.exercise?.id === ex.id && selected?.modId === mod.id;

            return (
              <button
                key={ex.id}
                className={`ex-card ${done ? 'ex-done' : ''} ${locked ? 'ex-locked' : ''} ${active ? 'ex-active' : ''}`}
                onClick={() => !locked && onSelect({ modId: mod.id, exercise: ex })}
                disabled={locked}
                style={{ '--mod-color': mod.color, animationDelay: `${idx * 0.06}s` }}
              >
                <div className="ex-num">{done ? '✓' : ex.id}</div>
                <div className="ex-info">
                  <div className="ex-name">{ex.name}</div>
                  <div className="ex-meta">{done ? 'Completat' : ex.meta}</div>
                </div>
                <div className="ex-chevron">
                  {locked ? '🔒' : done ? '' : '▶'}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Exercise detail drawer ───────────────────────────── */
function ExerciseDrawer({ exercise, modId, isDone, onClose, onMarkDone }) {
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-handle" />
        <div className="drawer-header">
          <h2 className="drawer-title">{exercise.name.toUpperCase()}</h2>
          <p className="drawer-meta">{exercise.meta}</p>
        </div>

        {/* Fake video placeholder */}
        <div className="video-placeholder">
          <div className="play-btn">▶</div>
          <p>Vídeo explicatiu</p>
        </div>

        {/* Key points */}
        <div className="key-points">
          <p className="section-label">Punts clau</p>
          <KeyPoint num={1} text="Mantén el colze alt durant el seguiment" />
          <KeyPoint num={2} text="Gira els malucs abans de contactar la pilota" />
          <KeyPoint num={3} text="Pes al peu davanter en el moment de l'impacte" />
        </div>

        <button
          className={`btn-primary drawer-btn ${isDone ? 'drawer-btn-done' : ''}`}
          onClick={onMarkDone}
        >
          {isDone ? '✓ MARCAR COM PENDENT' : 'MARCAR COM COMPLETAT'}
        </button>
      </div>
    </>
  );
}

function KeyPoint({ num, text }) {
  return (
    <div className="key-point">
      <div className="kp-num">{num}</div>
      <p className="kp-text">{text}</p>
    </div>
  );
}
