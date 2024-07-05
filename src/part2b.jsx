import { useState ,useEffect } from 'react'
import Note from './Components/part2bNote'
import axios from 'axios'

const App = () => {
const [notes,setNotes] = useState([])
const [newNote,setNewNote]=useState('')
const [showAll,setShowAll] = useState(true)

useEffect(() =>{
  console.log('effect')
  axios.get('http://localhost:3001/notes').then(response =>{
    console.log("response fulfilled")
    setNotes(response.data)
  })
},[])
console.log('render',notes.length , 'notes')

const addNotes = (event) =>{
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      
    }
    
    axios.post('http://localhost:3001/notes' , noteObject).then(response =>{
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
 
}

const handleNewNote = (event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
}

const notesToShow = showAll ? notes : notes.filter(note => note.important === true) 

const toggleImportanceOf = (id)=>{
  //console.log('importance of' + id +'needs to be changed ')
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n=> n.id === id )
  const changeNote = {...note , important : !note.important}

  axios.put(url , changeNote).then(response =>{
    setNotes(notes.map(n => n.id !== id ? n : response.data))
  })
}
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
          key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNotes}>
        <input 
        value={newNote}
        onChange={handleNewNote}
        />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App