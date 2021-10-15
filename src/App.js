// --- Add imports
import React, {useState, useEffect} from "react"; 
import axios from "axios";
import * as yup from "yup";
import OrderForm from "./OrderForm";
import formSchema from "./validation/formSchema";


const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
    </>
  );
};
export default App;
