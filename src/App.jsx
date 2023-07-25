import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import List from './User/List/List';
import Times from './User/List/Times';
import './App.css';

function App() {
  const [meds, setMeds] = useState([
    {
      name: 'distinctio',
      time: '08:00',
      timeTaken: null,
      taken: false,
    },
    {
      name: 'fugiat',
      time: '08:00',
      timeTaken: null,
      taken: false,
    },
    {
      name: 'ea',
      time: '08:00',
      timeTaken: null,
      taken: false,
    },
    {
      name: 'perferendis',
      time: '16:00',
      timeTaken: null,
      taken: false,
    },
    {
      name: 'consequatur',
      time: '20:00',
      timeTaken: null,
      taken: false,
    },
    {
      name: 'est',
      time: '20:00',
      timeTaken: null,
      taken: false,
    },
    {
      name: 'vel',
      time: '20:00',
      timeTaken: null,
      taken: false,
    },
    {
      name: 'quia',
      time: '22:00',
      timeTaken: null,
      taken: false,
    },
  ]);

  return (
    <div className="container bg-blue-50 h-full py-6">
      <header>
        <h1 className="text-3xl mb-4">MediAlert*</h1>
      </header>
      <main>
        <List meds={meds} setMeds={setMeds} />
      </main>
    </div>
  );
}

export default App;
