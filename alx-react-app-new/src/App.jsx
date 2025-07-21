import React from 'react';
import Counter from './components/Counter';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <h1>Simple Counter App</h1>
      <Counter />
      <Header />
      <UserProfile name="Bancy" age={30} bio="A travel enthusiast and web developer." />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
