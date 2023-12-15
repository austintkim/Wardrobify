import {useState, useEffect} from 'react';

function ShoesList() {
  const [shoes, setShoes] = useState([]);
  const [deletedShoe, setDeletedShoe] = useState(false);

  const getData = async () => {
    const request = await fetch('http://localhost:8080/api/shoes/');
    if (request.ok) {
      const resp = await request.json();
      setShoes(resp.shoes);
    } else {
      throw new Error("Failed to retrieve shoes data");
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleDelete = async (id) => {
    const request = await fetch(`http://localhost:8080/api/shoes/${id}`, { method: "DELETE"});
    const resp = await request.json();
    setDeletedShoe(true);
    getData();
  }

  let messageClasses = 'alert alert-danger d-none mb-0';
  if (deletedShoe) {
    messageClasses = 'alert alert-danger mb-0';
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
      <div className={messageClasses} id="danger-message">
          We hope you didn't need that shoe...
      </div>
    </div>
    );
}

export default ShoesList;
