import './App.css';
import {Header} from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import {Register} from "./components/Auth/Register/Register";
import {Login} from "./components/Auth/Login/Login";
import {Shop} from "./components/Shop/Shop";
import {Footer} from "./components/Footer/Footer";


const App = () => {
    return (
        <div>
            <BrowserRouter>

                <Header/>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/shop' render={() => <Shop/>}/>
            </BrowserRouter>
            <Footer/>
        </div>
    )
        ;
}

export default App;
