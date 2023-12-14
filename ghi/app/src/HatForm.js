import React, {useState, useEffect} from 'react';

function HatsForm() {
  const [hats, setHats] = useState([])
  const [locations, setLocations] = useState([])
  const [formData, setFormData] = useState({
    fabric: "",
    style_name: "",
    color: "",
    hat_picture_url: "",
  })

  const getLocationData = async () => {
    const url = 'http://localhost:8100/api/locations/';
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  useEffect(() => {
    getLocationData();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = 'http://localhost:8090/api/hats/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(locationUrl, fetchConfig);

    if (response.ok) {
        setFormData({
            fabric: "",
            style_name: "",
            color: "",
            hat_picture_url: "",
        });
      }
  }

  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setFormData({
      //Previous form data is spread (i.e. copied) into our new state object
      ...formData,

      //On top of the that data, we add the currently engaged input key and value
      [inputName]: value 
    });
  }
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new hat</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.style_name} placeholder="style_name" required type="text" name="style_name" id="style_name" className="form-control" />
              <label htmlFor="style_name">Style Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.fabric} placeholder="fabric" required type="text" name="fabric" id="fabric" className="form-control" />
              <label htmlFor="fabric">Fabric</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.color} placeholder="color" required type="text" name="color" id="color" className="form-control" />
              <label htmlFor="color">Fabric</label>
            </div>
            <button className="btn btn-primary">Create Hat</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HatsForm;