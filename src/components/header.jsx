import { Link } from "react-router-dom";

function Header() {

return (

<nav>

<h2>Creator Platform</h2>

<Link to="/">Home</Link> | 

<Link to="/login">Login</Link> | 

<Link to="/register">Register</Link> | 

<Link to="/dashboard">Dashboard</Link>

</nav>

);

}

export default Header;