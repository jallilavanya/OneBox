import React, { useState } from 'react';
import EmailList from './components/EmailList';
import EmailDetail from './components/EmailDetail';

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div style={{ display: 'flex', gap: 16, padding: 16 }}>
      <div style={{ width: 400 }}>
        <EmailList onSelect={id => setSelected(id)} />
      </div>
      <div style={{ flex: 1 }}>
        {selected ? <EmailDetail id={selected} /> : <div>Select an email</div>}
      </div>
    </div>
  );
}
