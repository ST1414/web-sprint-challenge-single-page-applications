import React from "react";
import { Link } from 'react-router-dom';

// [ ] A form with an id of "pizza-form"
// [ ] A name text input field with an id of "name-input"
// [ ] Validation for name and the error message is "name must be at least 2 characters" (Use this exact error message to make sure tests pass) ::: VERY IMPORTANT TO USE THAT EXACT ERROR MESSAGE (casing included!)
// [ ] A dropdown for pizza size with an id of "size-dropdown"
// [ ] A checklist for toppings - at least 4 (hint: name each separately!)
// [ ] Text input for special instructions with an id of "special-text"
// [ ] An Add to Order button that has an id of "order-button" and that submits form and returns a database record of name, size, toppings and special instructions


export default function OrderForm (props){
    
    // ----- Object Destructuring of props ----- 
    const {
        formValues,
        formErrors,
        btnDisabled,
        formSubmit,
        updateInputField
    } = props;

    console.log('PROPS: ', props); // <<<<<<<<<<<< ### REMOVE ###

    // ----- Update Input Field States -----
    const onChange = (event) => {
        console.log('EVENT TARGET: ', event.target); // <<<<<<<<<<<< ### REMOVE ###
        const { name, type, value, checkbox } = event.target;
        const valueToChange = type === 'checkbox' ? checkbox : value;
        updateInputField(name, valueToChange)
    }

    // ----- Submit Form, Prevent Default


    return (
        <form className="pizza-form" onSubmit={formSubmit}>


            <div className="order-form-header">
                {/* <p>Insert picture</p> */}
                <h2>================</h2> {/* ### REMOVE */}
                <h1>Build Your Own Pizza</h1>
                <h2>OrderForm.js</h2> {/* ### REMOVE */}
            </div>
            {/* ------------------- SIZE (dropdown) --------------------------- */}
            <label>Size
                <select onChange={onChange} value={formValues.size} name="size">
                    <option value="">- Select a Size -</option>
                    <option value="small">- Small -</option>
                    <option value="medium">- Medium -</option>
                    <option value="large">- Large -</option>
                </select>
            </label><br/><br/>
            {/* -------------------- TOPPINGS (checkboxes)--------------------- */}
            <label>Toppings (Choose up to 2)
                <input
                // <<<< Checkboxes
                />
            </label><br/><br/>
            {/* -------------- SPECIAL INSTRUCTIONS (text) ------------------ */}
            <label>Special Instructions
                <input
                // <<<< Text Box
                />
            </label><br/><br/>
            {/* --------------------- NAME (text) ---------------------------- */}
            <label>Name for Order
                <input
                // <<<< Text Box
                />
            </label><br/><br/>
            {/* ------------------- ERROR MSGS + SUBMIT BTN ------------------ */}
            <div className="error-msgs">
                <h2>Error Msgs</h2>
                <h3>{formErrors.name}</h3>
            </div>
            <button disabled={btnDisabled}>Add to Order!</button><br/>

            {/* REMOVE LINK BELOW, ONLY FOR TESTING NAV */}
            {/* ACTUAL URL CHANGE IN APP.JS POST */}
            <Link to="/order-confirmed">Order Confirmation</Link><br/>
        </form>
        
    )
}