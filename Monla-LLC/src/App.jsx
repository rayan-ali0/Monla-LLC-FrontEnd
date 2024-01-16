import Router from './Routes/Route.jsx'
import './App.css'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer     position="top-right"
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
