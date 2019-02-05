import { createStore } from 'redux';
//import rootReducer from '../reducers';

export default function(){
    var preloadedState = {
        page: "Home",
        activities: {
            "1": [
                [0, 1],
                [5, 7],
                [10, 4],
                [15, 9],
                [20, 4],
                [25, 4]
            ]
        }
    };
    const store = createStore(function(state){
        return state;
    }, preloadedState);
    return store;
};