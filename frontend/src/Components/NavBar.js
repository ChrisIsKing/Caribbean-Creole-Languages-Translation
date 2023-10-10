const NavBar = () => {
    return (
        <header className="navbar navbar-dark bg-primary navbar-expand-lg">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/translate">
                            Translate
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/translate">
                            List
                        </a>
                    </li>
                </ul>
            </div>

        </header>
    );
}

export default NavBar