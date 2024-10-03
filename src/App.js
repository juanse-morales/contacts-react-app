import React from "react";
import "./App.css";
import Card from "./components/card/Card";
import NavBar from "./components/navbar/NavBar";

class App extends React.Component {
  
  render() {
    return (
      <div className="app-container">
        <NavBar />
        <Card />
      </div>
    );
  }
}

export default App;
