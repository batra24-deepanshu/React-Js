import React,{useState,useEffect} from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('LoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler=()=>{
    localStorage.removeItem('LoggedIn')
        setIsLoggedIn(false)
  }
  const LoginHandler=(email,password)=>{
    localStorage.setItem('LoggedIn',1);
    setIsLoggedIn(true);
  }

	return (
		<React.Fragment>
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={LoginHandler}/> }
        {isLoggedIn && <Home  />}
      </main>
		</React.Fragment>
	);
}

export default App;
