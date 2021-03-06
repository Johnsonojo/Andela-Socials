import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import formatDate from '../../utils/formatDate';

const EventCard = (props) => {
  document.title = 'Events page';
  const {
    id, title, startDate, socialEvent, featuredImage,
  } = props;

  return (
    <Link className="event-link" to={`/events/${id}`}>
      <div className="event-card">
        <img src={featuredImage || '/assets/img/img_group_selfie.jpg'} alt={title} className="event-card__picture" />
        <div className="event-card__caption-group">
          <p className="event-card__caption event-card__caption--title">{title || 'Swimming Meetup'}</p>
          <p className="event-card__caption event-card__caption--date">{formatDate(startDate) || 'Saturday, July 22nd 2018'}</p>
          <p className="event-card__caption event-card__caption--tags">{`#${socialEvent.name}` || '#swimming #meetup'}</p>
        </div>
      </div>
    </Link>

  );
};
EventCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  startDate: PropTypes.string,
  featuredImage: PropTypes.string,
  socialEvent: PropTypes.objectOf(PropTypes.any),
};

EventCard.defaultProps = {
  id: '',
  title: '',
  startDate: '',
  socialEvent: {},
  featuredImage: '',

};


export default EventCard;
