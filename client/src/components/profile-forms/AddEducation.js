import React,{Fragment,useState} from 'react'
import PropTypes from 'prop-types'
import {Link,withRouter} from 'react-router-dom';
import {addEducation} from '../../actions/profile';
import {connect} from 'react-redux';

const AddEducation = ({addEducation,history}) => {
    const [formData,setFormData] = useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:''
    });
    const {
        school,
        degree,
        fieldofstudy,
        from
    } = formData;
    const onChange = e => setFormData({...formData,[e.target.name]:[e.target.value]});
    const onSubmit = e =>{
        e.preventDefault();
        console.log(formData);
        addEducation(formData,history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy"
            value={fieldofstudy}
            onChange={e => onChange(e)} />

        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"
            value={from}
            onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value="" /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null,{addEducation})(withRouter(AddEducation));