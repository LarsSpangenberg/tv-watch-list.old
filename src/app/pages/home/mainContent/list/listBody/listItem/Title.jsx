import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';


class Title extends Component {
  constructor(props) {
    super(props);
    this.titleRef = createRef();
  }

  componentDidMount() {
    const { isNew } = this.props;
    if (isNew) {
      this.titleRef.current.focus();
    }
  }

  render() {
    const { styleClass, title, handleChange } = this.props;
    return (
      <td className={styleClass}>
        <div
          name="title"
          type="text"
          data-text="New Show"
          data-name="title"
          onInput={handleChange}
          ref={this.titleRef}
          contentEditable
          suppressContentEditableWarning
        >
          {title}
        </div>
      </td>
    );
  }
}

Title.propTypes = {
  styleClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isNew: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Title;
