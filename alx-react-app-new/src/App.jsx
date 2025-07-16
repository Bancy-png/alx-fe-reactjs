import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Counter from './components/Counter';  // 👈 Add this line
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Counter /> {/* 👈 Add this line */}
      <Footer />
      <Header />
      {/* other components */}
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
      <UserProfile
        name="Alice"
        age="25"
        bio="Loves hiking and photography"
      />
    </div>
  );
}

export default App;
