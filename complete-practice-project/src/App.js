
import React, {useState} from 'react'
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
        <div>
            <AddUser onAddUser={AddUserHandler}></AddUser>
            <UserList users={userList} />
        </div>
    )
}

export default App;
