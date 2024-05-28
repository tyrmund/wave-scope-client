import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"
import Loader from "../components/Loader/Loader"

const PrivateRoute = () => {

  const { loggedUser, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Loader />
  }

  if (!loggedUser) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default PrivateRoute