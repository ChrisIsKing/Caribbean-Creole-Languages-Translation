import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <header className="navbar navbar-dark bg-primary navbar-expand-lg">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/translate" className="nav-link">
                            Translate
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/list">
                            List
                        </a>
                    </li>
                </ul>
            </div>

        </header>
    );
}

export default NavBar