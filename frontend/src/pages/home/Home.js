import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Label, Search, Card, Image, Header } from 'semantic-ui-react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import {
  Link
} from "react-router-dom";



const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
  title: PropTypes.string
}

const INITIAL_STATE = { isLoading: false, results: [], value: '' }

function Home(props) {

  React.useEffect(() => {
    retrieveRandomDrinks()
  }, [])

  function retrieveRandomDrinks(){
    axios.get(`http://localhost/api/drinks/random`)
    .then(response => props.setRandom(prevState => ({...prevState, list: response.data})));
  }

  function handleResultSelect (e, { result }) {
    props.setSearch(prevState => ({...prevState, value: result.title }));
  } 

  function handleSearchChange (e, { value }) {
    props.setSearch(prevState =>  ({...prevState, isLoading: true, value: value }));

    setTimeout(() => {
      if (value.length < 1) return props.setSearch(INITIAL_STATE);
      if (value.length > 2)
        axios.get(`http://localhost/api/ingredients/${value}`)
        .then(response => response.data.map(({name, id},i) => ({title: name, key: i, ingredientid: id})))
        .then(
          result => props.setSearch(prevState => ({...prevState, results: result, isLoading:false}))
        );
      else
        props.setSearch(prevState => ({...prevState, results: []}));
    }, 300);
  }

  function handleOnClick(){
    props.setElements(prevState => ({...prevState, isLoading:true}));

    axios.get(`http://localhost/api/search?ingredient=${props.getSearch.value}`)
    .then(response => {
      props.setElements(prevState => ({...prevState, list: response.data, isLoading:false}))
    });
  }

  function addToTheOrder({idDrink, strDrink, strDrinkThumb}){
    let index = props.getOrder.details.findIndex(x => x.idDrink === idDrink);
    
    if(index !== -1){
      let details = props.getOrder.details;
      details[index].qty += 1;
      ToastsStore.success("Now you have: " + details[index].qty + " of " + strDrink);
      props.setOrder(prevState => ({...prevState, details: details}));
    }else{
      ToastsStore.success(strDrink + " added to the order!");
      props.setOrder(prevState => ({table: prevState.table, details: [...prevState.details, {idDrink, strDrink, strDrinkThumb, qty: 1}]}));
    }
  }

  return (
    <>
      <div className="App">
        <div>
          <Search 
            loading={props.getSearch.isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            results={props.getSearch.results}
            value={props.getSearch.value}
            resultRenderer={resultRenderer}
            placeholder='Search by ingredient'
          />
          <Button floated="left" onClick={handleOnClick} primary>Search</Button>
          <Link to="/review"><Button floated="right" secondary>Review Order</Button></Link>
          {props.getElements.list.length > 0 ? (
            <Card.Group itemsPerRow={3}>
              {props.getElements.list.map(item => 
                <Card key={item.idDrink} color='red'>
                  <Image src={item.strDrinkThumb} size='medium' wrapped />
                  <Card.Content>
                    <Card.Header>{item.strDrink}</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Button color="green" floated="right" onClick={() => addToTheOrder(item)} primary> Add </Button>
                  </Card.Content>
                </Card>
              )}
            </Card.Group>
          ) : (props.getRandom.list.length > 0 && (
              <>
              <Header as="h1" textAlign="center">Random Selection</Header>
              <Card.Group itemsPerRow={3}>
                {props.getRandom.list.map(item => 
                  <Card key={item.idDrink} color='red'>
                    <Image src={item.strDrinkThumb} size='medium' wrapped />
                    <Card.Content>
                      <Card.Header>{item.strDrink}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Button color="green" floated="right" onClick={() => addToTheOrder(item)} primary> Add </Button>
                    </Card.Content>
                  </Card>
                )}
              </Card.Group>
              </>
            )
          )}
        </div>
        <ToastsContainer store={ToastsStore}/>
      </div>
    </>
  );
}

export default Home;
