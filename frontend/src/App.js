import AppRouter from "./components/AppRouter/AppRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <AppRouter />
            <ToastContainer />
        </>
    );
};

export default App;
