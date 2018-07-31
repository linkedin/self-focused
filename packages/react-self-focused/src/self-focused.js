import React from 'react';
import PropTypes from 'prop-types';
import FocusManager from './focus-manager';

class SelfFocused extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.focusManager = new FocusManager();
  }

  render() {
    return <div ref={this.ref} className="self-focused">{this.props.children}</div>;
  }

  componentDidMount() {
    this.focusManager.componentDidMount(this.ref.current);
  }

  componentDidUpdate() {
    this.focusManager.componentDidUpdate(this.ref.current);
  }
}

SelfFocused.propTypes = {
  children: PropTypes.node.isRequired
};

export default SelfFocused;
