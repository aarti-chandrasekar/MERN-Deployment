import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import PirateList from '../components/PirateList'

const Main = () => {
    const [pirateList, setPirateList] = useState([]);
    const [refreshListFlag, setRefreshListFlag] = useState(0);

    const [serverError, setServerError] = useState("");

    useEffect(() => {
        const url = `http://localhost:8000/api/pirates`;
        axios.get(url)
            .then(response => {
                console.log("axios res - ", response.data);
                setPirateList(response.data.pirates)
                setServerError("")
            }).catch(err => {
                console.log(err);
                setServerError("Error loading Pirate List")
            });
    }, [refreshListFlag])


    const onDelete = (id) => {
        const url = `http://localhost:8000/api/pirates/${id}`;
        axios.delete(url)
            .then(response => {
                console.log("axios res - ", response.data);
                setRefreshListFlag(refreshListFlag+1)
            }).catch(err => {
                console.log(err);
                setServerError("Error deleting Pet ")
            });
    }    
    

    return (
        <div className='row d-flex justify-content-center'>
            <div className="d-flex bg-dark m-2 p-2 w-75 justify-content-between align-items-center" >
                <h1>Pirate Crew</h1>
                <Link to={`/pirates/new`} className="btn btn-warning">Add Pirate</Link>
            </div>
                {serverError ? <p className="text-danger text-center">{serverError}</p> : ""}
            <div className="d-flex bg-dark m-2 p-2 w-75 justify-content-between align-items-center" >

                <PirateList pirateList={pirateList} onDelete={onDelete} />
            </div>
        </div>
    )
}

export default Main