import { createStore } from 'redux';
//import rootReducer from '../reducers';

export default function(){
    var preloadedState = {
        page: "Home"
    };
    const store = createStore(function(state){
        return state;
    }, preloadedState);
    return store;
};