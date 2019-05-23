import React from 'react';
import PropTypes from 'prop-types';
import SlackIcon from '../../assets/icons/SlackIcon';

const SlackModal = ({
  modalDisplay, closeModal,
}) => (
  <div className="slack__modal" style={{ display: modalDisplay }}>
    <div className="slack__modal-content">
      <div className="slack__modal-flex-container">
        <h2>Connect To Slack</h2>
        <SlackIcon position="relative" width="1.5em" color="#365DDB"/>
      </div>
      <p className="slack__modal-text">
        To add your event to a slack channel we need you to connect to slack first.
      </p>
      <div className="slack__modal-flex-container">
        <button
          type="button"
          className="slack__modal-cancel"
          onClick={closeModal}>CANCEL</button>
        <button type="button" className="btn-blue">CONFIRM</button>
      </div>
    </div>
  </div>
);

SlackModal.propTypes = {
  modalDisplay: PropTypes.string,
  closeModal: PropTypes.func,
};

SlackModal.defaultProps = { modalDisplay: 'none' };

export default SlackModal;
