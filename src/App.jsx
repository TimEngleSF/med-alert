import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';

import './App.css';
// import getUserInfo from './API/getUserInfo';

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
      name: 'distinctio',
      time: '08:23',
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

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await getUserInfo('Xavier_Gleichner98@example.com');
  //     console.log(data);
  //   };
  //   getData();
  // });

  return (
    <div className="container bg-cyan-50 h-full py-6 ">
      <header>
        <h1 className="text-4xl mb-10 text-center tracking-[0.225em] font-bold">
          MediAlert*
        </h1>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );

  // return (
  //   <div className="container bg-blue-50 h-full py-6">
  //     <header>
  //       <h1 className="text-3xl mb-4">MediAlert*</h1>
  //     </header>
  //     <main>
  //       <List meds={meds} setMeds={setMeds} />
  //     </main>
  //   </div>
  // );
}

export default App;
