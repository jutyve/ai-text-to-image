import React, {useContext, useEffect, useState} from "react";
import {Contexto} from "../App"


import "../css/hero.css"
import Card from "./Card"
import data from "../data"
import { Link } from "react-router-dom";


function Hero(props)
{
    const {setResult} = useContext(Contexto);

    const textData = data.ideasText;
    

    const copyInput = (event) => 
    {
        const copyValue = event.target.innerHTML;
        navigator.clipboard.writeText(copyValue);
        
        changeInput();
    };

    const changeInput = async () => 
    {
        var inputElement = document.getElementsByClassName("hero--input---element").item(0);

        inputElement.value = await navigator.clipboard.readText(); 
    };


    /* HANDLES GENERATING AN IMAGE EVENT  */
    const clickHandler = () => 
    {
        const inputElement = document.getElementsByClassName("hero--input---element").item(0);
        const value = inputElement.value;

        setResult(value);        
    }



    /* RANDOMIZE TEXT INSIDE THE SUGGESTION CARDS */
    const randomizeText = (event) => 
    {
        event.preventDefault();

        var cardArr = [];
        var indexArr = [];

        let i = 0;
        while( i < 6)
        {
            
            var randIndex = Math.floor( Math.random() * textData.length );
            

            if( indexArr.indexOf(randIndex) === -1 )
            {
                cardArr.push(<Card key={textData[randIndex]} text={textData[randIndex]} clickHandler={copyInput}  /> );
                indexArr.push(randIndex);
                i++;
            }
            
            
        }
        
        
        setCardArray(cardArr);

    }

    
    
    /* INITIALIZE CARD ARRAY RANDOMLY */

    const [cardArray, setCardArray] = useState( () => {

        var cardArr = [];
        var indexArr = [];

        let i = 0;
        while( i < 6)
        {
            
            var randIndex = Math.floor( Math.random() * textData.length );
            

            if( indexArr.indexOf(randIndex) === -1 )
            {
                cardArr.push(<Card key={textData[randIndex]} text={textData[randIndex]} clickHandler={copyInput}  /> );
                indexArr.push(randIndex);
                i++;
            }
            
            
        }

        return cardArr;

    } 
    );

    




    return (
        
        <>
          
        <section className="hero">
            <h1 className="hero--title">Text to Image with AI Image Generator</h1>
            <h4 className="hero--subtitle">Convert words to images in seconds with this free AI image generator. Input the text prompts and transfer your imagination into art now.</h4>
        </section>



        <div className="container">

            <section className="hero--input">
                <textarea type="text" className="hero--input---element" placeholder="Describe what you want, separated by commas"></textarea>
                <Link to="generate" className="hero--input---generate" onClick={clickHandler}>Generate</Link>
            </section>
          

            <section className="hero--ideas">
                <div className="hero--ideas---cards">
                    <h4 className="hero--ideas---title" onClick={randomizeText}>↺ No ideas? Try these!</h4>
                    {cardArray}
                </div>
            </section>

        </div>
        
        </>
    );
}

export default Hero;