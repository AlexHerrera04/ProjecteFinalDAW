import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const SURFACES = ['Terra batuda', 'Pista dura', 'Herba / Indoor'];
const EXPERIENCE = ['Cap (mai he jugat)', 'Poca (un parell de cops)', 'Mitja (jugo de tant en tant)'];
const HAND = ['Dreta', 'Esquerra'];

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('register'); // 'register' | 'login'
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    age: '', experience: '0', hand: '0', surface: '0',
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="auth-page">
      {/* Hero */}
      <div className="auth-hero">
        <CourtSVG />
        <div className="auth-ball">●</div>
        <h1 className="auth-logo">
          EASYTENNIS<span></span>
        </h1>
        <p className="auth-tagline">Your first swing, your new passion</p>
      </div>

      {/* Mode toggle */}
      <div className="auth-toggle-wrap">
        <div className="auth-toggle">
          <button
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
          >
            Crear compte
          </button>
          <button
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
          >
            Iniciar sessió
          </button>
        </div>
      </div>

      {/* Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <Field label="Nom complet">
              <input type="text" placeholder="Marc Solà" value={form.name} onChange={set('name')} required />
            </Field>
            <Field label="Edat">
              <input type="number" placeholder="22" min="10" max="99" value={form.age} onChange={set('age')} required />
            </Field>
            <div className="field-row">
              <Field label="Mà hàbil">
                <select value={form.hand} onChange={set('hand')}>
                  {HAND.map((h, i) => <option key={i} value={i}>{h}</option>)}
                </select>
              </Field>
              <Field label="Experiència">
                <select value={form.experience} onChange={set('experience')}>
                  {EXPERIENCE.map((ex, i) => <option key={i} value={i}>{ex}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Superfície preferida">
              <select value={form.surface} onChange={set('surface')}>
                {SURFACES.map((s, i) => <option key={i} value={i}>{s}</option>)}
              </select>
            </Field>
          </>
        )}

        <Field label="Correu electrònic">
          <input type="email" placeholder="correu@exemple.com" value={form.email} onChange={set('email')} required />
        </Field>
        <Field label="Contrasenya">
          <input type="password" placeholder="••••••••" value={form.password} onChange={set('password')} required />
        </Field>

        <button type="submit" className="auth-submit">
          {mode === 'register' ? 'CREAR COMPTE' : 'ENTRAR'}
          <span className="submit-arrow">→</span>
        </button>

        <p className="auth-switch">
          {mode === 'register'
            ? <>Ja tens compte? <button type="button" onClick={() => setMode('login')}>Inicia sessió</button></>
            : <>Nou per aquí? <button type="button" onClick={() => setMode('register')}>Crea un compte</button></>
          }
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="auth-field">
      <label className="auth-field-label">{label}</label>
      {children}
    </div>
  );
}

function CourtSVG() {
  return (
    <svg className="hero-court" viewBox="0 0 430 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="20" width="370" height="220" stroke="white" strokeWidth="2.5"/>
      <line x1="215" y1="20" x2="215" y2="240" stroke="white" strokeWidth="1.5"/>
      <rect x="80" y="20" width="270" height="140" stroke="white" strokeWidth="1.5"/>
      <line x1="30" y1="130" x2="400" y2="130" stroke="white" strokeWidth="2.5"/>
      <line x1="215" y1="90" x2="215" y2="130" stroke="white" strokeWidth="1.5"/>
      <line x1="30" y1="90" x2="400" y2="90" stroke="white" strokeWidth="1"/>
      <line x1="30" y1="170" x2="400" y2="170" stroke="white" strokeWidth="1"/>
    </svg>
  );
}
