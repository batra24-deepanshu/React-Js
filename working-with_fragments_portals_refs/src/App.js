
import React, {useState, Fragment } from 'react'
import AddUser from './components/Users/AddUser'
import UserList from './components/Users/UserList'
function App() {
    const [userList,setUsersList]=useState([]);

    const AddUserHandler=(uName,uAge)=>{
        setUsersList((prevUsersList) => {
            return [
              ...prevUsersList,
              { name: uName, age: uAge, id: Math.random().toString() },
            ];
          });
    }
    return (
        <Fragment>
            <AddUser onAddUser={AddUserHandler}></AddUser>
            <UserList users={userList} />
        </Fragment>
    )
}

export default App;
