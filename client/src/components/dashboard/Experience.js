import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profile';

const Experience = ({experience,deleteExperience}) => {
    const experiences = experience.map(exp =>(
        <tr key={exp._id}>
            <td>{exp.title}</td>
            <td className="hide-sm">{exp.company}</td>
            <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{exp.from}</Moment>
            </td>
            <td>
                <button className="btn btn-danger" onClick={()=> deleteExperience(exp._id)}>DELETE</button>
            </td>
        </tr>
    ));
    return experience.length === 0 ? <div>No Experience added</div> :
        <Fragment>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th className="hide-sm">Company</th>
                        <th className="hide-sm">From</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired
}

export default connect(null,{deleteExperience})(Experience);
