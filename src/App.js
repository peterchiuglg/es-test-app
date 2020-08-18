import React, {useEffect, useState} from 'react';
import './App.css';
import Searchbox from "./searchbox";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState('');

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:8000/diagnostic?query=hello!")
      .then(res => {
        console.log(res)
        let promise = res.json();
        console.log(promise)
        return promise
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.query);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>{items}</div>
        <hr/>
        <Searchbox/>
      </div>
    );
  }
}

export default App;
