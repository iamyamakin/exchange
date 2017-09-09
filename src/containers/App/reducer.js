import { Map } from 'immutable';

const initialState = Map();

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};

export default appReducer;
