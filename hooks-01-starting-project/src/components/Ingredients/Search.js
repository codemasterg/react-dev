import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const {onLoadIngredients} = props;  // extract subset of props we are interested in using ES6
  const [filterValue, setFilterValue] = useState('');
  const inputRef = useRef();  // ref to search input JSX field below

  useEffect(() => {

    const timer = setTimeout( () => {
      if (filterValue === inputRef.current.value) {  // if values the same, the user has stopped typing so make the query
        const queryParams = filterValue.length === 0 ? '' : `?orderBy="title"&equalTo="${filterValue}"`;
        fetch('https://react-hooks-update-9b3da.firebaseio.com/ingredients.json' + queryParams)
          .then(response => response.json())  // json() returns its own promise
          .then(responseData => {
            const loadedIngredients = [];
            for (let key in responseData) {
              loadedIngredients.push(
                {
                  ...responseData[key],
                  id: key,
                });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
  
    return () => {
      clearTimeout(timer);  // if a function is returned, it's executed at completion of useEffect()
    }
  }, [filterValue, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
            ref={inputRef}  // used by useRef() above
            value={filterValue} 
            onChange={event => setFilterValue(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
