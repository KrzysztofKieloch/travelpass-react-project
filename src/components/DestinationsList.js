import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function DestinationsList({item}) {

    const deleteDataById = async (id) => {
        axios.delete("http://localhost:1337/api/destinations/" + id, 
        { 
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        })
        .then(result => { 
            alert("Destination deleted. Refresh the page.")
        });
      }
    

    return (
      
            <li className="list-group-item float-left"><strong>{item.attributes.name}</strong>
            <Link className='link' to={`/destinations_edit/${item.id}`}>
            <button className='btn btn-success float-left'>Edit</button>
            </Link>
            <button className='btn btn-danger float-right' onClick={() => deleteDataById(item.id)}>Delete</button>
            </li>

    )
}
export default DestinationsList;