import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEducation = ({profile:{education}}) => {
    return (
        <div>
            <h1>Educations</h1>
            <ol>
                {
                    education.length > 0 ? (<Fragment>
                        {education.map((edu,index) => {
                            return(
                                <li key={index}>
                                    <h3>School: {edu.school}</h3>
                                    <h3>Degree: {edu.degree}</h3>
                                    <h3>Field of Study: {edu.fieldofstudy}</h3>
                                    <h3>From: <Moment format="DD/MM/YYYY">{edu.from}</Moment></h3>
                                    <h3>.................................</h3>
                                </li>
                            )
                        })}
                    </Fragment>) : (<h4>
                        NO Education has been added
                    </h4>)
                }
            </ol>
        </div>
    )
}

ProfileEducation.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileEducation
