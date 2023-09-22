import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import AddSpecialty from '../containers/System/Specialty/AddSpecialty';
import AddClinic from '../containers/System/Clinic/AddClinic';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageHandBook from '../containers/System/HandBook/ManageHandBook';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import AddHandBook from '../containers/System/HandBook/AddHandBook';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/add-specialty" component={AddSpecialty} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/add-clinic" component={AddClinic} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route path="/system/add-handbook" component={AddHandBook} />
                            <Route path="/system/manage-handbook" component={ManageHandBook} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
