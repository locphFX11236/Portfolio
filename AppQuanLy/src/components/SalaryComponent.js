import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function Render ( {salarys} ) {
    const List = salarys.salarys.map(( salary ) => {
        return ( 
            <div className="border col-12 col-md-5 col-lg-3 m-1">
                <h3>{ salary.name }</h3>
                <p>Mã nhân viên: { salary.id }</p>
                <p>Hệ số lương: { salary.salaryScale }</p>
                <p>Số giờ làm thêm: { salary.overTime }</p>
                <p className="border">Lương: { salary.salary }</p>
            </div>
        )
    })

    return(
        <div className="row justify-content-center card-body">
            {List}
        </div>
    )
}

const Salary = (props) => {
    if ( props.salarys.isLoading ) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    } else if ( props.salarys.errMess ) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{ props.salarys.errMess }</h4>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Staffs List</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Salary</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <Render salarys={ props.salarys } />
            </div>
        )
    }
}

export default Salary;