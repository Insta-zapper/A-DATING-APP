import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Step 2: Testing actual App.tsx component');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);

console.log('Step 2: App component rendered');
