import React from 'react';
import FocusManager from './focus-manager';

class SelfFocused extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.focusManager = new FocusManager();
  }

  render() {
    this.focusManager.updateIsFirstRender();
    return <div className="self-focused" ref={this.ref}>{this.props.children}</div>;
  }

  componentDidMount() {
    this.focusManager.setNodeToBeFocused(this.ref.current, 'mount');
  }

  componentDidUpdate() {
    this.focusManager.setNodeToBeFocused(this.ref.current, 'update');
  }
}

export default SelfFocused;
