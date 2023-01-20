import "./Destination.css";
import React from 'react';
import Card from "./Card";
import useFetch from "../hooks/useFetch";
import Hero from "./Hero";

function Destination() {    

    const { data, loading, error } = useFetch("http://localhost:1337/api/destinations?populate=*")

        
    return (
        <>
            <Hero cName="hero"
            heroImg="https://images.unsplash.com/photo-1535390313236-547dc376eaf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            title="Choose Your Destination"
            text="And read more about it"
            />

            <div className=" py-5 bg-light">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                            {error ? "Somethinig's wrong..." : (loading ? "loading" : data.map((item) => 
                                <Card item={item} key={item.id}/>
                            ))}   
                    </div>
                    </div>
            </div>           
       </>
    )
  
}

export default Destination;