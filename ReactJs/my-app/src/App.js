import logo from './logo.svg';
import './App.css';
import MyComponent from './views/Example/MyComponent';

/**
 * 2 components : class component / function component (function, arrow function)
 * JSX 
 */

function App() {
  return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MyComponent />
      </header>
    </div>
  );
}

export default App;
