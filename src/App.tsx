import MessagePage from './components/pages/MessagePage'
import { ChatProvider } from './shared/AppContext'
import './App.css';

const App = () => {

  return (
    <main className="App">
      <ChatProvider>
        <MessagePage />
      </ChatProvider>
    </main>
  );
}

export default App;
