import { PersistGate } from "redux-persist/integration/react";
import { Provider} from "react-redux";
import { store, persistor } from "./redux/store.ts";
import AppRouter from "./AppRouter.tsx";

function App() {

  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <AppRouter/>
        </PersistGate>
    </Provider>
  )
}

export default App
