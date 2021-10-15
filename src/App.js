import React, {useState, useEffect} from "react"; 
import axios from "axios";
import { Link, Route, useHistory } from 'react-router-dom';
import * as yup from "yup";

import Home from "./Home";
import OrderForm from "./OrderForm";
import OrderConfirmed from "./OrderConfirmed"  // <<<<<<<<<<<<< ### DO I NEED? ###
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
const initialBtnDisabled = true;
const initialOrders = [];
const initialOrderNum = 1; // <<<<<<<<<<<<< ### DO I NEED? ###


export default function App () {
  
  // ----- States -----
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialErrorMsgs);
  const [btnDisabled, setBtnDisabled] = useState(initialBtnDisabled);
  const [orders, setOrders] = useState(initialOrders);
  const [orderNum, setOrderNum] = useState(initialOrderNum);
  const history = useHistory();

  
  // ----- Validate & Set Form Values in State -----
  const updateInputField = (name, value) => {        // ### REMOVE NOTE ###  inputChange
    //validateInputField(name, value);                 // #### UPDATE WHEN SCHEMA BUILT
    setFormValues({...formValues, [name]: value })
  }
  const validateInputField = (name, value) => { 
    yup.reach(formSchema, name)
      .validate(value)
      .then( response => setFormErrors({...formErrors, [name]: ''}) ) 
      .catch( error => setFormErrors({...formErrors, [name]: error.error[0]}) )
      // Valid = No msg; Invalid = Error Msg
  }

  // ----- Enable Submit Button Side Effect ----- #### UPDATE WHEN SCHEMA BUILT
  // useEffect ( () => {
  //   formSchema.isValid(formValues).then(valid => setBtnDisabled(!valid));
  //   // If form valid, receive 'true' msg, set button disabled to 'false'
  // }, [formValues])

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
        setOrders([...orders, response.data])   //<<<<< ### UPDATE ### setOrders with response.data?
        history.push("/order-confirmed");
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
          </div>
        </nav>
      </header>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/pizza">
        <OrderForm 
          formValues={formValues}
          formErrors={formErrors}
          btnDisabled={btnDisabled}
          formSubmit={formSubmit}
          updateInputField={updateInputField} // ### REMOVE ### inputChange
        />
      </Route>
      <Route exact path="/order-confirmed">
        <OrderConfirmed orders={orders}/>
      </Route> 
    </>
  );// End return


}; // End default function App

