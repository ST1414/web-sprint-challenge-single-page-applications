import React, {useState, useEffect} from "react"; 
import axios from "axios";
import { Link, Route } from 'react-router-dom';
import * as yup from "yup";

import Home from "./Home";
import OrderForm from "./OrderForm";
import OrderConfirmed from "./"  // <<<<<<<<<<<<< ### DO I NEED? ###
import formSchema from "./validation/formSchema";

// ----- Initial Values ----- 
const initialFormValues = { // form values
  orderNum: "", // <<<<<<<< OPTIONAL
  name: "", 
  size: "",
  topping1: false,
  topping2: false,
  special:  ""
}
const initialErrorMsgs = { // form errors
  name: ""
}
const initialDisabled = true;
const initialOrders = [];
const initialOrderNum = 1; // <<<<<<<<<<<<< ### DO I NEED? ###


export default function App () {
  // ----- States -----
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialErrorMsgs);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [orders, setOrders] = useState(initialOrders);
  const [orderNum, setOrderNum] = useState(initialOrderNum);

  
  // ----- Validate & Set Form Values in State -----
  const updateinputField = (name, value) => {        // ### REMOVE NOTE ###  inputChange
    validateInputField(name, value);
    setFormValues({...formValues, [name]: value })
  }
  const validateInputField = (name, value) => { 
    yup.reach(formSchema, name)
      .validate(value)
      .then( response => setFormErrors({...formErrors, [name]: ''}) ) 
      .catch( error => setFormErrors({...formErrors, [name]: error.error[0]}) )
      // Valid = No msg; Invalid = Error Msg
  }

  // ----- Enable Submit Button Side Effect -----
  useEffect ( () => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid));
    // If entire form is valid
    // then receive 'true' msg
    // then set button disabled to 'false'
  })

  // ----- Submit Form to DB (Post) -----
  const formSubmit = () => {
    const newOrder = {
      orderNum: formValues.orderNum,  // <<<<<<<< OPTIONAL
      name: formValues.name, 
      size: formValues.size,
      topping1: formValues.topping1,
      topping2: formValues.topping2,
      special: formValues.special.trim()
    }
    axios.post("https://reqres.in/api/orders")
      .then(response => {
        console.log("POST Response: ", response);
        //setOrders([...orders, response.data])   <<<<< ### UPDATE ### setOrders with response.data?
      })
      .catch(error => {
        console.log("ERROR: ", error);
      })
      .finally( () => {
        setFormValues(initialFormValues);
        setOrderNum(orderNum+1); // <<<<<<<< OPTIONAL
      })
    
  }

  return (
    <>
      <header>
        <nav>
          <h1 className='store-name'>Lambda Eats</h1>
          <div className='nav-links'>
            <Link to="/">Home</Link><br/>
            <Link to="/pizza">Order Pizza</Link>
          </div>
        </nav>
      </header>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pizza">
        <OrderForm />
      </Route>   
    </>
  );// End return


}; // End default function App

