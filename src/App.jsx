import { useState, useEffect } from 'react';

export default function App() {
  const [ticker, setTicker] = useState('');
  const [research, setResearch] = useState([]);
  
  // Load data from browser memory
  useEffect(() => {
    const saved = localStorage.getItem('degen_intel');
    if (saved) setResearch(JSON.parse(saved));
  }, []);

  const addToken = (e) => {
    e.preventDefault();
    if (!ticker) return;
    const newEntry = {
      id: Date.now(),
      symbol: ticker.toUpperCase(),
      notes: '',
      vibe: 50,
      checks: { contract: false, liq: false }
    };
    const updated = [newEntry, ...research];
    setResearch(updated);
    localStorage.setItem('degen_intel', JSON.stringify(updated));
    setTicker('');
  };

  const updateEntry = (id, field, value) => {
    const updated = research.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    setResearch(updated);
    localStorage.setItem('degen_intel', JSON.stringify(updated));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#0f0', 
      fontFamily: 'monospace', 
      padding: '40px', 
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center' // This centers the content horizontally
    }}>
      
      {/* Centered Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px' }}>
        <header style={{ borderBottom: '1px solid #060', marginBottom: '20px', paddingBottom: '10px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}> 
            {'>'} DEGEN_INTEL_SYSTEM_V1.0 
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#0a0' }}>[STATUS: SCANNING_FOR_GEMS]</p>
        </header>

        <form onSubmit={addToken} style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="ENTER_TICKER..."
            style={{ 
              backgroundColor: '#000', 
              border: '1px solid #0f0', 
              padding: '12px', 
              color: '#0f0', 
              width: '300px', 
              outline: 'none', 
              boxShadow: '0 0 5px #0f0' 
            }}
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <button style={{ 
            backgroundColor: '#0f0', 
            color: '#000', 
            padding: '12px 25px', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: 'bold' 
          }}>
            INITIATE_SCAN
          </button>
        </form>
      </div>

      {/* Results Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '25px',
        width: '100%',
        maxWidth: '1200px'
      }}>
        {research.map((item) => (
          <div key={item.id} style={{ 
            border: '1px solid #0f0', 
            padding: '20px', 
            backgroundColor: '#050505', 
            boxShadow: 'inset 0 0 10px #0f02' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '2rem', margin: 0, fontStyle: 'italic' }}>${item.symbol}</h2>
              <button onClick={() => {
                const filtered = research.filter(r => r.id !== item.id);
                setResearch(filtered);
                localStorage.setItem('degen_intel', JSON.stringify(filtered));
              }} style={{ color: '#f00', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}>[TERMINATE]</button>
            </div>

            <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#8f8' }}>
              <label style={{ display: 'block', marginBottom: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={item.checks.contract} onChange={() => updateEntry(item.id, 'checks', {...item.checks, contract: !item.checks.contract})} /> CONTRACT_SAFE?
              </label>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <input type="checkbox" checked={item.checks.liq} onChange={() => updateEntry(item.id, 'checks', {...item.checks, liq: !item.checks.liq})} /> LIQUIDITY_LOCKED?
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '5px' }}>
                <span>VIBE_METER</span>
                <span>{item.vibe}%</span>
              </div>
              <input type="range" style={{ width: '100%', accentColor: '#0f0', cursor: 'pointer' }} value={item.vibe} onChange={(e) => updateEntry(item.id, 'vibe', e.target.value)} />
            </div>

            <textarea 
              placeholder="RESEARCH_NOTES..."
              style={{ 
                width: '100%', 
                height: '80px', 
                backgroundColor: '#0a0a0a', 
                border: '1px solid #060', 
                color: '#0f0', 
                padding: '10px', 
                outline: 'none', 
                fontSize: '0.8rem',
                resize: 'none'
              }}
              value={item.notes}
              onChange={(e) => updateEntry(item.id, 'notes', e.target.value)}
            />

            <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <a href={`https://twitter.com/search?q=${item.symbol}`} target="_blank" rel="noreferrer" style={{ color: '#0f0', textDecoration: 'none', fontSize: '0.75rem', border: '1px solid #0f0', padding: '5px 10px', flex: 1, textAlign: 'center' }}>X_SEARCH</a>
              <a href={`https://dexscreener.com/search?q=${item.symbol}`} target="_blank" rel="noreferrer" style={{ color: '#0f0', textDecoration: 'none', fontSize: '0.75rem', border: '1px solid #0f0', padding: '5px 10px', flex: 1, textAlign: 'center' }}>DEX_SCAN</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}