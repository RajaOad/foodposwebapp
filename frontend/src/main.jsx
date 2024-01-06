import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/user/UserContext.jsx'
import { CartContextProvider } from './context/cart/CartContext.jsx'
import { ProductContextProvider } from './context/product/ProductContext.jsx'
import { SaleContextProvider } from './context/sale/SaleContext.jsx'
import { CategoryContextProvider } from './context/category/CategoryContext.jsx'
import { DarkModeProvider } from './context/darkmode/DarkModeContext.jsx'
import { OrderContextProvider } from './context/order/OrderContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <UserContextProvider>
        <DarkModeProvider>
          <CategoryContextProvider>
            <ProductContextProvider>
              <SaleContextProvider>
                <OrderContextProvider>
                  <CartContextProvider>
                    <App />
                  </CartContextProvider>
                </OrderContextProvider>
              </SaleContextProvider>
            </ProductContextProvider>
          </CategoryContextProvider>
        </DarkModeProvider>
    </UserContextProvider>
    </Router>
  </React.StrictMode>
)
