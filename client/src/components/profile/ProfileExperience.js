import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExperience = ({experience:{title,company,from}}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>From: <Moment format="DD/MM/YYYY">{from}</Moment></p>
            <p><strong>Position: </strong>{title}</p>
          </div>
    )
}

ProfileExperience.propTypes = {
    experience:PropTypes.object.isRequired
}

export default ProfileExperience
