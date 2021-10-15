import React, {useState, useEffect} from "react"; 
import axios from "axios";
import * as yup from "yup"; // <<<<<<<<<<<<< DO I NEED?

import OrderForm from "./OrderForm";
import formSchema from "./validation/formSchema";

// ----- Initial Values ----- 
const initialFormValues = { // form values
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
const initialOrders = []; // ### REMOVE ###  const initialOrderValues ={}
const initialOrderNum = 1;


export default function App () {
  // ----- States -----
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialErrorMsgs);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [orders, setOrders] = useState(initialOrders);
  const [orderNum, setOrderNum] = useState(initialOrderNum);

  
  // ----- Validate & Set Form Values in State -----
  const updateinputField = (name, value) => {        // ### REMOVE ###  inputChange
    validateInputField(name, value);
    setFormValues({...formValues, [name]: value })
  }
  const validateInputField = (name, value) => { 
    yup.reach(formSchema, name)
      .validate(value)
      .then( response => setFormErrors({...formErrors, [name]: ''}) ) // Valid = No msg
      .catch( error => setFormErrors({...formErrors, [name]: error.error[0]}) ) // Invalid = Error Msg
  }

  // ----- Enable Submit Button Side Effect -----
  useEffect ( () => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid));
    // If entire form is valid, then receive 'true' msg, then set button disabled to 'false'
  })

  // ----- Submit Form to DB (Post) -----
  const formSubmit = () => {
    const newOrder = {
      name: formValues.name,
      size: formValues.size,
      topping1: formValues.topping1,
      topping2: formValues.topping2,
      special: formValues.special.trim()
    }
    axios.post("https://reqres.in/api/orders")
      .then(response => {
        console.log("POST Response: ", response);
        //setOrders([...orders, response.data])         ### UPDATE ### setOrders with response.data?
      })
      .catch(error => {
        console.log("ERROR: ", error);
      })
      .finally( () => {
        setFormValues(initialFormValues);
      })
    
  }



  return (
    <>
      <header>
        <nav>
          <h2>Lambda Eats</h2>
          <h2>Order Pizza Button</h2>
          <h2>Add Home and help link</h2>
          <h2>---END Header Section --- </h2>
        </nav>
      </header>
      <OrderForm/>
    </>
  );// End return


}; // End default function App

