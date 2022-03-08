import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { UserAuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <UserAuthContextProvider>
          <Nav />
          <AppRoutes />
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
