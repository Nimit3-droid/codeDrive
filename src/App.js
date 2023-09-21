import { useState, useEffect, createContext } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Landing from "./Pages/Landing/Landing"
import Admin from "./Pages/Admin/Admin"
import User from "./Pages/User/User"
export const DataContext = createContext()

export default function App() {
	const [showRegistration, setShowRegistration] = useState(false)
	const history = useNavigate()
	const [loggedIn, setLoggedIn] = useState({
		state: false,
		isAdmin: false,
		username: "",
		firstName: "",
		lastName: "",
	})
	const BASE_URL = 'https://codedrive-backend.onrender.com'

	const handleLogout = () => {
		window.localStorage.clear()
		setLoggedIn({
			state: false,
			isAdmin: false,
			username: "",
			firstName: "",
			lastName: "",
		})
		history("/")
	}

	// IF on page load, there is a token in LS, set loggedIn data
	useEffect(() => {
		if (window.localStorage.getItem("token") && window.localStorage.getItem("username") === "admin") {
			setLoggedIn({
				state: true,
				isAdmin: true,
				username: window.localStorage.getItem("username"),
				firstName: "",
				lastName: "",
			})
		} else if (window.localStorage.getItem("token")) {
			setLoggedIn({
				state: true,
				isAdmin: false,
				username: window.localStorage.getItem("username"),
				firstName: "",
				lastName: "",
			})
		} else {
			setLoggedIn({
				state: false,
				isAdmin: false,
				username: "",
				firstName: "",
				lastName: "",
			})
		}
	}, [])

	return (
		<div>
			<DataContext.Provider value={ { setShowRegistration, showRegistration, loggedIn, setLoggedIn, BASE_URL, handleLogout } }>
				<Routes>
					<Route path="/admin" element={ <Admin/> } />
					<Route path="/user" element={ <User/> } />
					<Route path="/" element={ <Landing/> } />
				</Routes>
			</DataContext.Provider>
		</div>
	)
}
