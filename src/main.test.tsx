import React from 'react'
import ReactDOM from 'react-dom/client'

console.log('Test file loaded');

const TestApp = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'red', color: 'white' }}>
      <h1>TEST APP IS WORKING!</h1>
      <p>If you see this, React is rendering properly.</p>
    </div>
  );
};

console.log('About to render test app');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TestApp />
);

console.log('Test app rendered');
