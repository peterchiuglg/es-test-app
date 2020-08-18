import React, {useState} from 'react';
import './App.css';

function Searchbox() {
  const [q, setQ] = useState('')
  const [r, setR] = useState('none')

  const onClickHandler = () => {
    console.log(`hello ${q}`)
    setR('done')

    const SERVER_URL = 'https://gs4xwja1ci.execute-api.us-east-1.amazonaws.com/dev/diagnostic?query='
    // `http://localhost:8000/diagnostic?query=`;
    fetch(`${SERVER_URL}${q}`)
      .then(res => {
        console.log(res)
        let promise = res.json();
        console.log(promise)
        return promise
      })
      .then(
        (result) => {
          setR(result.query)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('error')
        }
      )
  }

  return (
    <div>
      query: {q}
      <br/>
      response: {r}
      <br/>
      <input value={q} onChange={e => setQ(e.target.value)}/>
      <button onClick={onClickHandler}>submit</button>
    </div>
  )
}

export default Searchbox;
