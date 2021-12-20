import axios from "axios";
import EventBus from "eventing-bus";
import { put, all, takeLeading, call } from "redux-saga/effects";
import { apiUrl, publicToken } from "../../config";
if (localStorage.getItem('jwt')) axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;


// this function is working with url
function* getAllAdverts() {
  yield put({ type: "MAIN_LOADER", payload:true});
  const { error, response } = yield call( getCall, `ws/listings/search?market=gsmls&listingType=Residential&details=true&extended=true&images=true&listingDate=>6/1/2015&pageNumber=1&pageSize=1000`,"https://slipstream.homejunction.com/" );
    if (error) {
      console.log('error', error);
      yield put({ type: "MAIN_LOADER", payload:false});
    }
    if (response) {
      console.log('response', response);
      yield put({ type: "MY_PROPERTIES", payload: response["data"]["result"] });
      yield put({ type: "MAIN_LOADER", payload:false});
      // EventBus.publish("success", response["data"]["message"]);
    }
}

function* getAllRental() {
  yield put({ type: "MAIN_LOADER", payload:true});
  const { error, response } = yield call(getCall, "/ws/listings/search?market=gsmls&listingType=Rental&details=true&extended=true&images=true&listingDate=>6/1/2015&pageNumber=1&pageSize=1000",'https://slipstream.homejunction.com/');
    if (error) {
      console.log('error', error);
      yield put({ type: "MAIN_LOADER", payload:false});
    }
    if (response) {
      yield put({ type: "MY_PROPERTIES", payload: response["data"]["result"] });
      yield put({ type: "MAIN_LOADER", payload:false});
    }
}
// end the worker saga 

/* function build for call the all function using one
   actionWatcher() funtion and this function call using all() method  */
function* actionWatcher() {
    yield takeLeading("GET_ALL_ADVERTS", getAllAdverts);
    yield takeLeading("GET_RENTAL", getAllRental);
}

// above call the endpoints with get type using getCall methods 
function getCall(path,baseURL) {

  // axios.defaults.baseURL = 'http://localhost::1338';

  // axios.defaults.baseURL = 'https://cell-point.herokuapp.com';
  if (baseURL){
    axios.defaults.baseURL = baseURL;
    axios.defaults.headers.common['Authorization'] = `${"Bearer " + publicToken}`;
  }
  else{
    if (localStorage.getItem('jwt')) axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;
  }
 

  return axios
    .get(path)
    .then(response => ({ response }))
    .catch(error => {
      console.log('getCall error', error);
      if (error.response.status === 401){
      EventBus.publish("tokenExpired");
      return ;
      }
      return { error };
    });
}

// export rootSaga function with call actionWatcher() function in all() method   
export default function* rootSaga() {
    yield all([actionWatcher()]);
}
