import { useState, useEffect } from "react";

import NavBar from "../Components/NavBar";
import { Link } from "react-router-dom";

async function fetchEntries() {
    const response = await fetch('http://translation-backend.csclarke.com/api/entries/');
    const entries = await response.json();
    return entries;
}

const List = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetchEntries().then(entries => setEntries(entries));
    }, []);


    const list = entries.map(entry => (
        <tr key={entry.id}>
            <th scope="row">{entry.id}</th>
            <td>{entry.english}</td>
            <td>{entry.creole}</td>
            <td>
                <Link to={`/entry/${entry.id}`}> Edit </Link>
                
                 &nbsp; | &nbsp;
                <a href="#">
                    delete
                </a>
            </td>
        </tr>));

    return (
        <div>
            <div className="container">
                <div className="table-responsive">
                    <table className="table m-0">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">English</th>
                                <th scope="col">Creole</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                
                </div>
            </div>
        </div>
    );
}

export default List;