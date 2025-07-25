import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import WelcomeMessage from './components/WelcomeMessage';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <WelcomeMessage />
      <UserProfile name="Bancy Wacuka" age="28" bio="A passionate front-end developer and virtual assistant." />
      <Footer />
    </div>
  );
}

export default App;
