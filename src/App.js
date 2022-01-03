import "./App.css";
import Header from "./components/Header";
import Notes from "./pages/Notes";
import { Route, Switch } from "react-router-dom";
import Note from "./pages/Note";

function App() {
  return (
    <div className="container">
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={Notes} />
          <Route path="/note/:id" component={Note} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
