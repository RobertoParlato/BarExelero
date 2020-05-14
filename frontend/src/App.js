import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Layout from './components/Layout';
import Review from './pages/review/Review';
import Home from './pages/home/Home';

const INITIAL_STATE = { isLoading: false, results: [], value: '' }
const INITIAL_STATE2 = { isLoading: false, list: [] }
const INITIAL_STATE3 = { table_id: null, details: [] }
const INITIAL_STATE4 = { list: [] }

function App() {
  const [search, setSearch] = React.useState(INITIAL_STATE);
  const [elements, setElements] = React.useState(INITIAL_STATE2);
  const [order, setOrder] = React.useState(INITIAL_STATE3);
  const [random, setRandom] = React.useState(INITIAL_STATE4);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/review">
            <Review getOrder={order} setOrder={setOrder}/>
          </Route>
          <Route path="/">
            <Home getSearch={search} setSearch={setSearch} getElements={elements} setElements={setElements}
             getOrder={order} setOrder={setOrder} getRandom={random} setRandom={setRandom} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
