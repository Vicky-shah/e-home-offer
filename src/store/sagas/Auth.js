import axios from "axios";
import EventBus from "eventing-bus";
import { put, all, takeLeading, call } from "redux-saga/effects";
import { apiUrl, publicToken } from "../../config";
if (localStorage.getItem('jwt')) axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;

// start the watcher saga for every login time  
function* loginUser({ payload, history }) {
  console.log('payload', payload);
    const { error, response } = yield call(postCall, { path: "/v1/login", body: payload });
    console.log('if error', error);
    console.log('if response', response);
    if(response && response['data']){
      localStorage.setItem('companyToken', response['data']['company_token'])
      localStorage.setItem('userUUID', response['data']['uuid'])
      localStorage.setItem('user_id', response['data']['id'])
      localStorage.setItem('companyUUID', response['data']['company_uuid'])
      localStorage.setItem('firstName', response['data']['firstname'])
      localStorage.setItem('lastName', response['data']['lastname'])
      history.push('/report')
    }
    if(error){
      EventBus.publish("error", "Something went wrong on logging user.");
    }
}
// end the watcher saga 

// start the worker saga 
function* getProfile({ payload }) {
  console.log('payload', payload);
    const { error, response } = yield call( getCall, `/api/getProfile` );
    // if (error) EventBus.publish("error", error["response"]["data"]["message"]);
    if (response) {
      console.log('getProfile' , response);
      yield put({ type: "MY_USER", payload: response["data"]["result"] });
      // localStorage.setItem('jwt', response['data']['token'])
      EventBus.publish("success", response["data"]["message"]);
    }
    // history.push('/Report')
}

function* register({ payload }) {
  console.log('payload', payload);
    const { error, response } = yield call(postCall, { path: "/register", body:{name: payload.name, email:payload.email, password:payload.password} });
    // if (error) EventBus.publish("error", error["response"]["data"]["message"]);
    if (response) {
      console.log('response', response);
      // yield put({ type: "MY_USER", payload: response["data"] });
      localStorage.setItem('jwt', response['data']['token'])
      EventBus.publish("success", response["data"]["message"]);
    }
    if (error){
      console.log('error', error);
    }
    // history.push('/Report')
}

function* login({ payload }) {
  console.log('payload', payload);
    const { error, response } = yield call(postCall, { path: "/authenticate", body:{email:payload.email, password:payload.password}});
    if (error) EventBus.publish("error", error["response"]["data"]["message"]);
    if (response) {
      console.log('response', response);
      localStorage.setItem('jwt', response['data']['token'])
      yield put({ type: "MY_USER", payload: response["data"]["user"] });
      if(response.data) EventBus.publish("success", "Successfully logged in");
    }
    // history.push('/Report')
}

function* fetchByMap({ payload }) {
  console.log('payload', payload);
  const { error, response } = yield call(postCall, { path: "/getByLocation", body: payload });
// searchFilter
    // const { error, response } = yield call(postCall, { path: "/searchFilter", body: payload });
    if (error) {
      console.log('error', error);
      // EventBus.publish("error", error["response"]["data"]["message"]);
    }
    if (response) {
      console.log('response', response);

      yield put({ type: "MY_PROPERTIES", payload: response["data"]["result"] });
      // EventBus.publish("success", response["data"]["message"]);
    }
}

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

function* fetchAddCount() {
  console.log('fetchAddCount');
  const { error, response } = yield call( getCall, `/fetchAddCount` );
    if (error) {
      console.log('error', error);
    }
    if (response) {
      console.log('response', response);
      yield put({ type: "MY_COUNT", payload: response["data"]["result"] });
      // EventBus.publish("success", response["data"]["message"]);
    }
}

function* myFavourites() {
  const { error, response } = yield call(postCall, { path: "/api/getFavouriteAdds" });
    if (error) {
      console.log('error', error);
    }
    if (response) {
      console.log('response', response);
      yield put({ type: "MY_FAVOURITES", payload: response["data"]["result"] });
      // EventBus.publish("success", response["data"]["message"]);
    }
}

