import React from "react";
import { Link } from 'react-router-dom';

export default function Home (props){
    

    return (

        <div className='home-wrapper'>
            <h2>================</h2>
            <img
                className='home-image'
                src='../public/Home-Pizza.jpg'
                alt=''
            />
            <Link to="/pizza">Order Pizza</Link>
            <h2>================</h2>
        </div>


    )
}



// ### UPDATE ### Convert Div to have background

