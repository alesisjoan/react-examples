import React from 'react';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const useSemiPersistentState = (key, initialState) => {
    
    const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
    );
    
    React.useEffect(() => {
        localStorage.setItem(key, value);
      }, [value, key]);
      return [value, setValue];
  };

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

/*A fragment wraps other elements into a single top-level element without adding to the rendered
output. Both Search elements should be visible in your browser now, with input field and label. So if
you prefer to omit the wrapping <div> or <span> elements, substitute them with an empty tag that
is allowed in JSX, and doesn’t introduce intermediate elements in our rendered HTML*/

const Search = ({ search, onSearch }) => (
  <>
  <label htmlFor="search">Search: </label>
  <input
  id="search"
  type="text"
  value={search}
  onChange={onSearch}
  />
  </>
  );

const List = ({ list }) =>
  list.map(({ objectID, ...item }) => <Item key={objectID} {...item} />);

  
const Item = ({ title, url, author, num_comments, points }) => (
  <div>
  <span>
  <a href={url}>{title}</a>
  </span>
  <span>{author}</span>
  <span>{num_comments}</span>
  <span>{points}</span>
  </div>
  );

export default App;
