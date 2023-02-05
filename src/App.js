import { useEffect, useState } from 'react'
import { Auth } from './components/auth'
import {db, auth, storage} from './config/firebase'
import {
  getDocs, 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  doc 
} from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'


export const App = () => {
  const [movieList, setMovieList] = useState([])

  /* Add New Movie Attributes */
  const [newMovie, setNewMovie] = useState("")
  const [newReleaseDate, setReleaseDate] = useState(0)
  const [wonOscar, setWonOscar] = useState(false)

  /* Update Movie Name */
  const [newName, setNewName] = useState("")

  /* Upload File */
  const [fileUpload, setFileUpload] = useState("")

  const moviesCollectionRef = collection(db, "movies")

  const getMovieList = async () => {
    try{
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setMovieList(filteredData)
    } catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    getMovieList()
  }, [])

  const onSubmitMovie = async () => {
    try{
    await addDoc(moviesCollectionRef, {
      title: newMovie,
      releaseDate: newReleaseDate,
      receivedAnOscar: wonOscar,
      userId: auth?.currentUser?.uid,
    })
    getMovieList()
    } catch(err) {
      console.error(err)
    }
  }
  
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await deleteDoc(movieDoc)
  }

  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id)
    await updateDoc(movieDoc, {title: newName})
  }

  const uploadFile = async() => {
    if(!uploadFile) return
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
    try{
      await uploadBytes(filesFolderRef, fileUpload)
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Auth/>
      <div>
        <input placeholder='Movie Name...' onChange={e=> setNewMovie(e.target.value)}/>
        <input placeholder='Release Date...' type="number" onChange={e=> setReleaseDate(Number(e.target.value))}/>
        <input type='checkbox' checked={wonOscar} onChange={e=> setWonOscar(e.target.checked)}/>
        <label>Received an Oscar?</label>
        <button onClick={onSubmitMovie}>Submit Entry</button>
      </div>

      <div>
        {movieList.map(movie => (
          <div>
            <h1>{movie.title}</h1> 
            <h2>Date: {movie.releaseDate}</h2>
            <p>Won an Oscar? {movie.receivedAnOscar ? "Yes" : "No"}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete</button>

            <input placeholder='New Title...' onChange={e=> setNewName(e.target.value)}/>
            <button onClick={() => updateMovie(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input 
        type="file" 
        onChange={e => setFileUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  )
}