import React, { useState, useEffect } from "react";
import { FaEnvelopeOpen,FaUser,FaCalendarTimes,FaMap,FaPhone,FaLock } from 'react-icons/fa';

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/lego/5.jpg'

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const getPerson = async() => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { email,phone } = person;
    const { first,last } = person.name;
    const { login:{password} } = person;
    const { large: image } = person.picture;
    const { dob:{age} } = person;
    const { street:{number,name} } = person.location;

    const newPerson = {
      image,email,phone,password,age,
      street: `${number} ${name}`,
      name: `${first} ${last}`
    }
    setPerson(newPerson);
    setLoading(false);
    setTitle('name');
    setValue(newPerson.name);
  }

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    if(e.target.classList.contains('icon')){
      const newValue = e.target.dataset.label;
      // console.log(newValue);
      setValue(person[newValue]);
      setTitle(newValue);
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img src={ (person && person.image) || defaultImage } alt="random person" />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name" 
            onMouseOver={handleValue}>
              <FaUser />
            </button>
            <button className="icon" data-label="email" 
            onMouseOver={handleValue}>
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" 
            onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button className="icon" data-label="street" 
            onMouseOver={handleValue}>
              <FaMap />
            </button>
            <button className="icon" data-label="phone" 
            onMouseOver={handleValue}>
              <FaPhone />
            </button>
            <button className="icon" data-label="password" 
            onMouseOver={handleValue}>
              <FaLock />
            </button>
          </div>
          <button type="button" className="btn" 
          onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
