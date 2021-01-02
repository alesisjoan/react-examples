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

  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'React'
  );

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
    }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


/*
React’s useEffect Hook takes two arguments: The first argument is a function where the side-effect
occurs. In our case, the side-effect is when the user types the searchTerm into the browser’s local
storage. The optional second argument is a dependency array of variables. If one of theses variables
changes, the function for the side-effect is called. In our case, the function is called every time the
searchTerm changes; and it’s also called initially when the component renders for the first time.
Leaving out the second argument, to be specific the dependency array, would make the function
for the side-effect run on every render (initial render and update renders) of the component. If the
dependency array of React’s useEffect is an empty array, the function for the side-effect is only called
once, after the component renders for the first time. The hook lets us opt into React’s component
lifecycle. It can be triggered when the component is first mounted, but also one of its dependencies
are updated.
Using React useEffect instead of managing the side-effect in the handler has made the application
more robust. Whenever and wherever searchTerm is updated via setSearchTerm, local storage will
always be in sync with it.
*/

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} />

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => (
  <div>
  <label htmlFor="search">Search: </label>
  <input
  id="search"
  type="text"
  value={search}
  onChange={onSearch}
  />
  </div>
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
