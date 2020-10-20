import * as firebase from "firebase";
import "@firebase/firestore";

import createDataContext from "./createDataContext";

const placesReducer = (state, action) => {
  switch (action.type) {
    case "get_all_places":
      return { ...state, places: action.payload };
    case "get_places_by_city":
      return { ...state, placesToShow: action.payload };
      case 'get_places_by_name':
        return { ...state, placesToShow: action.payload };
    case "get_place":
      return {
        ...state,
        currentPlace: state.places.find((i) => i.id === action.payload),
      };
    default:
      return state;
  }
};

const getAllPlaces = (dispatch) => async () => {
  // const ref = firebase.database().ref('places/')
  // ref.on('value', data => {
  //     dispatch({ type: 'get_all_places', payload: Object.values(data.val()) || [] })
  // })
  const res = await firebase
    .firestore()
    .collection("places")
    .where("show", "==", false)
    .get();
  const arr = [];
  res.forEach((doc) => {
    arr.push(doc.data());
  });
  dispatch({ type: "get_all_places", payload: arr });
};

const getPlace = (dispatch) => (id) => {
  dispatch({ type: "get_place", payload: id });
};

const getPlacesByCity = (dispatch) => async (cityName) => {
  const res = await firebase
    .firestore()
    .collection("places")
    .where("city", "==", cityName)
    .where("show", "==", true)
    .get();
  const arr = [];
  res.forEach((doc) => {
    arr.push(doc.data());
  });

  dispatch({ type: "get_places_by_city", payload: arr });
};



const getPlacesByName = dispatch => async (name) => {

  //var name1 = name.toLowerCase();
   const res = await firebase.firestore().collection('places').where(('name'.toLowerCase()), '==', name)
       .get()
   const arr = []
   res.forEach(doc => {
       arr.push(doc.data())
   })

   dispatch({ type: 'get_places_by_name', payload: arr })
}

export const { Provider, Context } = createDataContext(
  placesReducer,
  {
    getAllPlaces,
    getPlace,
    getPlacesByCity,
    getPlacesByName,
  },
  {
    places: [],
    placesToShow: [],
  }
);
