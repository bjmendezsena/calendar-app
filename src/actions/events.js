import { types } from "../types/types";
import { fetchConToken } from '../helpers/fetch';
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from 'sweetalert2';
const url = 'events';


export const eventStartaddNew = (event) => {
    return async (dispatch, getState) => {
        const {uid, name} = getState().auth;
        try {
            const resp = await fetchConToken(url, event, 'POST');

            const body = await resp.json();

            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name
                };
                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`${url}/${event.id}`,{}, 'PUT');
            const body = await resp.json();
            if(body.ok){
                dispatch(eventUpdated(event));
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}


export const eventSetActive = (event) => ({
    type: types.eventASetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.clearActiveEvent });

export const eventStartLoading = () => {
    return async(dispatch) => {

        const resp = await fetchConToken(url);
        const body = await resp.json();

            if (body.ok) {
                const events = prepareEvents(body.eventos);
                dispatch(eventLoaded(events));
            }
    }
}

export const eventStartDelete = () => {
    return async(dispatch, getState) => {
        const {id} = getState().calendar.activeEvent;
        try {
            const resp = await fetchConToken(`${url}/${id}`,{}, 'DELETE');
            const body = await resp.json();
            if(body.ok){
                dispatch(eventDeleded());
            }else{
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});


const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

const eventLoaded = (events) => ({
    type:types.eventLoaded,
    payload: events
});

const eventDeleded = () => ({ type: types.eventDeleted });
export const eventLogout = () => ({ type: types.eventLogout });


