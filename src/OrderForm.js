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

    // ----- Update Input Field States -----
    const onChange = (event) => {
        const { name, type, value, checked } = event.target;
        const valueToChange = type === 'checkbox' ? checked : value;
        updateInputField(name, valueToChange)
    }

    // ----- Submit Form, Prevent Default
    const onSubmit = (event) => {
        event.preventDefault();
        formSubmit();
    }


    return (
        <form id="pizza-form" onSubmit={onSubmit}>


            <div className="order-form-header">
                {/* <p>Insert picture</p> */}
                <h1>Build Your Own Pizza</h1>
            </div>
            {/* ------------------- SIZE (dropdown) --------------------------- */}
            <div className="order-section">
                <h3>Choose a Size</h3>
                <label>Size
                    <select id="size-dropdown" name="size" value={formValues.size} onChange={onChange} >
                        <option value="">- Select a Size -</option>
                        <option value="small">- Small -</option>
                        <option value="medium">- Medium -</option>
                        <option value="large">- Large -</option>
                    </select>
                </label>
            </div>
            {/* -------------------- TOPPINGS (checkboxes)--------------------- */}
            <div className="order-section">
                <h3>Toppings</h3>
                <label> Veggies
                    <input type="checkbox" name="topping1" checked={formValues.topping1} onChange={onChange}/> 
                </label><br/>
                <label> Meat
                    <input type="checkbox" name="topping2" checked={formValues.topping2} onChange={onChange}/> 
                </label><br/>
                <label> Extra Cheese
                    <input type="checkbox" name="topping3" checked={formValues.topping3} onChange={onChange}/> 
                </label><br/>
                <label> Mystery
                    <input type="checkbox" name="topping4" checked={formValues.topping4} onChange={onChange}/> 
                </label>
            </div>
            {/* -------------- SPECIAL INSTRUCTIONS (text) ------------------ */}
            <div className="order-section">
                <h3>Special Instructions</h3>
                <label>Anything else you'd like to add?
                    <input id="special-text" type="text" name="special" value={formValues.special} onChange={onChange}/>
                </label>
            </div>
            {/* ------------- NAME (text) & SUBMIT (btn) & ERROR MSG ------------------- */}
            <div className="order-section">
                <h3>Ready to Order?</h3>
                <label>Name for Order
                    <input id="name-input" type="text" name="name" value={formValues.name} onChange={onChange}/>
                </label>
                <h4>{formErrors.name}</h4>
                <button id="order-button" disabled={btnDisabled}>Add to Order!</button><br/>
            </div>
        </form>
        
    )
}