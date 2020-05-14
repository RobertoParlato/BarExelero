import React from 'react';
import axios from 'axios';
import { Button, Input, Item, Header } from 'semantic-ui-react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import {
  Link
} from "react-router-dom";

const INITIAL_STATE3 = { table_id: null, details: [] }

function Review(props) {

    function handleMinus(item,index){
        if(item.qty > 1){
            let details = props.getOrder.details;
            details[index].qty -= 1;
            props.setOrder(prevState => ({...prevState, details: details}));
        }
    }

    function handlePlus(item,index){
        let details = props.getOrder.details;
        details[index].qty += 1;
        props.setOrder(prevState => ({...prevState, details: details}));
    }

    function handleRemove(item,index){
        let details = props.getOrder.details;
        details.splice(index, 1);
        props.setOrder(prevState => ({...prevState, details: details}));
        ToastsStore.success(item.strDrink + " removed successfully!");
    }

    function handleSubmit(){
        let details = props.getOrder.details.map(({idDrink, qty, strDrink}) => ({drink_id: idDrink, qty, drink_name: strDrink}))
        axios.post(`http://localhost/api/orders`, {details: details, table_id: 1})
        .then(response => {
            ToastsStore.success("Order Completed! We will serve you at your table!");
            props.setOrder(prevState => (INITIAL_STATE3));
        }).catch(error => ToastsStore.error("Somethings gone wrong!"));
    }

    return (
    <>
        <Header as="h1">Review Your Order</Header>
        {props.getOrder.details.length > 0 ?
        <Item.Group divided >
            {props.getOrder.details.map((x,i) => 
            (<Item key={x.idDrink}>
                <Item.Image size='tiny' src={x.strDrinkThumb} />
                <Item.Content verticalAlign='middle'>
                    <Item.Header as='b'>{x.strDrink}</Item.Header>
                </Item.Content>
                <Item.Extra>
                    <div className="little-extra">
                        <Button onClick={() => handleMinus(x,i)} icon="minus"/>
                        <Input className="little-input" size="mini" placeholder="Qty" disabled value={x.qty}/>
                        <Button onClick={() => handlePlus(x,i)} icon="plus"/>
                        <Button onClick={() => handleRemove(x,i)} color="red" icon="close"/>
                    </div>
                </Item.Extra>
            </Item>
            ))}
        </Item.Group>
        :
        (<b>Your order is empty, please return back and add your drinks.<br/></b>)}
        <Link to="/"><Button floated="left" primary>Back</Button></Link>
        <Button onClick={() => handleSubmit()} color="green" floated="right">Submit Order</Button>
        <ToastsContainer store={ToastsStore}/>
    </>
    );
}

export default Review;
