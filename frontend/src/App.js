import './App.css';
import './resources/css/shortcode/header.css'
import './resources/css/themify-icons.css'
import './resources/css/custom.css'
import './resources/style.css'
import './resources/css/owl.theme.default.min.css'
import './resources/css/owl.carousel.min.css'
import './resources/css/core.css'
import './resources/css/shortcode/shortcodes.css'
import './resources/css/responsive.css'

import {Header} from "./components/Header/Header";
import {BrowserRouter, Route} from "react-router-dom";
import {Register} from "./components/Auth/Register/Register";
import {Login} from "./components/Auth/Login/Login";
import {Shop} from "./components/Shop/Shop";
import {Footer} from "./components/Footer/Footer";
import {ShoppingCart} from "./components/Shop/ShoppingCart/ShoppingCart";
import {Order} from "./components/Order/Order";
import {ProductDetail} from "./components/Shop/ProductDetail/ProductDetail";
import {CartProvider} from "./contexts/CartContext";
import {AddCategory} from "./components/Dashboard/AddCategory";
import {AddProduct} from "./components/Dashboard/CreateProduct/AddProduct";
import {Main} from "./components/Main/Main";


const App = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <Header/>
                <div className="body__overlay"> </div>
                <Route exact path='/' render={() => <Main/>}/>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/shop' render={() => <Shop/>}/>
                <Route path='/cart' render={() => <ShoppingCart/>}/>
                <Route path='/order' render={() => <Order/>}/>
                <Route path='/product/:productId' render={(props) => <ProductDetail {...props}/>}/>
                <Route path='/dashboard/category/' render={() => <AddCategory/>}/>
                <Route path='/dashboard/product/' render={() => <AddProduct/>}/>
                <Footer/>
            </CartProvider>
        </BrowserRouter>
    )
}

export default App;
