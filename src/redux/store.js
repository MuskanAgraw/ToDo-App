import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

// Subscribe to store changes and save state to local storage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos", serializedState);
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};

// Load initial state from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return undefined;
  }
};

const store = configureStore({
  reducer: reducer,
  preloadedState: loadFromLocalStorage(),
});

// Subscribe to store changes
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
