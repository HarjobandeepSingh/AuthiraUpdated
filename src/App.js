import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ls from 'local-storage'
///boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';

import Home from './comp/home';
import Register from './comp/register.js';
import Dashbaord1 from './comp/Dashboard1';
import Login from './comp/login';
import Index from './comp/index';
import CreatePost from './comp/CreatePost';
import Post from './comp/Post';
import Profile from './comp/Profile';
import Profile2 from './comp/Profile2';
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Dashboard' element={<Dashbaord1 />} />
              <Route path='/Register' element={< Register />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/index' element={<Index />} />
              <Route path='/CreatePost' element={<CreatePost/>}/>
              <Route path='/cPost/:id/:uid' element={<Post/>}/>
              <Route path='/Profile' element={<Profile/>}/>
              <Route path='/Profile2' element={<Profile2/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
