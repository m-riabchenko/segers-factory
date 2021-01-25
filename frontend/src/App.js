import './App.css';
import {Header} from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import {Register} from "./components/Auth/Register/Register";
import {Login} from "./components/Auth/Login/Login";
import {Shop} from "./components/Shop/Shop";
import {Footer} from "./components/Footer/Footer";
import {ShoppingCart} from "./components/Shop/ShoppingCart/ShoppingCart";

import './resources/css/shortcode/header.css'
import './resources/css/themify-icons.css'
import './resources/css/custom.css'
import './resources/style.css'
import './resources/css/owl.theme.default.min.css'
import './resources/css/owl.carousel.min.css'
import './resources/css/core.css'
import './resources/css/shortcode/shortcodes.css'
import './resources/css/responsive.css'


const App = () => {
    return (
            <BrowserRouter>
                <Header/>
                <div className="body__overlay"> </div>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/shop' render={() => <Shop/>}/>
                <Route path='/cart' render={() => <ShoppingCart/>}/>
                <Footer/>
            </BrowserRouter>
    )
}

export default App;
