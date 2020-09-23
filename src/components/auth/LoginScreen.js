import React from 'react';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin, starRegister } from '../../actions/auth';
import Swal from 'sweetalert2';





export const LoginScreen = (props) => {

    if(props.history.location.pathname === '/login'){
        document.querySelector("body").style.background = '-webkit-linear-gradient(left, #a445b2, #4254fa)';
        document.querySelector("html").style.background = '-webkit-linear-gradient(left, #a445b2, #4254fa)';
        document.querySelector("*").style.background = '-webkit-linear-gradient(left, #a445b2, #4254fa)';
    }
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const { lEmail, lPassword } = formLoginValues;

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
    });

    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (rPassword1 !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }

        dispatch(starRegister(rName, rEmail, rPassword1));
    }

    const handleSelectForm = ({ target }) => {
        const loginForm = document.querySelector("form.login");
        const loginText = document.querySelector(".title-text .login");
        const id = target.id;
        if (id === 'signup') {

            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        } else {

            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";

        }
    }

    const clickLink = () => {
        const signupBtn = document.querySelector("label.signup");
        signupBtn.click();
    }




    return (
        <div className="wrapper animate__animated animate__fadeIn">
            <div className="title-text">
                <div className="title login">Iniciar sesión</div>
                <div className="title signup">Registrarse</div>
            </div>
            <div className="form-container">
                <div className="slide-controls">
                    <input type="radio" name="slider" onChange={handleSelectForm} id="login" defaultChecked={true} />
                    <input type="radio" name="slider" onChange={handleSelectForm} id="signup" />
                    <label htmlFor="login" className="slide login">Iniciar sesion</label>
                    <label htmlFor="signup" className="slide signup">Registrarse</label>
                    <div className="slide-tab"></div>
                </div>
                <div className="form-inner">
                    <form className="login" onSubmit={handleLogin}>
                        <div className="field">
                            <input
                                type="text"
                                placeholder="Email"
                                name="lEmail"
                                value={lEmail}
                                required={true}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                required={true}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div id="olvidado" className="pass-link"><p href="#">¿Has olvidado tu contraseña?</p></div>
                        <div className="field">
                            <input type="submit" value="Iniciar sesión" />
                        </div>
                        <div onClick={clickLink} className="signup-link"><p href="#">¿Aún no estás registrado?</p></div>
                    </form>
                    <form className="signup" onSubmit={handleRegister}>
                        <div className="field">
                            <input type="text" onChange={handleRegisterInputChange} placeholder="Nombre" name="rName" value={rName} required={true} />
                        </div>
                        <div className="field">
                            <input type="text" onChange={handleRegisterInputChange} placeholder="Email" name="rEmail" value={rEmail} required={true} />
                        </div>
                        <div className="field">
                            <input type="password" onChange={handleRegisterInputChange} placeholder="Contraseña" name="rPassword1" value={rPassword1} required={true} />
                        </div>
                        <div className="field">
                            <input type="password" onChange={handleRegisterInputChange} placeholder="Confirma tu contraseña" name="rPassword2" value={rPassword2} required={true} />
                        </div>
                        <div className="field">
                            <input type="submit" value="Registrarse" />
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
