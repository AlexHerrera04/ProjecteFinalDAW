import { useNavigate, useLocation } from 'react-router-dom';

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);

const IconTraining = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 3c0 0 3 4 3 9s-3 9-3 9"/>
    <path d="M3 12h18"/>
    <path d="M4.2 7h15.6M4.2 17h15.6"/>
  </svg>
);

const IconSocial = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3"/>
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
    <circle cx="18" cy="7" r="2"/>
    <path d="M22 21v-2a3 3 0 00-2-2.83"/>
  </svg>
);

const TABS = [
  { path: '/home',     Icon: IconHome,     label: 'Inici' },
  { path: '/training', Icon: IconTraining, label: 'Entreno' },
  { path: '/social',   Icon: IconSocial,   label: 'Social' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav">
      {TABS.map(({ path, Icon, label }) => (
        <button
          key={path}
          className={`nav-item ${pathname === path ? 'active' : ''}`}
          onClick={() => navigate(path)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
