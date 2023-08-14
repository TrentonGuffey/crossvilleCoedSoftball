import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from "./Login"
import { CoachViews } from './CoachView';
import { AdminView } from './Admin';
import { GameSchedule } from './GameSchedule';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/" element={<GameSchedule/>} />
        <Route path="/coach" element={<CoachViews/>} />
        <Route path="/admin" element={<AdminView/>} />


      </Routes>
    </>

  );
}

export default App;

