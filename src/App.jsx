import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import { TaskProvider } from './context/context.jsx';
import NewTask from './Components/NewTask.jsx';




function App() {
  return (
    <TaskProvider>
      <div className='main'>
        <Header />

        <Home />
      </div>
    </TaskProvider>
  );
}

export default App;
