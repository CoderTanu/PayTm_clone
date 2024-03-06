import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Dashboard} from './pages/Dashboard'
import {Send} from './pages/Send'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Signup/>}></Route>
           <Route path="/signin" element={<Signin/>}></Route>
           <Route path="/dashboard" element={<Dashboard/>}></Route>
           <Route path="/send" element={<Send/>}></Route> 
        </Routes>
      </BrowserRouter>
    </>
     
     
       )
}

export default App
