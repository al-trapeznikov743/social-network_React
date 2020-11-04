import React from 'react';
import {Route} from 'react-router-dom'
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import DialogsContainer from './components/dialogs/DialogsContainer';
import './App.sass';

const App = () => {
  return (
    <div className ='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Route path='/dialogs' render={() => 
          <DialogsContainer />}
        />
        <Route path='/profile' render={() => 
          <Profile />}
        />
      </div>
    </div>
  );
}

export default App;
