import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());

    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">{name}</span>
            <button
                onClick={handleLogout}
                className="btn btn-outline-danger animate__animated animate__fadeIn"
            >
                <i className="fas fa-sign-out-alt"></i>
                <span>Cerrar sesión</span>
            </button>
        </div>
    )
}
