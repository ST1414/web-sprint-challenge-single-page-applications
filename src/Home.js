import React from "react";
import { Link } from 'react-router-dom';

export default function Home (props){
    

    return (

        <div className='home-wrapper'>
            <h2>Welcome to Lambda Eats Pizza Shop!</h2>
            <img
                className='home-image'
                src='../public/Home-Pizza.jpg'
                alt=''
            />
            <Link to="/pizza">Order Pizza</Link>
        </div>


    )
}



// ### UPDATE ### Convert Div to have background

