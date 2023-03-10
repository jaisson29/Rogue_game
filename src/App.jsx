import React from "react";
import ReactRogue from './ReactRogue.jsx'

const appStyle = {
  display: "flex",
  gap: "30px"
}

const App = () => (
    <div style={appStyle} className="App">
      <ReactRogue width={40} height={40} tilesize={16} />
    </div>
  ) 

export default App;
