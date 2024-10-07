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
            <Route path="/home" element={<Card page="home" />} />
            <Route path="/archived" element={<Card page="archived" />} />
            <Route path="/blocked" element={<Card page="blocked" />} />
            <Route path="/deleted" element={<Card page="deleted" />} />

            <Route path="/" element={<Card page="home" />} />
            <Route path="*" element={<Card page="home" />} />
          </Route>
          
          
        </Routes>
      </div>
    );
  }
}

export default App;
