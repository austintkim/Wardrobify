import React, { useEffect, useState } from 'react';

function HatsList() {
    const [hats, setHats] = useState([]);
    const [error, setError] = useState(null);

    const getHatsData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/hats/');

            if (response.ok) {
                const data = await response.json();
                setHats(data.hats);
            } else {
                setError('Failed to fetch hats data');
            }
        } catch (error) {
            setError('An error occurred while fetching hats data');
        }
    };

    useEffect(() => {
        getHatsData();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDelete = async (id) => {
        const request = await fetch(`http://localhost:8080/api/hats/${id}`, { method: "DELETE"});
        const resp = await request.json();
        getHatsData();
      }

    return (
        <div>
        <h1>Hats</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>style_name</th>
                        <th>fabric</th>
                        <th>color</th>
                        <th>hat_picture_url</th>
                        <th>location</th>
                        <th>Closet</th>
                    </tr>
                </thead>
                <tbody>
                    {hats.map(hat => {
                        return (
                            <tr key={hat.id}>
                                <td>{hat.style_name}</td>
                                <td>{hat.fabric}</td>
                                <td>{hat.color}</td>
                                <td>
                                    <img src={hat.hat_picture_url} alt = {hat.style_name} width = "50" height="50"></img>
                                </td>
                                <td>{hat.location}</td>
                                {/* <td>{hat.location.closet_name}</td> */}
                                <td><button onClick={()=> {
                                    handleDelete(hat.id)
                                }} className="btn btn-danger">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default HatsList;
