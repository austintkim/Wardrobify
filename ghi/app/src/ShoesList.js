import {useState, useEffect} from 'react';

function ShoesList() {
  const [shoes, setShoes] = useState([]);

  const getData = async () => {
    const request = await fetch('http://localhost:8080/api/shoes/');
    if (request.ok) {
      const resp = await request.json();
      setShoes(resp.shoes);
    } else {
      console.error("Request Error");
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleDelete = async (id) => {
    const request = await fetch(`http://localhost:8080/api/shoes/${id}`, { method: "DELETE"});
    const resp = await request.json();
    getData();
  }

  return(
    <div>
      <h1>Shoes</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Manufacturer</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Bin #</th>
            <th>Closet</th>
          </tr>
        </thead>
        <tbody>
          {
            shoes.sort((a,b) => (a.id-b.id)).map(shoe => {
              console.log(shoes)
              return(<tr key={shoe.id}>
                <td>{shoe.model_name}</td>
                <td>{shoe.manufacturer}</td>
                <td>{shoe.color}</td>
                <td>
                    <img src={shoe.picture_url} alt = {shoe.model_name} width = "50" height="50"></img>
                </td>
                <td>{shoe.bin.bin_number}</td>
                <td>{shoe.bin.closet_name}</td>
                <td><button onClick={()=> {
                    handleDelete(shoe.id)
                }} className="btn btn-danger">Delete</button></td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </div>
    );
}

export default ShoesList;
