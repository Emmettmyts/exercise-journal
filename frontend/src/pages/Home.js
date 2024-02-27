import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"


// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"


const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    // finds when component is rendered for use Effect
  useEffect(() => {
    // fetchworkouts is to fetch workouts
    const fetchWorkouts = async () => {
      // fetch from local host
      const response = await fetch('/api/workouts')
      // pass the response into a json. will have array of workouts
      // becomes an array of objects
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    // call the function
    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home