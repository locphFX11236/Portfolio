import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row,
    Card, CardImg, CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { localUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function Render ({ staffs }) {
    const List = staffs.map((staff) => {
        return (
            <Card key={staff.id} className="border col-6 col-md-4 col-lg-2" >
                <FadeTransform in transformProps={ { exitTransform: 'scale(0.5) translateY(-50%)' } } >
                    <Link to={ `/staff/${ staff.id }` } >
                        <CardImg width="100%" src={ localUrl + staff.image } alt={ staff.name } />
                        <CardText>{ staff.name }</CardText>
                    </Link>
                </FadeTransform>
            </Card>
        )
    })

    return (
        <div className="row justify-content-center card-body">
            {List}
        </div>
    )
}

const  DepartDetail = ( props ) => {
    if ( props.isLoading ) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if ( props.errMess ) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{ props.errMess }</h4>
                </div>
            </div>
        );
    } else if ( props.depart !== undefined ) {    
        return(
            <div className="container">
                <Row className="justify-content-between">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Staffs List</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/department">Department</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{ props.depart.name }</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <Render staffs={ props.staffs }/>
            </div>
        )
    } else {
        return(
            <div className="container">
                <Row className="justify-content-between">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Staffs List</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/department">Department</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{ props.depart.name }</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <div  className="card-body">
                    <h2>Không có thông tin</h2>
                    <Link to="/department">Quay lại</Link>
                </div>
            </div>
        )
    }
}

export default DepartDetail