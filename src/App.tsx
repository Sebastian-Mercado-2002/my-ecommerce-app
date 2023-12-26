import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import CategoryDelete from './pages/CategoryDelete';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import CheckoutPage from './pages/CheckoutPage';
import CartView from './views/CartView';
import ProductListView from './views/ProductListView';
import CategoriesView from './views/CategoriesView';
import WrapperComponent from './layouts/WrapperComponent';
import { CartProvider } from './pages/CartContext'; 

function App() {
  
  return (
    <Router>
      <CartProvider> 
        <WrapperComponent>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/categories" component={Categories} />
            <Route path="/categorydelete" component={CategoryDelete} />
            <Route path="/productcreate" component={ProductCreate} /> 
            <Route path="/cartview" component={CartView}/> 
            <Route path="/categoriesview" component={CategoriesView}/> 
            <Route path="/productlistview" component={ProductListView}/> 
            <Route path="/productedit/:id" component={ProductEdit} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/products" component={Products} />
            <Route path="/checkoutpage" component={CheckoutPage} />
            <Route path="/" component={Home} />
          </Switch>
        </WrapperComponent>
      </CartProvider>
    </Router>
  );
}


export default App;
