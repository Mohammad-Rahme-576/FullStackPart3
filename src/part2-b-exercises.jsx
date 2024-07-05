import {useState , useEffect} from 'react'
import "./part2-b-exercises.css"
import personService from './services/persons'

const Person = ({ persons , handleDelete }) => {
    return (
        <div>
      {persons.map((person,index) =>(
        <p key={index}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
        
      ))}
      
      </div>
    )
  }
const Filter =(props) =>{
    return(
        <div>
            filter shown with<input value={props.show}
            onChange={props.handelToShow}/>
        </div>
    )
}

const PersonForm = (props)=>{
    return(
        <div>
            <form onSubmit={props.addNames}>
                <div>
                    name:<input 
                    value={props.names}
                    onChange={props.handleNewName}
                    />
                </div>
                <div>number:<input 
                value={props.number}
                onChange={props.handleNewNumbers}
                />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    )
}
const App = () =>{

    const [persons,setPersons] = useState([])
    const [names,setNames] = useState('')
    const [numbers , setNumbers]=useState('')
    const [show,setShow]=useState('')

    const addNames = (event) => {
        event.preventDefault();
      
        const newObject = {
          name: names,
          number: numbers,
        };
      
        const existingPerson = persons.find(person => person.name === newObject.name);
      
        if (existingPerson) {
          const confirmation = window.confirm(`${names} is already added to phonebook. Update number?`);
      
          if (confirmation) {
            // Use HTTP PUT to update existing person's number
            const url = `http://localhost:3001/persons/` + existingPerson.id;

            const updatedPerson = { ...existingPerson, number: newObject.number };
      
            personService.update(existingPerson.id, updatedPerson)
            .then(response => {
              
              setPersons(
                persons.map(person => (person.id === existingPerson.id ? response.data : person))
              );
              setNumbers(''); 
              setNames('');
            })
          } else {
            return;
          }
        } else {
          personService.create(newObject)
            .then(response => {
              setPersons(persons.concat(response.data));
              setNumbers('');
              setNames('');
            })
        }
      };
      
    // const addNames = (event) =>{
    //     event.preventDefault();
    //     const newObject = {
    //         name: names,
    //         number:numbers
    //     }
    //     const nameExist = persons.some(person => person.name === newObject.name)
    //     if(nameExist){
    //         const confirmation = window.confirm(`${names} is already added to phonebook`) ;
    //         if(!confirmation){
    //            return;
    //         }else{
    //             const url = `http://localhost:3001/persons/${nameExist.id}`
    //             //const person = persons.find(p=> p.id === id )
    //             const changePerson = {...nameExist , number : newObject.number}

    //             personService.update(nameExist.id , changePerson).then(response =>{
    //                 setPersons(persons.map(p => p.id === nameExist.id ?  response.data : p));
    //                 setNumbers('');
    //             })
    //         }

    //     }else{
    //         personService.create(newObject).then(response =>{
    //             setPersons(persons.concat(response.data))
    //             setNumbers('')
    //             setNames('')
    //         }) 
    //     }
    // }

    //exercise 2.6 part-2 c  the useEffect and the dp.json file , fetching data from the server , the initial data only
    useEffect( () =>{
        //console.log("effect")
        personService.getAll().then(response =>{
            console.log("response fulfilled")
            setPersons(response.data)
        })
    },[])
    
    const handleDelete = async (id) => {
        const confirmation = window.confirm('Are you sure you want to delete?');
        if (!confirmation) return;
    
        try {
          const response = await personService.remove(id); // Assuming personService handles API calls
          setPersons(persons.filter((person) => person.id !== id));
        } catch (error) {
          console.error('Error deleting person:', error);
          // Handle errors appropriately (e.g., display an error message)
        }
      };

    const handleNewName = (event) =>{
        console.log(event.target.value)
        setNames(event.target.value)
    }
    const handleNewNumbers =(event)=>{
        console.log(event.target.value)
        setNumbers(event.target.value)
    }
    const handelToShow = (event) =>{
        console.log(event.target.value)
        setShow(event.target.value)
    }
    const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(show.toLowerCase()))
    return(
        <div>
            <h2>PhoneBook</h2>
            <Filter show={show} handelToShow={handelToShow}/>
            <h2>add a new</h2>
            <PersonForm names={names} number={numbers} addNames={addNames}  handleNewName={handleNewName} handleNewNumbers={handleNewNumbers}/>
            <h2>Numbers</h2>
            <Person persons={filteredPersons} handleDelete={handleDelete}/>
        </div>
    )
}
export default App;