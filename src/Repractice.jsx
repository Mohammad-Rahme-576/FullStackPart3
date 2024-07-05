import { useState } from "react";

const Person = ({person}) =>{
    return(
        <ul>
            {person.map((person1,index) => (
                <li key={index}>{person1.name}</li>
            ))}
        </ul>
    )
}

const App = () =>{
    const [person,setPerson] = useState([
        {name: "Mohammad 576"}
    ])
    const [names,setNames] = useState('')

    const addNames = (event) =>{
        event.preventDefault();
        const newObject = {
            name : names
        }
        const newNames = person.concat(newObject)
        setPerson(newNames)
        setNames('')
    }
    const handleNewNames = (event) =>{
        console.log(event.target.value)
        setNames(event.target.value) 
    }
    return (
        <div>
            <h2>NameBook</h2>
            
                <form onSubmit={addNames}>
                    <div>
                        name:<input 
                        value={names}
                        onChange={handleNewNames}
                        />
                    </div>
                    <div>
                        <button type="submit">add</button>
                    </div>
                </form>
            <h2>Numbers</h2>
            <Person person={person}/>
        </div>
    )
}

