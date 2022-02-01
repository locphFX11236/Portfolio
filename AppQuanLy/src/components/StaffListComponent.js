import React, { Component } from 'react';
import { Card, CardImg, CardText,
    Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody,
    Button, Row
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { localUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';
import ModalForm from './ModalFormComponent';
import Search from './SearchComponent';

function Render ({ staffs }) {
    let Items = staffs.staffs
    if ( staffs.searchData.length !== 0 && staffs.searchData[1] !== '' ) { Items = staffs.searchData[0] }
    const List = Items.map((staff) => {
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

class StaffList extends Component  {

    constructor(props) {
        super(props);
    
        this.state = {
            isModalOpen: false,
        };
        
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        if (this.props.staffs.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.staffs.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.staffs.errMess}</h4>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <Row className="justify-content-between">
                        <Breadcrumb>
                            <BreadcrumbItem active>Staffs List</BreadcrumbItem>
                        </Breadcrumb>
                        <Button outline onClick={this.toggleModal}>Thêm nhân viên</Button>
                        <Search
                            staffs={this.props.staffs}
                            searchStaff={this.props.searchStaff}
                        />
                    </Row>
                    <Render staffs={this.props.staffs} />
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                        <ModalBody>
                            <ModalForm
                                postStaff={this.props.postStaff}
                                resetModalForm={this.props.resetModalForm}
                            />
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
}

export default StaffList;