// React Router
import MainRouter from './Components/MainRouter'
import { BrowserRouter } from 'react-router-dom'

import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <MainRouter/>
    </BrowserRouter>
  );
}

export default App;