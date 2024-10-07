import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Card from "./components/card/Card";
import Layout from "./Layout";

class App extends React.Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/home" element={<Card />} />

            <Route path="/" element={<Card />} />
            <Route path="*" element={<Card />} />
          </Route>
          
          
        </Routes>
      </div>
    );
  }
}

export default App;
