import { BrowserRouter } from 'react-router-dom';
import Footer from '../mycomponents/Homepage/Footer';
import AirQualityDashboard from '../mycomponents/Homepage/Func'
import Heroheader from '../mycomponents/Homepage/Heroheader';
import Navbar from '../mycomponents/Homepage/Navbar';

const Homepage = () => {
    return (
        <div>
           <BrowserRouter>
           <Navbar></Navbar>
           <Heroheader></Heroheader>
           </BrowserRouter>
            <AirQualityDashboard></AirQualityDashboard>
            <Footer></Footer>        
        </div>
    );
};

export default Homepage;