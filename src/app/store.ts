import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const ignoreSerializableCheckMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: ignoreSerializableCheckMiddleware,
});

export const persistor = persistStore(store);
