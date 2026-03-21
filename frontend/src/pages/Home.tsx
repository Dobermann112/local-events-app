import { useEffect } from "react"
import client from "../api/client"

function Home() {
  useEffect(() => {
    client.get("/events")
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }, [])

  return <div>Home Page</div>
}

export default Home