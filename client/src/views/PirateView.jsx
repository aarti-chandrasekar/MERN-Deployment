import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const PirateView = () => {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [treasureChests, setTreasureChests] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [position, setPosition] = useState("");
    const [pegLeg, setPegLeg] = useState(false);
    const [eyePatch, setEyePatch] = useState(false);
    const [hookHand, setHookHand] = useState(false);

    const [serverError, setServerError] = useState("");

    const { id } = useParams()
    const url = `http://localhost:8000/api/pirates/${id}`;

    const imgStyle = {
        width: "250px"
    }

    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log("axios res - ", response.data);
                setName(response.data.pirate.name)
                setImageUrl(response.data.pirate.imageUrl)
                setTreasureChests(response.data.pirate.treasureChests)
                setCatchPhrase(response.data.pirate.catchPhrase)
                setPosition(response.data.pirate.position)
                setPegLeg(response.data.pirate.pegLeg)
                setEyePatch(response.data.pirate.eyePatch)
                setHookHand(response.data.pirate.hookHand)

                setServerError("")
            }).catch(err => {
                console.log(err);
                setServerError("Error loading Pirate Details")
            });
    }, [])



    return (
        <div className='row d-flex justify-content-center text-white'>
            <div className="d-flex bg-dark  p-2 w-75 justify-content-between align-items-center" >
                <h1>{name}</h1>
                <Link to={`/`} className="btn btn-warning">Home</Link>
            </div>

            {serverError ? <p className="text-danger text-center">{serverError}</p> : ""}

            <div className="d-flex bg-dark  p-2 w-75 justify-content-between 
                m-3 gap-5 align-items-center text-center">

                {/* <!-- Left Container --> */}
                <div className="container bg-dark">
                    <img src={imageUrl} alt="Pirate Pic" className='img-thumbnail' style={imgStyle} />
                    <h2>{`"${catchPhrase}"`}</h2>


                </div>

                {/* <!-- Right Container --> */}
                <div className="container bg-dark" >
                    <h2>About</h2>
                    <h4 className="text-start"> Position : {position}</h4>
                    <h4 className="text-start"> Treasures : {treasureChests}</h4>
                    <h4 className="text-start"> Peg Leg : {pegLeg ? "Yes" : "No"}</h4>
                    <h4 className="text-start"> Eye Patch : {eyePatch ? "Yes" : "No"}</h4>
                    <h4 className="text-start"> Hook Hand : {hookHand ? "Yes" : "No"}</h4>

                </div>
            </div>
        </div>
    )
}

export default PirateView