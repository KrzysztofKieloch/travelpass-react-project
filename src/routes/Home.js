import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function Home (){
    return(
        <>
         <Navbar/>
            <Hero
            cName="hero"
            heroImg="https://images.unsplash.com/photo-1637578035851-c5b169722de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=921&q=80"
            title="Inspire Yourself"
            text="Search your dream destination"
            buttonText="Search"
            url="/tours"
            btnClass="show"
            /> 
            
        </>
    )
}
export default Home;