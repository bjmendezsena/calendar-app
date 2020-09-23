import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import { FormCalendar } from './FormCalendar';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { eventStartaddNew, eventClearActiveEvent, eventStartUpdate } from '../../actions/events';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};



Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: endDate.toDate()
}

export const CalendarModal = () => {

  const [dateStart, setdateStart] = useState(now.toDate());
  const [dateEnd, setdateEnd] = useState(endDate.toDate());
  const [titleValid, settitleValid] = useState(true);

  const [formValue, setformValue] = useState(initEvent);

  const { notes, title, start, end } = formValue;

  const dispatch = useDispatch();

  const { modalOpen } = useSelector(state => state.ui);
  const { activeEvent } = useSelector(state => state.calendar);


  useEffect(() => {

    if (activeEvent) {
      setformValue(activeEvent);
    }else{
      setformValue(initEvent);
    }
  }, [activeEvent])


  const handleInputChange = ({ target }) => {
    setformValue({
      ...formValue,
      [target.name]: target.value
    });
  }



  const handleStartDateChange = (e) => {
    setdateStart(e);
    setformValue({
      ...formValue,
      start: e
    });
  }
  const handleEndDateChange = (e) => {
    setdateEnd(e);
    setformValue({
      ...formValue,
      end: e
    });
  }

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setformValue(initEvent);
  }


  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
    }

    if (title.trim().length < 2) {
      return settitleValid(false);
    }

    if (activeEvent) {

      dispatch(eventStartUpdate(formValue));

    } else {

      dispatch(eventStartaddNew(formValue));
      
    }

    settitleValid(true);
    closeModal();
  }


  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      closeTimeoutMS={200}
      overlayClassName="modal-fondo"
    >
      <h1> {(activeEvent)? 'Editar evento': 'Nuevo evento'} </h1>
      <hr />

      <FormCalendar
        handleSubmitForm={handleSubmitForm}
        handleStartDateChange={handleStartDateChange}
        dateStart={(start)?start:dateStart}
        isTitleValid={titleValid}
        handleEndDateChange={handleEndDateChange}
        dateEnd={(end)?end:dateEnd}
        title={title}
        handleInputChange={handleInputChange}
        notes={notes}
        cerrar = {closeModal}
        userEventId = {(activeEvent)?activeEvent.user._id: null}
      />
    </Modal>
  )
}
