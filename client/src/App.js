import "bootstrap/dist/css/bootstrap.min.css"
import {Register, TimeLine,Disableservice, Errorpage,RegisterProtex} from './Containers'
import { BrowserRouter as Router,Routes,Route,Redirect   } from 'react-router-dom';
import { token,requestForToken } from '../../firebaseNotifications/firebase';
import axios from "axios";
import { ReactSession } from 'react-client-session';





function App() { 
  requestForToken();
  checkLoggedIn();

  return (
    <Router>
     <Routes>
      <Route path="/" element={<Register/>}>
        {localStorage.getItem("username") ? <Redirect to="/timeline"  element={<TimeLine />} /> : <Route path="/"/>}
      </Route>
      <Route path="/RegisterProtex/:auth_protex" element={<RegisterProtex/>}/>
      <Route path="/Timeline" element={<TimeLine/>}/>
      <Route path="/Disable" element={<Disableservice/>}/>
      <Route path="*" element={<Errorpage/>}/>

     </Routes>
    </Router>
  );
}

function checkLoggedIn(){
  const configuration = {
    method: "post",
    url: "https://www.protex-dashboard.it/api/check",
    data: {
      token
    },
  };
  // make the API call
  axios(configuration)
    .then((result) => {
      if (result.data.message.toUpperCase().includes("SUCCESS")){
        ReactSession.setStoreType("localStorage");
        ReactSession.set("username", result.data.auth_protex);
        return true;
      }else if(result.data.message.toUpperCase().includes("ERROR")){
          return false;
      }
    })
    .catch((error) => {
      error = new Error();
    });
}

export default App;

{/* <div className="App">
<Notification/>
<Register />           
</div> */}