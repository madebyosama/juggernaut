import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getAuth from '../../services/auth.service';

toast.configure();

export default function ({ closeModal }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log(user);
    setUser(getAuth());
  }, []);

  const initialData = {
    make: '',
    year: '2015',
    trailer_axle: '2 Axle',
    registeration_number: '',
    chasis_number: '',
    engine_number: '',
    insurance_policy: '',
    client: {
      id: '',
      name: '',
    },
    approved_by: '',
    rejected_by: '',
  };
  const [formValues, setFormValues] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});
  const [pics, setPics] = useState('');
  const [docs, setDocs] = useState('');

  const validate = (vehicle) => {
    const errors = {};
    if (!vehicle.make) {
      errors.make = 'Make is required';
    }

    return errors;
  };

  async function registerVehicle(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const vehicle = {
      registeration_number: formValues.registeration_number,
      make: formValues.make,
      year: formValues.year,
      trailer_axle: formValues.trailer_axle,
      chasis_number: formValues.chasis_number,
      engine_number: formValues.engine_number,
      insurance_policy: formValues.insurance_policy,
      upload_documents: docs,
      upload_images: pics,
      client: {
        id: user.company_id,
        name: user.company_name,
      },
      approved_by: '0',
      rejected_by: '0',
    };
    console.log(vehicle);
    const res = await axios.post('/vehicles', vehicle);
    if (
      res.data.status === 'no' &&
      res.data.message === 'Registeration Number is already registered!'
    ) {
      setFormErrors({
        ...formErrors,
        registeration_number: 'Registeration Number is already registered!',
      });
    } else if (res.data.status === 'ok') {
      closeModal(false);
      console.log(res);
      setFormValues(initialData);
      setFormErrors({});
      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      window.location.reload(false);
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    const { name, value, placeholder } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (!e.target.value) {
      setFormErrors({ ...formErrors, [name]: `${placeholder} is required` });
    }
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  const upload = (files, type) => {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'juggernaut');

    axios
      .post('https://api.cloudinary.com/v1_1/dnvsynb1c/image/upload', formData)
      .then((Response) => {
        if (type === 'pic') {
          setPics(Response.data.url);
        } else {
          setDocs(Response.data.url);
        }
      });
  };

  return (
    <div className='modal-background flex flex-item bg-pending'>
      <div
        className='modal-container mx-144 flex-item absolute modal-container-animation modal-container-scroll'
        style={{ backgroundColor: 'none', width: '550px' }}
      >
        <div className='pt-8 pb-16 modal-content'>
          <div className='flex flex-item space-between px-40 py-16'>
            <div>
              <h2>Add New Vehicle</h2>
            </div>
            <button
              onClick={() => closeModal(false)}
              className='secondary-button'
            >
              Close
            </button>
          </div>
          <div>
            <form onSubmit={registerVehicle} className='px-40'>
              <div className='flex pb-16'>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Make
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='make'
                    value={formValues.make}
                    type='text'
                    placeholder='Daewo'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p className={formErrors.make ? 'errorMessage' : 'hideMe'}>
                    {formErrors.make}
                  </p>
                </div>
              </div>
              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    Year
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <select
                    name='year'
                    value={formValues.year}
                    type='text'
                    placeholder='Year'
                    onChange={handleChange}
                    className='full-width'
                  >
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>

                  <p className={formErrors.year ? 'errorMessage' : 'hideMe'}>
                    {formErrors.year}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Trailer Axle
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <select
                    name='trailer_axle'
                    value={formValues.trailer_axle}
                    type='text'
                    placeholder='2 Axle'
                    onChange={handleChange}
                    className='full-width'
                  >
                    <option>2 Axle</option>
                    <option>3 Axle</option>
                    <option>4 Axle</option>
                    <option>5 Axle</option>
                    <option>6 Axle</option>
                  </select>

                  <p
                    className={
                      formErrors.trailer_axle ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.trailer_axle}
                  </p>
                </div>
              </div>
              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    Registeration Number
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='registeration_number'
                    value={formValues.registeration_number}
                    type='text'
                    placeholder='i.e. ABC12345.....'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.registeration_number
                        ? 'errorMessage'
                        : 'hideMe'
                    }
                  >
                    {formErrors.registeration_number}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Chasis Number
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='chasis_number'
                    value={formValues.chasis_number}
                    type='text'
                    placeholder='i.e. ABC12345.....'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.chasis_number ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.chasis_number}
                  </p>
                </div>
              </div>
              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    Vehicle Picture
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='upload_images'
                    value={formValues.upload_images}
                    type='file'
                    placeholder='Vehicle Picture'
                    onChange={(event) => {
                      upload(event.target.files, 'pic');
                    }}
                    className='full-width'
                    multiple
                    accept='image/png, image/jpg, image/jpeg'
                  />
                  <p
                    className={
                      formErrors.upload_images ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.upload_images}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Registeration Document
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='upload_documents'
                    // value={formValues.upload_documents}
                    type='file'
                    placeholder='Registeration Documents'
                    onChange={(event) => {
                      upload(event.target.files, 'docs');
                    }}
                    className='full-width'
                    multiple
                    accept='image/png, image/jpg, image/jpeg'
                  />
                  <p
                    className={
                      formErrors.upload_documents ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.upload_documents}
                  </p>
                </div>
              </div>
              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    Engine Number
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='engine_number'
                    value={formValues.engine_number}
                    type='text'
                    placeholder='i.e. ABC12345.....'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.engine_number ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.engine_number}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Insurance Policy
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <textarea
                    name='insurance_policy'
                    value={formValues.insurance_policy}
                    type='text'
                    placeholder='i.e. ABC12345.....'
                    onChange={handleChange}
                    // className='full-width'
                  />
                  <p
                    className={
                      formErrors.insurance_policy ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.insurance_policy}
                  </p>
                </div>
              </div>

              <input type='submit' value='Submit' className='primary-button' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
