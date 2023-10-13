import { useState } from "react";

async function save(data) {
    const response = await fetch('http://141.212.106.68:8001/api/entries/edit/', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    return response;
}

const EntryEditForm = (props) => {
    const [entry, setEntry] = useState(props.entry);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    const englishChangeHandler = (event) => {
        setEntry({...entry, english: event.target.value});
    }

    const creoleChangeHandler = (event) => {
        setEntry({...entry, creole: event.target.value});
    }

    const submitHandler = (event) => {
        event.preventDefault();
        save(entry).then(response => {
            if(response.status === 200) {
                setIsSubmitted(true);
            } else{
                setIsError(true);
            }
        })
    }


    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <form >
                        <div className="form-group">
                            <label>English</label>
                            <textarea rows="5" className="form-control" defaultValue={entry.english} onChange={englishChangeHandler}>

                            </textarea>
                        </div>
                    </form>
                </div>
                <div className="col">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>Creole</label>
                            <textarea rows="5" className="form-control" defaultValue={entry.creole} onChange={creoleChangeHandler}>

                            </textarea>
                        </div>
                        <button type="submit" className="btn btn-danger" value="save" >Save</button>
                    </form>
                    {isSubmitted && (
                        <div className='alert alert-success'>
                            Entry Successfully Saved!
                        </div>
                    )}

                    {isError && (
                        <div className='alert alert-danger'>
                            Error Saving Entry!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EntryEditForm;