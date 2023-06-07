import React, { useState, useEffect } from 'react'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const[loding, setLoding] = useState(true)
  const[tours, setTours] = useState(true)

  const removeTour = (id)=>{
    const newTours = tours.filter((tours)=> tours.id !== id)
    setTours(newTours)
  }
  const fetchToures = async ()=>{
    setLoding(true)

    try {
      const response = await fetch(url)
      const tours = await response.json()
      setTours(tours)
      setLoding(false)
    } catch (error) {
      setLoding(false)
      return <h2>ERROR</h2>
    }
  }
  useEffect(()=>{
    fetchToures()
  }, [])

  if(loding)
  return (<>
    <main className="loading">
      <h1>loading...</h1>
    </main>
  </>)
  if(tours.length === 0)
  {
    return(
      <main>
        <div className='title'>
          <h2>no more tours left</h2>
          <button className='btn' onClick={fetchToures}>Refresh</button>
        </div>
      </main>
    )
  }
  return(
    <main>
      <Tours tours = {tours} removeTour = {removeTour}/>
    </main>
  )
}

export default App
