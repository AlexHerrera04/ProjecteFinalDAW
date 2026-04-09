import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth    from './screens/Auth';
import Home    from './screens/Home';
import Training from './screens/Training';
import Social  from './screens/Social';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Auth />} />
        <Route path="/home"      element={<Home />} />
        <Route path="/training"  element={<Training />} />
        <Route path="/social"    element={<Social />} />
        <Route path="*"          element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
