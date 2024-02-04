import Router from './Routes/Route.jsx'
import { ToastContainer } from 'react-toastify';
import './App.css'
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
function App() {
  axios.defaults.withCredentials = true;
  const  queryClient = new QueryClient()
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <ToastContainer     
      position="top-center"
      autoClose={3000}
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
      </QueryClientProvider>
    </>
  )
}
export default App
