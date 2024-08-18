import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { CgMathPlus } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Badge, Modal } from 'antd';
import dayjs from 'dayjs';

function Dashboard() {
    const { year, month } = useParams();
    console.log(year, month)
    const navigate = useNavigate()
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(dayjs());

    useEffect(() => {
        setAppointments(JSON.parse(localStorage.getItem('appointments')))
        console.log(JSON.parse(localStorage.getItem('appointments')))
    }, [])

    useEffect(() => {
        if (year && month) {
            setCurrentDate(dayjs(`${year}-${month}-01`))
            console.log(dayjs(`${year}-${month}-01`))
        }
    }, [year, month])

    const showModal = (appointment) => {
        setSelectedEvent(appointment);
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const dateCellRender = (value) => {
        const currentDate = value.format('YYYY-MM-DD');
        const listData = appointments?.filter(appointment => appointment.appointmentDateTime.split('T')[0] === currentDate).sort((a, b) => new Date(b.appointmentDateTime) - new Date(a.appointmentDateTime))
        
        return (
          <ul className="list-group">
            {listData?.map((item, index) => (
              <li key={index} className="list-group-item" onClick={() => showModal(item)}>
                <Badge status="success" text={`${item.name} - ${moment(item.appointmentDateTime).format('HH:mm')}`} />
              </li>
            ))}
          </ul>
        );
      };
      const onPanelChange = (newValue) => {
        setCurrentDate(newValue);
      };
    return (
        <div className='container'>
                <div className='d-flex mt-5 justify-content-between'>
                    <h3 className='card-title'>Appointment Calendar</h3>
                    <button class="btn btn-outline-primary" onClick={() => navigate('/createAppointment')}> <CgMathPlus/> Create New Appointment</button>
                </div>
                <div className='mt-4 card'>
                    <div className='card-body'> 
                        <Calendar 
                            // value={routeDate}
                            value={currentDate} 
                            onPanelChange={onPanelChange}
                            cellRender={dateCellRender}
                        />
                    </div>
                    {selectedEvent && (
                        <Modal title="Appointment Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <p><strong>Name:</strong> {selectedEvent.name}</p>
                        <p><strong>Gender:</strong> {selectedEvent.gender}</p>
                        <p><strong>Age:</strong> {selectedEvent.age}</p>
                        <p><strong>Appointment Date and Time:</strong> {moment(selectedEvent.appointmentDateTime).format('Do MMMM YYYY, h:mm A')}</p>
                        </Modal>
                    )}
                </div>
        </div>
      );
}

export default Dashboard


