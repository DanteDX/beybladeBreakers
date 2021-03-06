import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({
    profile:{skills,user:{name}}
}) => {
    return (
        <div className="profile-about bg-light p-2">
          <div className="line"></div>
          <h2 className="text-primary">{name}'s Skill Set</h2>
          <div className="skills">
            {
                skills.map((skill,index)=>{
                    return (
                        <div key={index} className="p-1">
                            <i className="fas fa-check"></i>
                            {skill}
                        </div>
                    )
                    
                })
            }
          </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileAbout
