import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(()=> {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = {name: name, email: email};

    //send data to the server
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
  })
  .then(res => res.json())
  .then(data => {
    const addedUser = data;
    const newUsers = [...users, addedUser];
    setUsers(newUsers);
  })
  nameRef.current.value = '';
  emailRef.current.value = '';
}

  return (
    <div className="App">
      <h2>I have {users.length} users.</h2>
      <form onSubmit={handleAddUser}>
        <input ref={nameRef} type="text" placeholder="Name" /><br />
        <input ref={emailRef} type="email" name="email" id="" placeholder="Email"/><br />
        <input type="submit" value="submit" />
      </form>
      {
        users.map(user => <h3 key={user.id}>{user.name} {user.email}</h3>)
      }
    </div>
  );
}

export default App;
