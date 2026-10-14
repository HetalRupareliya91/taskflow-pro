import { useState } from 'react';
import { pages } from './pages/registry.js';
import './pages/index.js';

export default function App() {
  const [active, setActive] = useState(pages[0]?.key);
  const Page = pages.find((p) => p.key === active)?.component;

  return (
    <div className="layout">
      <aside>
        <h1>TaskFlow Pro</h1>
        <nav>
          {pages.map((p) => (
            <button key={p.key} className={p.key === active ? 'active' : ''} onClick={() => setActive(p.key)}>
              {p.label}
            </button>
          ))}
        </nav>
      </aside>
      <main>{Page ? <Page /> : <p>No modules yet.</p>}</main>
    </div>
  );
}
