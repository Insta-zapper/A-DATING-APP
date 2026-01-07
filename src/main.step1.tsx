import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

console.log('Step 1: Testing App component only');

const TestApp = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'blue', color: 'white' }}>
      <h1>STEP 1: App Component Test</h1>
      <p>Testing if App.tsx component works...</p>
    </div>
  );
};

console.log('About to render Step 1 test');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TestApp />
);

console.log('Step 1 test rendered');
