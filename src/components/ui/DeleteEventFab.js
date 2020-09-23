import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = ({ classname = 'animate__flipInX' }) => {

    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(eventStartDelete());
    }

    return (
        <button
            onClick={handleDelete}
            className={`btn btn-danger fab-danger animate__animated ${classname}`}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
        </button>
    )
}
