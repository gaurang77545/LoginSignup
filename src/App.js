import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loginpage from './LoginPage';
import Registerpage from './SignUpPage';
import { Component } from 'react';
class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route exact path="/registerpage" element={<Registerpage />} />
      </Routes>
    );
  }
}

export default App;
