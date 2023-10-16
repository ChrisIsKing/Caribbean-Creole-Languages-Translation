import React, { useState } from 'react';

const TranslateForm = () => {
    const [enteredEnglish, setEnteredEnglish] = useState('')
    const [enteredCreole, setEnteredCreole] = useState('')
    const [saveDisabled, setSaveDisabled] = useState(true)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isError, setIsError] = useState(false)

    async function translate(data) {
        const response = await fetch('http://translation-backend.csclarke.com/api/infer/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        const reData = await response.json();

        updateSaveForm(reData.translatedText);
    }


    const cleanResult = (result) => {
        console.log(result);
        let lines = result.split('\n');

        for (const line of lines) {
            if (line.length > 0)
                console.log(line);
        }



    }

    async function save(data) {
        const response = await fetch('http://translation-backend.csclarke.com1/api/entries/add/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.status === 200) {
            setIsSubmitted(true);
        } else{
            setIsError(true);
        }
    }

    const submitHandler = (event) => {
        setEnteredCreole(" ")
        event.preventDefault()

        const submitData = {
            text: enteredEnglish
        };

        translate(submitData);
    }

    const saveHandler = (event) => {
        event.preventDefault();

        const submitData = {
            english: enteredEnglish,
            creole: enteredCreole
        };

        save(submitData);
    }

    const updateSaveForm = (creole) => {
        setEnteredCreole(creole);
        setSaveDisabled(false);
    }

    const creoleChangeHandler = (event) => {
        let creole = event.target.value;
        updateSaveForm(creole);
    }

    const englishChangeHandler = (event) => {
        let english = event.target.value;
        setEnteredEnglish(english)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label>English</label>
                            <textarea rows="5" className="form-control" onChange={englishChangeHandler}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" value="translate">Translate</button>
                    </form>
                </div>
                <div className="col">

                    <form onSubmit={saveHandler}>
                        <div className="form-group">
                            <label>Creole</label>
                            <textarea rows="5" className="form-control" value={enteredCreole} onChange={creoleChangeHandler}></textarea>
                        </div>
                        <button type="submit" className="btn btn-danger" value="save" disabled={saveDisabled}>Save</button>

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
}

export default TranslateForm