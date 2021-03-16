import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";

let store;

const initStore = (_initialState) => {
    return createStore(rootReducer, _initialState, composeWithDevTools(applyMiddleware(thunk)));
};

const initializeStore = (_preloadedState) => {
    let _store = store ?? initStore(_preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (_preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ..._preloadedState
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export const useStore = (_initialState) => {
    const store = useMemo(() => initializeStore(_initialState), [_initialState]);
    return store;
};

export default initializeStore;
