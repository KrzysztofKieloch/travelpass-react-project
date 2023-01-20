import React from 'react';
import {useState} from 'react';
import useFetch from '../hooks/useFetch';
import './DestinationDetails.css'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';


function DestinationDetails() {
    const [selectedImg, setSelectedImg] = useState(0);
    const id = useParams().id;
   
    const { data, loading, error } = useFetch(`http://localhost:1337/api/destinations/${id}?populate=*  `) 

    const images = [
        `http://localhost:1337${data.attributes?.image1?.data.attributes.url}`,
        `http://localhost:1337${data.attributes?.image?.data.attributes.url}`,
        `http://localhost:1337${data.attributes?.image2?.data.attributes.url}` 
       ]

    return(
        <>
        <Navbar />
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src={`http://localhost:1337${data.attributes?.image?.data.attributes.url}`} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
            </div>
            <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">{data?.attributes?.name}</h1>
                <p className="lead">{data?.attributes?.description}</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                </div>
            </div>
            </div>
        </div>
        <div className='container'>
        <div className='destination'>
                <div className='left'>
                    <div className='images'>
                        <img className="sideImg" src={images[0]} alt="" onClick={e=>setSelectedImg(0)}/>
                        <img className="sideImg" src={images[1]} alt="" onClick={e=>setSelectedImg(1)}/>
                        <img className="sideImg" src={images[2]} alt="" onClick={e=>setSelectedImg(2)}/>
                    </div>
                    <div className='mainImg'>
                        <img className="mainImage" src={images[selectedImg]} alt="" />
                    </div>
                </div>
                <div className='right'>
                    <h1>Best time to travel</h1>
                    <br/>
                    <h3>{data?.attributes?.travelDate.months}</h3>
                    <h3>{data?.attributes?.travelDate.days}</h3>
                </div>
            </div>
            </div>
        </>
    )
}

export default DestinationDetails;