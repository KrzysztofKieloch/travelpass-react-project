import React from 'react';
import {Link} from 'react-router-dom';

function Card({item}) {

    return (
        <>
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                <img className="bd-placeholder-img card-img-top" src={`http://localhost:1337${item.attributes?.image?.data?.attributes.url}`} width="80%" height="105" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"/>
                    <div className="card-body">
                    <h3 className="card-text">{item.attributes.name}</h3>                
                        <div className=" align-items-center">
                        <div className="btn-group">
                        <Link className="link" to={`/destinations/${item.id}`}>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Read more</button>
                        </Link>
                        </div>
                        </div>
                    </div>
                </div>   
                </div>  
            </>
        )
}
export default Card;