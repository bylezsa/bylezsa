import React from 'react'; 
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import App from './App.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
