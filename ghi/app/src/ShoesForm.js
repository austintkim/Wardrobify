import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const initialData = {
  model_name:"",
  manufacturer:"",
  color:"",
  picture_url:"",
  bin:"",

}

function ShoesForm() {
    const navigate = useNavigate();

    const [bins, setBins] = useState([]);

    const [createdShoe, setCreatedShoe] = useState(false);

    const [formData, setFormData] = useState(initialData);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit = async (event) => {
      event.preventDefault();

      const shoeUrl = 'http://localhost:8080/api/shoes/';

      const fetchConfig = {
          method: "post",
          body: JSON.stringify(formData),
          headers: {
              'Content-Type': 'application/json',
          },
      };

      const response = await fetch(shoeUrl, fetchConfig);

      if (response.ok) {
          // navigate("/attendees")
          setFormData(initialData)
          setCreatedShoe(true);
      }
  }

// CSS classes for rendering
  let spinnerClasses = 'd-flex justify-content-center mb-3';
  let dropdownClasses = 'form-select d-none';
  if (bins.length > 0) {
    spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
    dropdownClasses = 'form-select';
  }

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';
  if (createdShoe) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new shoe!</h1>
                  <form className={formClasses} onSubmit={handleSubmit} id="create-shoe-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} placeholder="Model Name" required type="text" name = "model_name" id="model_name" className="form-control" value={formData.model_name}/>
                        <label htmlFor="model_name">Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} placeholder="Manufacturer" required type="text" name = "manufacturer" id="manufacturer" className="form-control" value={formData.manufacturer}/>
                        <label htmlFor="manufacturer">Manufacturer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} placeholder="Color" required type="text" name = "color" id="color" className="form-control" value={formData.color}/>
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormChange} placeholder="Picture Url" required type="url" name = "picture_url" id="picture_url" className="form-control" value={formData.picture_url}/>
                        <label htmlFor="picture_url">Picture Url</label>
                    </div>
                    <div className={spinnerClasses} id="loading-bins-spinner">
                      <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                <div className="mb-3">
                  <select onChange={handleFormChange}required name = "bin" id="bin" className={dropdownClasses}>
                    <option value="">Choose a bin</option>
                    {bins.map(bin => {
                        return (
                            <option key={bin.href} value={bin.href}>
                                {bin.closet_name}
                            </option>
                        )
                    })}
                  </select>
                </div>
                    <button className="btn btn-lg btn-primary">Submit my masterpiece</button>
                  </form>
                  <div className={messageClasses} id="success-message">
                    Congratulations! You're a shoe influencer!
                  </div>
                </div>
              </div>
              </div>
              </div>
    );
}

export default ShoesForm
