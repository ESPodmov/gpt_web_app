import './App.css';
import './styles/style.scss';
import { ChatContainer } from './components/ChatContainer';
import React from 'react';
import { APIController } from './utils/APIController';
import { Context } from './context/Context';


function App() {
  const apiController = new APIController(process.env.REACT_APP_API_HOST, process.env.REACT_APP_API_PORT)
  return (
    <Context.Provider value={{ apiController: apiController }}>
      <ChatContainer />
    </Context.Provider>
  );
}

export default App;
