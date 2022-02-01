import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import DepartDetail from './DepartDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { postStaff, deleteStaff, patchStaff, searchStaff, fetchStaffs, fetchDeparts, fetchSalarys } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departs: state.departs,
        salarys: state.salarys
    }
};

const mapDispatchToProps = dispatch => ({
    postStaff: ( newStaff ) => dispatch( postStaff( newStaff ) ),
    deleteStaff: ( id ) => dispatch( deleteStaff( id ) ),
    patchStaff: ( id, data ) => dispatch( patchStaff( id, data ) ),
    searchStaff: ( searchData ) => dispatch( searchStaff( searchData ) ),
    fetchStaffs: () => { dispatch( fetchStaffs() ) },
    resetModalForm: () => { dispatch( actions.reset( 'modalForm' ) ) },
    fetchDeparts: () => { dispatch( fetchDeparts() ) },
    fetchSalarys: () => { dispatch( fetchSalarys() ) }
});

class Main extends Component {
    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDeparts();
        this.props.fetchSalarys()
    }

    render() {

        const StaffWithId = ({match}) => {
            return(
                <StaffDetail
                    staff={this.props.staffs.staffs.filter(
                        (staff) => staff.id === parseInt(match.params.staffId,10)
                    )[0]}
                    departs={this.props.departs.departs}
                    isLoading={this.props.staffs.isLoading}
                    errMess={this.props.staffs.errMess}
                    deleteStaff={this.props.deleteStaff}
                    patchStaff={this.props.patchStaff}
                />
            )
        }

        const DepartWithId = ({match}) => {
            return(
                <DepartDetail
                    depart={this.props.departs.departs.filter(
                        (depart) => depart.id === match.params.departId
                    )[0]}
                    staffs={this.props.staffs.staffs.filter(
                        (staff) => staff.departmentId === match.params.departId
                    )}
                    isLoading={this.props.departs.isLoading}
                    errMess={this.props.departs.errMess}
                />
            )
        }

        return (
            <div className="App text-center">
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch className="main" location={this.props.location}>
                            <Route exact path='/staff' component={
                                () => <StaffList
                                    staffs={this.props.staffs}
                                    staffsLoading={this.props.staffs.isLoading}
                                    staffsErrMess={this.props.staffs.errMess}
                                    resetModalForm={this.props.resetModalForm}
                                    searchStaff={this.props.searchStaff}
                                    postStaff={this.props.postStaff}
                                />
                            } />

                            <Route path='/staff/:staffId' component={StaffWithId}/>

                            <Route exact path='/department' component={
                                () => <Department
                                    departs={ this.props.departs }
                                    departsLoading={ this.props.departs.isLoading }
                                    departsErrMess={ this.props.departs.errMess }
                                />
                            } />

                            <Route path='/department/:departId' component={DepartWithId}/>

                            <Route exact path='/salary' component={
                                () => <Salary
                                    salarys={ this.props.salarys }
                                    salarysLoading={ this.props.salarys.isLoading }
                                    salarysErrMess={ this.props.salarys.errMess }
                                />
                            } />
                            
                            <Redirect to="/staff" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));