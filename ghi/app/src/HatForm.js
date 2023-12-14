import React, {useState, useEffect} from 'react';
// import { useNavigate } from "react-router-dom";

const initialData = {
  fabric: "",
  style_name: "",
  color: "",
  hat_picture_url: "",
  location:"",
}


function HatsForm() {
  // const navigate = useNavigate();
  const [CreatedHat, setCreatedHat] = useState([false]);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  
  const getLocationData = async () => {
    const url = 'http://localhost:8100/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        setLocations(data.locations);
    }
}  
  
  // const getHatData = async () => {
  //     const url = 'http://localhost:8090/api/hats/';
  //     const response = await fetch(url);

  //     if (response.ok) {
  //       const data = await response.json();
  //       setLocations(data.locations);
  //     }
  //   }

    useEffect(() => {
      getLocationData();
    }, []);


    const handleSubmit = async (event) => {
      
      event.preventDefault();
      const newErrors = {};
      if (!formData.color) newErrors.color = 'Color is required';
      if (!formData.hat_picture_url) newErrors.hat_picture_url = 'Picture URL is required';
      if (!formData.location) newErrors.location = 'Location is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      document.querySelector("[name='location']").required = true;
      const hatUrl = 'http://localhost:8090/api/hats/';
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(hatUrl, fetchConfig);

      if (response.ok) {
          setFormData(initialData)
          setCreatedHat(true);
        }
      
    } 

    const handleFormChange = (event) => {
      setFormData ({...formData, 
        [event.target.name]: event.target.value
      })
    }

    // CSS classes for rendering
    let dropdownClasses = 'form-select d-none';
    if (locations && locations.length > 0) {
      dropdownClasses = 'form-select';
    }

    return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new hat</h1>
              <form onSubmit={handleSubmit} id="create-hat-form">
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
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handleFormChange} placeholder="hat_picture_url" required type="url" name="hat_picture_url" id="hat_picture_url" className="form-control" value={formData.hat_picture_url} />
                  <label htmlFor="hat_picture_url">Picture Url</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleFormChange} required name="location" id="location" className={`form-control ${dropdownClasses}`}>
                    <option value="">Choose a location</option>
                    {(locations || []).map(location => {
                      return (
                        <option key={location.href} value={location.href}>
                          {location.closet_name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create Hat</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default HatsForm;


//   return (
//     <div className="container">
//       <div className="row">
//         <div className="offset-3 col-6">
//           <div className="shadow p-4 mt-4">
//             <h1>Create a new hat</h1>
//             <form onSubmit={handleSubmit} id="create-hat-form">
//               <div className="form-floating mb-3">
//                 <input onChange={handleFormChange} value={formData.style_name} placeholder="style_name" required type="text" name="style_name" id="style_name" className="form-control" />
//                 <label htmlFor="style_name">Style Name</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input onChange={handleFormChange} value={formData.fabric} placeholder="fabric" required type="text" name="fabric" id="fabric" className="form-control" />
//                 <label htmlFor="fabric">Fabric</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input onChange={handleFormChange} value={formData.color} placeholder="color" required type="text" name="color" id="color" className="form-control" />
//                 <label htmlFor="color">Color</label>
//               </div>
//               <div className="form-floating mb-3">
//                         <input onChange={handleFormChange} placeholder="hat_picture_url" required type="url" name = "hat_picture_url" id="hat_picture_url" className="form-control" value={formData.hat_picture_url}/>
//                         <label htmlFor="hat_picture_url">Picture Url</label>
//               </div>
//               <div className="mb-3">
//                   <select onChange={handleFormChange}required name = "location" id="location" className="form-control" className={dropdownClasses}>
//                     <option value="">Choose a location</option>
//                     {(locations || []).map(location => {
//                         return (
//                             <option key={location.href} value={location.href}>
//                                 {location.closet_name}
//                             </option>
//                         )
//                     })}
//                   </select>
//               </div>
//                 <button className="btn btn-primary">Create Hat</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HatsForm;