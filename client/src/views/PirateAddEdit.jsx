import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const PirateAddEdit = () => {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [treasureChests, setTreasureChests] = useState(0);
    const [catchPhrase, setCatchPhrase] = useState("");
    const [position, setPosition] = useState("Captain");
    const [pegLeg, setPegLeg] = useState(false);
    const [eyePatch, setEyePatch] = useState(false);
    const [hookHand, setHookHand] = useState(false);


    const [serverError, setServerError] = useState("");


    const { id } = useParams()

    const navigate = useNavigate();

    useEffect(() => {
        const url = `http://localhost:8000/api/pirates/${id}`;
        if (id !== undefined) { //Edit
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
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setServerError("")

        if (id !== undefined) { //Edit
            const url = `http://localhost:8000/api/pirates/${id}`;

            axios.put(url, {
                name, imageUrl, treasureChests, catchPhrase,
                position, pegLeg, eyePatch, hookHand
            })
                .then(response => {
                    console.log("axios res - ", response.data);
                    navigate("/")

                }).catch(err => {
                    console.log("ERR ^^^^^^^^^^^^^", err);
                    if ("response" in err) {
                        if ("data" in err.response && "errors" in err.response.data) {
                            let errMsg = ""
                            Object.values(err.response.data.errors).forEach((val) => errMsg += `${val.message}\n`)
                            setServerError(errMsg)
                        } else { // Bad Request
                            setServerError("Error updating Pirate Details")
                        }
                    } else { //Network Error
                        setServerError("Error updating Pirate Details")
                    }
                });
        } else { //Add
            const url = `http://localhost:8000/api/pirates`;

            axios.post(url, {
                name, imageUrl, treasureChests, catchPhrase,
                position, pegLeg, eyePatch, hookHand
            })
                .then(response => {
                    console.log("axios res - ", response.data);
                    navigate("/")

                }).catch(err => {
                    console.log("ERR ^^^^^^^^^^^^^", err);
                    if ("response" in err) {
                        if ("data" in err.response && "errors" in err.response.data) {
                            let errMsg = ""
                            Object.values(err.response.data.errors).forEach((val) => errMsg += `${val.message}\n`)
                            setServerError(errMsg)
                        } else { // Bad Request
                            setServerError("Error adding Pirate Details")
                        }
                    } else { //Network Error
                        setServerError("Error adding Pirate Details")
                    }
                });
        }
    }

    return (
        <div className='row d-flex justify-content-center'>
            <div className="d-flex bg-dark m-2 p-2 w-75 justify-content-between align-items-center" >
                {id === undefined ?
                    <h1>Add Pirate </h1> : <h1>Edit Pirate</h1>
                }
                <Link to={`/`} className="btn btn-warning">Crew Board</Link>
            </div>
            <div className=" bg-dark m-2 p-2 w-75 " >

                <form onSubmit={handleSubmit} className="row d-flex justify-content-center">

                    <div className="bg-dark m-2 p-3 w-50 " >
                        <div className="form-group">
                            <label htmlFor="name" className="form-label text-white">Name </label>
                            <input type="text" name="name" id="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name} className="rounded form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUrl" className="form-label text-white">Image URL </label>
                            <input type="text" name="imageUrl" id="imageUrl"
                                onChange={(e) => setImageUrl(e.target.value)}
                                value={imageUrl} className="rounded form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="treasureChests" className="form-label text-white"># of Treasure Chests </label>
                            <input type="number" name="treasureChests" id="treasureChests"
                                onChange={(e) => setTreasureChests(e.target.value)}
                                value={treasureChests} className="rounded form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="catchPhrase" className="form-label text-white">Pirate Catch Phrase </label>
                            <input type="text" name="catchPhrase" id="catchPhrase"
                                onChange={(e) => setCatchPhrase(e.target.value)}
                                value={catchPhrase} className="rounded form-control" />
                        </div>
                        <div className="form-group">

                            <label htmlFor="position" className="form-label text-white">Crew Position</label>
                            <select name="position" id="position"
                                onChange={e => setPosition(e.target.value)}
                                value={position} className="rounded me-4 form-control" >
                                <option value="Captain">Captain</option>
                                <option value="First Mate">First Mate</option>
                                <option value="Quarter Monkey">Quarter Monkey</option>
                                <option value="Boatswain">Boatswain</option>
                                <option value="Powder Monkey">Powder Monkey</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" checked={pegLeg}
                                onChange={e => setPegLeg(e.target.checked)} className="me-2" />
                            <label htmlFor="pegLeg" className="text-white me-2 form-label">Peg Leg</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" checked={eyePatch}
                                onChange={e => setEyePatch(e.target.checked)} className="me-2" />
                            <label htmlFor="eyePatch" className="text-white me-2 form-label">Eye Patch</label>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" checked={hookHand}
                                onChange={e => setHookHand(e.target.checked)} className="me-2" />
                            <label htmlFor="hookHand" className="text-white me-2 form-label">Hook Hand</label>
                        </div>

                        {id === undefined ?
                            <input type="submit" value="Add Pirate" /> : <input type="submit" value="Edit Pirate" />
                        }


                    </div>
                    
                    {serverError ? <pre className="text-danger text-center">{serverError}</pre> : ""}
                </form>

            </div>
        </div>
    )
}

export default PirateAddEdit