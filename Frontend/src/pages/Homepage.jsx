import Footer from '../mycomponents/Homepage/Footer';
import AirQualityDashboard from '../mycomponents/Homepage/Func';
import Heroheader from '../mycomponents/Homepage/Heroheader';
import Navbar from '../mycomponents/Homepage/Navbar';

const Homepage = () => {
    return (
        <div>
            
            <Heroheader />
            <AirQualityDashboard />
            <Footer />
        </div>
    );
};

export default Homepage;