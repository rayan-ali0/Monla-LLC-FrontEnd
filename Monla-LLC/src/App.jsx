import Router from './Routes/Route.jsx'
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {
  return (
    <>
    <ToastContainer     
      position="top-right"
      autoClose={5000}
      limit={2}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"/>
      <Router />
    </>
  )
}
export default App
