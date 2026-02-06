import { useState, useEffect } from 'react';

export default function App() {
  const [ticker, setTicker] = useState('');
  const [research, setResearch] = useState([]);
  const [showGuide, setShowGuide] = useState(false); // New state for the guide
  
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
      alignItems: 'center',
      position: 'relative'
    }}>
      
      {/* GUIDE MODAL OVERLAY */}
      {showGuide && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 20, 0, 0.9)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#000',
            border: '2px solid #0f0',
            padding: '30px',
            maxWidth: '600px',
            boxShadow: '0 0 20px #0f0',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowGuide(false)}
              style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#f00', cursor: 'pointer', fontSize: '1.2rem' }}
            > [X] CLOSE </button>
            
            <h2 style={{ borderBottom: '1px solid #0f0', paddingBottom: '10px' }}>{'>'} SYSTEM_GUIDE_V1.0</h2>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', marginTop: '20px' }}>
              <p><strong>1. INTAKE:</strong> Enter a ticker to create a new research file.</p>
              <p><strong>2. INTEL:</strong> Use <strong>X_SEARCH</strong> & <strong>DEX_SCAN</strong> to verify social sentiment and charts.</p>
              <p><strong>3. SECURITY:</strong> Check <strong>CONTRACT</strong> & <strong>LIQUIDITY</strong>. Never trade if these fail.</p>
              <p><strong>4. CONVICTION:</strong> Adjust the <strong>VIBE_METER</strong> based on your gut feeling. 80%+ is the target.</p>
              <p><strong>5. LOGGING:</strong> Note your thesis. Why are you buying? What is the exit plan?</p>
            </div>
            <p style={{ marginTop: '20px', color: '#8f8', fontSize: '0.8rem' }}>// END OF DOCUMENT //</p>
          </div>
        </div>
      )}

      {/* Centered Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px', maxWidth: '800px' }}>
        <header style={{ borderBottom: '1px solid #060', marginBottom: '20px', paddingBottom: '10px' }}>
          <img 
            src="/logo.png" 
            style={{ width: '100px', height: '100px', marginBottom: '15px', borderRadius: '50%', border: '2px solid #0f0' }} 
            alt="LOGO" 
          />
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}> 
            {'>'} DEGEN_INTEL_SYSTEM_V1.0 
          </h1>
          
          {/* THE NEW BUTTON */}
          <button 
            onClick={() => setShowGuide(true)}
            style={{ 
              background: 'none', 
              border: '1px solid #0a0', 
              color: '#0a0', 
              padding: '5px 15px', 
              cursor: 'pointer',
              marginBottom: '10px',
              fontSize: '0.7rem'
            }}
          > [?] HOW_IT_WORKS </button>

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
              outline: 'none' 
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
        maxWidth: '1200px',
        flex: 1 
      }}>
        {research.map((item) => (
          <div key={item.id} style={{ border: '1px solid #0f0', padding: '20px', backgroundColor: '#050505' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>${item.symbol}</h2>
              <button onClick={() => {
                const filtered = research.filter(r => r.id !== item.id);
                setResearch(filtered);
                localStorage.setItem('degen_intel', JSON.stringify(filtered));
              }} style={{ color: '#f00', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}>[TERMINATE]</button>
            </div>

            <div style={{ marginBottom: '15px', fontSize: '0.9rem' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                <input type="checkbox" checked={item.checks.contract} onChange={() => updateEntry(item.id, 'checks', {...item.checks, contract: !item.checks.contract})} /> CONTRACT_SAFE?
              </label>
              <label style={{ display: 'block' }}>
                <input type="checkbox" checked={item.checks.liq} onChange={() => updateEntry(item.id, 'checks', {...item.checks, liq: !item.checks.liq})} /> LIQUIDITY_LOCKED?
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                <span>VIBE_METER</span>
                <span>{item.vibe}%</span>
              </div>
              <input type="range" style={{ width: '100%', accentColor: '#0f0' }} value={item.vibe} onChange={(e) => updateEntry(item.id, 'vibe', e.target.value)} />
            </div>

            <textarea 
              placeholder="RESEARCH_NOTES..."
              style={{ width: '100%', height: '80px', backgroundColor: '#0a0a0a', border: '1px solid #060', color: '#0f0', padding: '10px' }}
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

      <footer style={{ marginTop: '80px', padding: '20px', borderTop: '1px solid #030', textAlign: 'center', fontSize: '0.8rem', color: '#060', width: '100%' }}>
        <p>SYSTEM: DEGEN_INTEL_V1.0</p>
        <p>DESIGNED BY: <span style={{ color: '#0f0' }}>PANTHERBROII</span></p>
      </footer>
    </div>
  );
}