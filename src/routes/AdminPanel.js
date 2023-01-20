import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import AdminCard from '../components/DestinationsList';
import useFetch from '../hooks/useFetch';
import Navbar from '../components/Navbar';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {

  const { data, loading, error } = useFetch("http://localhost:1337/api/destinations?populate=*")

  const [postResult, setPostResult] = useState(null);
  const [postName, setPostName] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postMonths, setPostMonths] = useState('');
  const [postDays, setPostDays] = useState('');

  const [selectedImg, setSelectedImg] = useState(0);

  const singOut = useSignOut();
  const navigate = useNavigate();

    const images = [
        "https://images.unsplash.com/photo-1536574753884-8c45a0431ecf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        "https://images.unsplash.com/photo-1569533816166-49d08c516a77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "https://images.unsplash.com/photo-1612447006943-4374ddb2adbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    ]

  const postData = () => {
        axios.post("http://localhost:1337/api/destinations?populate=*", {
          data: {
            name: postName,
            description: postDescription,
            travelDate: {
              months: postMonths,
              days: postDays
            }
            }
          }, 
        { 
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token') 
          }
        })
        .then(result => {
          setPostResult(JSON.stringify(result, null, 2));
          if(result.status === 200) {
            alert('New entry added. Refresh the page.')
          }
        })

      };

      const onPostSubmit = e => {
        e.preventDefault();
        setPostName("");
        setPostDescription("");
        setPostMonths("");
        setPostDays("");
      }

      const logout = () => {
        singOut();
        navigate('/login')
      }
          

    return(
      <>
      <Navbar/>
      
      <div className='container' style={{paddingTop: "80px"}}>
      <button className="btn btn-light float-right" onClick={logout}>Logout</button>
            <ul className="list-group">
              {error ? "Somethinig's wrong..." : (loading ? "loading" : data.map((item) => 
                  <AdminCard item={item} key={item.id}/>
              ))} 
            </ul>  
      </div>
      <form onSubmit={onPostSubmit}>
      
      <div className="container col-xxl-8 px-4 py-5">
      <h1>ADD NEW DESTINATION</h1>
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src="https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
            </div>
            <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Destination Name"
                onChange={(e) => setPostName(e.target.value)}
                value={postName}
                />
                </h1>
                <p className="lead">
                <textarea
                style={{height:"280px"}}
                type="text"
                className="form-control"
                placeholder="Description"
                onChange={(e) => setPostDescription(e.target.value)}
                value={postDescription}
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
                    <h3>
                    <input
                   type="text"
                   className="form-control"
                   placeholder="Available Months"
                   onChange={(e) => setPostMonths(e.target.value)}
                   value={postMonths}
                    />
                    </h3>
                    <h3>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Available Days"
                    onChange={(e) => setPostDays(e.target.value)}
                    value={postDays}
                    />
                    </h3>
                    <button type='submit' className="btn btn-sm btn-primary" onClick={postData}>
                      Post Data
                    </button>
                </div>
            </div>
            </div>
          </form>
      
    
      </>
    )

}

export default AdminPanel;