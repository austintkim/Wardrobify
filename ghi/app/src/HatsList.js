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

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Hat</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{hat.import_href}</td>
                            <td>{hat.id}</td>
                            <td>{hat.style_name}</td>
                            <td>{hat.fabric}</td>
                            <td>{hat.color}</td>
                            <td>{hat.location}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default HatsList;
