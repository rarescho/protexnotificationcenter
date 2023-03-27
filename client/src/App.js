import "bootstrap/dist/css/bootstrap.min.css"
import {Register, TimeLine,Disableservice, Errorpage,RegisterProtex} from './Containers'
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom';



function App() {
  const basename = process.env.REACT_APP_BASENAME || null;
  return (
    <Router basename={basename}>
     <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/RegisterProtex/:auth_protex" element={<RegisterProtex/>}/>
      <Route path="/Timeline" element={<TimeLine/>}/>
      <Route path="/Disable" element={<Disableservice/>}/>
      <Route path="*" element={<Errorpage/>}/>

     </Routes>
    </Router>
  );
}

export default App;

{/* <div className="App">
<Notification/>
<Register />           
</div> */}