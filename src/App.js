import React from 'react';
import Routing from './protected/modules/homepage/routers/Routing';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div>
      <Routing />
      <Chatbot />
    </div>
  );
}

export default App;
