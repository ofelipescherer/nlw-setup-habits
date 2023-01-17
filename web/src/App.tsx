import Habit from './components/Habit';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Habit completed={3}></Habit>
    </div>
  );
}

export default App;
