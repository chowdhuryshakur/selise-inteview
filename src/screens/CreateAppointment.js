import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function CreateAppointment() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const appointments = JSON.parse(localStorage.getItem('appointments')) || []
    localStorage.setItem('appointments', JSON.stringify([...appointments, data]))
    toast.success("Appointment is successfully submitted.")
    navigate('/')
  };

  return (
    <div className='container pt-5 d-flex justify-content-center space-y-3'>
      <div class="card" style={{width: "40rem"}}>
        <div className='p-2 d-flex justify-content-end'>
          <button type='button' class="btn btn-primary w-10" onClick={() => navigate('/')}>Back</button>
        </div>
        <div class="card-body">
          <h5 class="card-title">Create New Appointment</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group mt-3'>
              <label htmlFor="name">Name:</label>
              <input
                className='form-control'
                id="name"
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter your name"
              />
              {errors.name && <p className='text-danger'>{errors.name.message}</p>}
            </div>

            <div className='form-group mt-3'>
              <label htmlFor="gender">Gender:</label>
              <select id="gender" {...register('gender', { required: 'Gender is required' })} className='custom-select'>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className='text-danger'>{errors.gender.message}</p>}
            </div>

            <div className='form-group mt-3'>
              <label htmlFor="age">Age:</label>
              <input
                className='form-control'
                type="number"
                id="age"
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 0, message: 'Age must be at least 0' },
                  max: { value: 150, message: 'Age must be at most 150' }
                })}
                placeholder="Enter your age"
              />
              {errors.age && <p className='text-danger'>{errors.age.message}</p>}
            </div>

            <div className='form-group mt-3'>
              <label htmlFor="appointmentDateTime">Appointment Date/Time:</label>
              <input
                className='form-control'
                type="datetime-local"
                id="appointmentDateTime"
                {...register('appointmentDateTime', { required: 'Appointment date/time is required' })}
              />
              {errors.appointmentDateTime && <p className='text-danger'>{errors.appointmentDateTime.message}</p>}
            </div>

            <button type="submit" class="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAppointment
