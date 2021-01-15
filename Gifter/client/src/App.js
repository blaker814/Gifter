import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header";
import { UserProfileProvider } from "./providers/UserProfileProvider";

function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <Router>
          <Header />
          <ApplicationViews />
        </Router>
      </UserProfileProvider>
    </div>
  );
}

export default App;