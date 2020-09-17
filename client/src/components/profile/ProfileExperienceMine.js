import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileExperience = ({profile:{experience}}) => {
    return (
        <div>
            <h1>Experiences</h1>
            <ol>
                {
                    experience.length > 0 ? (<Fragment>
                        {experience.map((exp,index) => {
                            return(
                                <li key={index}>
                                    <h3>Title: {exp.title}</h3>
                                    <h3>Company: {exp.company}</h3>
                                    <h3>From: <Moment format="DD/MM/YYYY">{exp.from}</Moment></h3>
                                    <h3>.................................</h3>
                                </li>
                            )
                        })}
                    </Fragment>) : (<h4>
                        NO Experience has been added
                    </h4>)
                }
            </ol>
        </div>
    )
}

ProfileExperience.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileExperience
