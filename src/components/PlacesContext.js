import * as firebase from 'firebase'

import createDataContext from './createDataContext'


const placesReducer = (state, action) => {
    switch (action.type) {
        case 'get_all_places':
            return { ...state, places: action.payload }
        case 'get_place':
            return { ...state, currentPlace: action.payload }
        default:
            return state
    }
}

const getAllPlaces = dispatch => () => {
    const ref = firebase.database().ref('places/')
    ref.on('value', data => {
        dispatch({ type: 'get_all_places', payload: Object.values(data.val()) || [] })
    })
}

const getPlace = dispatch => (id) => {
    const ref = firebase.database().ref('places/' + id)
    ref.on('value', data => {
        dispatch({ type: 'get_place', payload: data.val() })
    })
}

const postPlace = dispatch => () => { }


export const { Provider, Context } = createDataContext(
    placesReducer,
    {
        getAllPlaces,
        getPlace,
        postPlace
    },
    {
        places: [],
        currentPlace: {}
    }
)
