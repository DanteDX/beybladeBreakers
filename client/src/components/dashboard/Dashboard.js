import React,{useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {getCurrentProfile} from '../../actions/profile';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import DashBoardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';
import {deleteAccount} from '../../actions/profile';

const Dashboard = ({auth:{user},profile:{profile,loading},getCurrentProfile,deleteAccount}) => {
    
    useEffect(()=>{
        getCurrentProfile()
    },[getCurrentProfile]);
    return (loading && profile === null) ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i>Welcome {user && user.name}
        </p>
        {profile !== null ? <Fragment>
            {user.name} has profile 
            <DashBoardActions />
            <Experience experience={profile.experience}/>
            <Education education={profile.education} />

            <div className="my-2">
                <button className="btn btn-danger" onClick={()=> deleteAccount()}>
                    <i className="fas fas-user-minus"></i>
                    DELETE ACCOUNT
                </button>
            </div>
        </Fragment> :<Fragment>
            <p>Add More info to create profile</p>
            <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>}
    </Fragment>
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
