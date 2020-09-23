import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-datetime-picker';
import { useSelector } from 'react-redux';

export const FormCalendar = ({ handleSubmitForm,
    handleStartDateChange,
    dateStart,
    handleEndDateChange,
    dateEnd,
    title = '',
    handleInputChange,
    isTitleValid = true,
    notes = '',
    cerrar,
    userEventId }) => {

    const { uid } = useSelector(state => state.auth);

    let readOnly = false;
    if ((userEventId) && (uid !== userEventId)) {
        readOnly = true;
    }

    return (
        <form
            onSubmit={handleSubmitForm}
            className="container"
        >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                {
                    (!readOnly) ?
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={dateStart}
                            minDate={moment().minutes(0).seconds(0).hours(0).toDate()}
                            className="form-control"
                        />
                        : <input
                            type="text"
                            value={moment(dateStart).format('MMMM Do YYYY, h:mm:ss a')}
                            className={`form-control`}
                            readOnly={readOnly}
                        />
                }
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                {
                    (!readOnly) ?
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={dateEnd}
                            minDate={dateStart}
                            className="form-control"
                        />
                        : <input
                            type="text"
                            value={moment(dateEnd).format('MMMM Do YYYY, h:mm:ss a')}
                            className={`form-control`}
                            readOnly={readOnly}
                        />

                }
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input
                    type="text"
                    className={(isTitleValid) ? 'form-control': 'form-control is-invalid'}
                    placeholder="Título del evento"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                    readOnly={readOnly}
                    autoComplete="off"
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea
                    type="text"
                    className="form-control"
                    placeholder="Notas"
                    value={notes}
                    onChange={handleInputChange}
                    readOnly={readOnly}
                    rows="5"
                    name="notes"
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            {
                (readOnly) ?
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                        onClick={cerrar}
                    >
                        <i className="far fa-save"></i>
                        <span> Cerrar</span>
                    </button>
                    :
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
            }



        </form>
    )
}

FormCalendar.prototype = {
    handleSubmitForm: PropTypes.func.isRequired,
    handleStartDateChange: PropTypes.func.isRequired,
    handleEndDateChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    isTitleValid: PropTypes.bool.isRequired,
    notes: PropTypes.string.isRequired,
}
