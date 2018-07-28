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
    this.focusManager.updateIsFirstRender();
    return <div ref={this.ref} className="self-focused">{this.props.children}</div>;
  }

  componentDidMount() {
    this.focusManager.nominateNodeToBeFocused(this.ref.current, 'mount');
  }

  componentDidUpdate() {
    this.focusManager.nominateNodeToBeFocused(this.ref.current, 'update');
  }
}

SelfFocused.propTypes = {
  children: PropTypes.node.isRequired
};

export default SelfFocused;
