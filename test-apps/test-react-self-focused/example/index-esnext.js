import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SelfFocused from 'react-self-focused';

const Home = () => (
  <SelfFocused name="Home">
    <div>
      <h2>Home</h2>
    </div>
  </SelfFocused>
);

const About = () => (
  <SelfFocused name="About">
    <div>
      <h2>About</h2>
    </div>
  </SelfFocused>
);

const Topic = ({match}) => (
  <SelfFocused name={match.params.topicId}>
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  </SelfFocused>
);

Topic.propTypes = {
  match: PropTypes.string.isRequired
};

const Topics = ({match}) => (
  <SelfFocused name="Topics">
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/router`}>Router</Link>
        </li>
      </ul>

      <Route path={`${match.url}/:topicId`} component={Topic}/>
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  </SelfFocused>
);

Topics.propTypes = {
  match: PropTypes.string.isRequired
};

const BasicExample = () => (
  <SelfFocused name="App">
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr/>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </Router>
  </SelfFocused>
);

ReactDOM.render(
  <BasicExample/>,
  document.getElementById('root')
);
