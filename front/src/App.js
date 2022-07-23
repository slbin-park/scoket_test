import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './pages/join';
import Chat from './pages/chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Join />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/chat/:nickname/:room' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
