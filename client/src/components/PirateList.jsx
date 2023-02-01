import React from 'react'
import { Link } from 'react-router-dom';

const PirateList = ({ pirateList, onDelete }) => {
    console.log("Pirates ---> ", pirateList)

    const imgStyle = {
        width : "75px"
    }

    return (

        <table className='table-dark'>
            <tbody>
                {
                    pirateList.map((item, index) =>
                        <tr key={index} className="text-center">
                            <td><img src={item.imageUrl} alt="Pirate Pic" className='img-thumbnail' style={imgStyle} /></td>
                            <td className="px-5">{item.name}</td>
                            <td>
                                <Link to={`/pirates/${item._id}`} className="btn btn-success me-4">View</Link>
                                <Link to={`/pirates/${item._id}/edit`} className="btn btn-primary me-4">Edit</Link>
                                <input type="button" className="btn btn-danger" value="Walk the Plank" 
                                    onClick={(e) => onDelete(item._id)} />
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>

    )
}

export default PirateList