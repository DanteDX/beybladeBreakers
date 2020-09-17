import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';


const ProfileEducation = ({education:{school,degree,fieldofstudy,from}}) => {
    return (
        <div>
            <h3>{school}</h3>
            <p>From: <Moment format="DD/MM/YYYY">{from}</Moment></p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
          </div>
    )
}

ProfileEducation.propTypes = {
    education:PropTypes.object.isRequired
}

export default ProfileEducation
