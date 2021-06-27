import React from 'react';
import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';
import './styles/global.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createContext, useEffect, useState} from 'react';
import {firebase, auth} from './services/firebase';
import userEvent from '@testing-library/user-event';
import { type } from 'os';
import {AuthContextProvider} from './contexts/AuthContextProvider'
import { Room } from './pages/Room';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import { AdminRoom } from './pages/AdmininRoom';

function App() {
  
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>    
          <Route path="/rooms/:id" component={Room}/>    
          <Route path="/admin/rooms/:id" component={AdminRoom}/>    
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
