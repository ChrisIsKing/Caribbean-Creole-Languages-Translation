import { useParams } from "react-router-dom";


const Entry = () => {
    const params = useParams();
    const id = params.id;

    return (
        <div>
            <h1>Entry {id}</h1>
        </div>
    )
}

export default Entry;