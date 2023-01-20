import React from 'react';
import {useState} from 'react';
import useFetch from '../hooks/useFetch';
import './DestinationDetails.css'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';


function DestinationEdit() {    

    const [selectedImg, setSelectedImg] = useState(0);
    const id = useParams().id;
    const images = [
        "https://images.unsplash.com/photo-1536574753884-8c45a0431ecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        "https://images.unsplash.com/photo-1569533816166-49d08c516a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1612447006943-4374ddb2adbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    ]

    const { data, loading, error } = useFetch(`http://localhost:1337/api/destinations/${id}?populate=*`) 

    const [putName, setPutName] = useState(data?.attributes?.name);
    const [putDescription, setPutDescription] = useState(data?.attributes?.description);
    const [putMonths, setPutMonths] = useState(data?.attributes?.travelDate.months);
    const [putDays, setPutDays] = useState(data?.attributes?.travelDate.days);
    const [putResult, setPutResult] = useState(null);

    const putData = (id) => {
      axios.put("http://localhost:1337/api/destinations/" + id, {
        data: {
          name: putName,
          description: putDescription,
          travelDate: {
            months: putMonths,
            days: putDays
          }
        }
      }, 
      { 
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      .then(result => setPutResult("Zmieniono dane, odśwież stronę"))
    };

    return(
        <>
        <Navbar />
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src="https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
            </div>
            <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">
                <input
                type="text"
                className="form-control ms-2"
                onChange={(e) => setPutName(e.target.value)}
                defaultValue={data?.attributes?.name}
                />
                </h1>
                <p className="lead">
                <textarea
                style={{height:"280px"}}
                type="text"
                className="form-control ms-2"
                onChange={(e) => setPutDescription(e.target.value)}
                defaultValue={data?.attributes?.description}
                />
                </p>
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
                    <h3>
                    <input
                    type="text"
                    className="form-control ms-2 text-center"
                    onChange={(e) => setPutMonths(e.target.value)}
                    defaultValue={data?.attributes?.travelDate.months}
                    />
                    </h3>
                    <h3>
                    <input
                    type="text"
                    className="form-control ms-2 text-center"
                    onChange={(e) => setPutDays(e.target.value)}
                    defaultValue={data?.attributes?.travelDate.days}
                    />
                    </h3>
                    <button className='btn btn-success' onClick={() => putData(id)}>Update</button>
                <div>{putResult}</div>
                </div>
                
            </div>
            </div>
        </>
    )
}

export default DestinationEdit;