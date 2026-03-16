// 1. Import your new logo
import newLogo from '../assets/logo.png';

// 2. Find your Navbar return statement
<Link to='/'>
    {/* Update the src to use your new import and change the alt text */}
    <img src={newLogo} alt="Nikhil Store Logo" style={{ width: '50px' }} />
    <p>NIKHIL STORE</p>
</Link>