function* getSingleProperty({payload}) {
  console.log('payload', payload);
  const { error, response } = yield call(postCall, { path: "/api/getFavouriteAdds" });
    if (error) {
      console.log('error', error);
    }
    if (response) {
      console.log('response', response);
      yield put({ type: "MY_SINGLE_PROPERTY", payload: response["data"]["result"] });
      // EventBus.publish("success", response["data"]["message"]);
    }
}

function* addFavourite({payload}) {
  console.log('payload', payload);
  const { error, response } = yield call(postCall, { path: "/api/addFavouriteAdds" });
    if (error) {
      console.log('error', error);
    }
    if (response) {
      console.log('response', response);
      yield put({ type: "MY_SINGLE_PROPERTY", payload: response["data"]["result"] });
      // EventBus.publish("success", response["data"]["message"]);
    }
}

function* searchProperty({payload}) {
  console.log('searchProperty', payload);
  const { error, response } = yield call(postCall, { path: "/searchFilter", body:{id: parseInt(payload.id), market:payload.market} });
    if (error) {
      console.log('error', error);
    }
    if (response) {
      console.log('response', response);
      yield put({ type: "MY_SINGLE_PROPERTY", payload: response["data"] });
      // EventBus.publish("success", response["data"]["message"]);
    }
}

function* searchByMarket({payload}) {
  console.log('searchByMarket', payload);
  const { error, response } = yield call(postCall, { path: "/searchByMarket", body:{market: payload} });
    if (error) {
      console.log('error', error);
    }
    if (response) {
      console.log('response', response);
      yield put({ type: "MY_PROPERTIES", payload: response["data"]["result"] });
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
    yield takeLeading("LOGIN_USER", loginUser);
    yield takeLeading("GET_USER", getProfile);
    yield takeLeading("FETCHBYMAP", fetchByMap);
    yield takeLeading("REGISTER", register);
    yield takeLeading("LOGIN", login);
    yield takeLeading("LOGIN", login);
    yield takeLeading("GET_ALL_ADVERTS", getAllAdverts);
    yield takeLeading("GET_FAVOURITES", myFavourites);
    yield takeLeading("GET_SINGLE_PROPERTY", getSingleProperty);
    yield takeLeading("ADD_FAVOURITE", addFavourite);
    yield takeLeading("SEARCH_PROPERTY", searchProperty);
    yield takeLeading("SEARCH_MARKET", searchByMarket);
    yield takeLeading("GET_RENTAL", getAllRental);
    yield takeLeading("FETCH_ADD_COUNT", fetchAddCount);
}

// above call the endpoints with post type using getCall methods 
function postCall({ body, path }) {

  // axios.defaults.baseURL = 'http://localhost::1338';
  axios.defaults.baseURL = 'https://cell-point.herokuapp.com';
  if (localStorage.getItem('jwt')) axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;

  return axios
    .post(path, body)
    .then(response => ({ response }))
    .catch(error => {
      console.log('path, body', path, body);
      // if (error.response.status === 401){
      // EventBus.publish("tokenExpired");
      // return ;
      // }
      return { error };
    });
}

// above call the endpoints with get type using getCall methods 
function getCall(path,baseURL) {

  // axios.defaults.baseURL = 'http://localhost::1338';

  axios.defaults.baseURL = 'https://cell-point.herokuapp.com';
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

function putCall({ body, path }) {
  if (localStorage.getItem('jwt')) axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwt')}`;

 
  return axios
    .put(path, body)
    .then(response => ({ response }))
    .catch(error => {
      if (error.response.status === 401){
      EventBus.publish("tokenExpired");
      return ;
      }
      return { error };
    });
}

function deleteCall(path) {
    return axios
        .delete(path)
        .then(response => ({ response }))
        .catch(error => {
            return { error };
        });
}

// export rootSaga function with call actionWatcher() function in all() method   
export default function* rootSaga() {
    yield all([actionWatcher()]);
}
