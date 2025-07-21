import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Bancy" age={30} bio="A travel enthusiast and web developer." />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
