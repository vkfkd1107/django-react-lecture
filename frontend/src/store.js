import React, { createContext, useContext, useReducer } from "react";
import { getStorageItem, setStorageItem } from "./utils/useLocalStorage";

const initialState = {
  jwtToken: "",
};

const AppContext = createContext(initialState);

const reducer = (prevState, action) => {
  const { type } = action;
  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    return {
      ...prevState,
      jwtToken,
    };
  } else if (type === DELETE_TOKEN) {
    return {
      ...prevState,
      jwtToken: "",
    };
  }
  return prevState;
};

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState, () => ({
    jwtToken: getStorageItem("jwtToken", ""),
  }));
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

// Action Creators
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });
