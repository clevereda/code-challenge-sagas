import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import {takeEvery, put} from "redux-saga/effects";



//generator function for getting animals from the DB
function* fetchAnimals (action) {
    //this gets all animals from the database
    try{
        const response = yield axios.get('/zoo');
        console.log('animals are here', response.data);

        yield put({type: 'SET_ZOO_ANIMALS', payload: response.data});
    }catch (error){
        console.log("Error getting zoo animals", error);
    }
}

//this function add a new animal to the zoo
function* addToZoo (action) {
    try{
        yield axios.post("/zoo", action.payload);
        console.log("success sending the new animal to the server");
        yield put({ type: "GET_ZOO_ANIMALS" }); //refresh animal list
    }catch(error){
        console.log("Error posting new animal in the database");
    }

}



// Your saga should listen for the action type of `GET_ZOO_ANIMALS`
function* rootSaga() {
    // YOUR CODE HERE
    yield takeEvery('GET_ZOO_ANIMALS', fetchAnimals);
    yield takeEvery('ADD_ANIMAL', addToZoo);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store class and number of unique animals in that class
const zooAnimals = (state = [], action) => {
    switch (action.type) {
        case 'SET_ZOO_ANIMALS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        zooAnimals,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
