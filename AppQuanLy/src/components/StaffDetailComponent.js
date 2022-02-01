import React from 'react';
import { Breadcrumb, BreadcrumbItem,
    // Col, Label,
    Button, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';
import { localUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
// import { Control, Form, Errors } from 'react-redux-form';

function Render({ staff, departs }) {
    // console.log(departs)
    staff.department = departs.filter(
        (depart) => depart.id === staff.departmentId
    )[0].name
    return (
        <FadeTransform in transformProps={ { exitTransform: 'scale(0.5) translateY(-50%)' } }>
            <div className="row justify-content-center card-body">
                <img className="col-12 col-md-4 col-lg-3" width="100%" src={ localUrl + staff.image } alt={ staff.name } />
                <div className="col-12 col-md-8 col-lg-9 text-left">
                    <Stagger in>
                        <h4>Họ và tên: { staff.name }</h4>
                        <Fade in>
                            <p>Ngày sinh: { dateFormat( staff.doB, "dd/mm/yyyy" ) }</p>
                            <p>Ngày vào công ty: { dateFormat( staff.startDate, "dd/mm/yyyy" ) }</p>
                            <p>Phòng ban: { staff.department }</p>
                            <p>Số ngày nghỉ còn lại: { staff.annualLeave }</p>
                            <p>Số ngày đã làm thêm: { staff.overTime }</p>
                        </Fade>
                    </Stagger>
                </div>
            </div>
        </FadeTransform>
    )
}

// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));

const  StaffDetail = ( props ) => {
    function DeleteStaff () {
        return props.deleteStaff(props.staff.id)
    }

    // const handleSubmit = (values) => {
    //     const data = {
    //         name: values.name,
    //         doB: values.doB,
    //         salaryScale: Number(values.salaryScale),
    //         startDate: values.startDate,
    //         departmentId: values.departmentId,
    //         annualLeave: Number(values.annualLeave),
    //         overTime: Number(values.overTime),
    //     }
    //     return props.patchStaff( props.staff.id, data )
    // }

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
    } else if ( props.staff !== undefined ) {    
        return(
            <div className="container">
                <Row className="justify-content-between">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Staffs List</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{ props.staff.name }</BreadcrumbItem>
                    </Breadcrumb>
                    <Button outline onClick={DeleteStaff}>
                        <Link to="/staff">Xóa nhân viên</Link>
                    </Button>
                </Row>
                <Render staff={ props.staff } departs={ props.departs }/>
                <hr/>
                {/* <h3>Cập nhật thông tin nhân viên</h3>
                <Form model="modalForm" onSubmit={ (values) => handleSubmit(values) }>
                    <Row className="form-group m-2">
                        <Label htmlFor="name" md={5}>Nhập tên</Label>
                        <Col md={7}>
                            <Control.text model=".name" name="name"
                                placeholder="Nhập tên"
                                className="form-control"
                                defaultValue={ props.staff.name }
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    required: 'Không bỏ trống. ',
                                    minLength: 'Phải dài hơn 2 kí tự.',
                                    maxLength: 'Phải ít hơn 16 kí tự.'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group m-2">
                        <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                        <Col md={7}>
                            <Control.text model=".doB" name="doB"
                                placeholder="Ngày sinh"
                                className="form-control"
                                defaultValue={ props.staff.doB }
                                validators={{ required }}
                            />
                            <Errors
                                className="text-danger"
                                model=".doB"
                                show="touched"
                                messages={{ required: 'Không bỏ trống.' }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group m-2">
                        <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                        <Col md={7}>
                            <Control.text model=".salaryScale" name="salaryScale"
                                placeholder="Hệ số lương"
                                className="form-control"
                                defaultValue={ props.staff.salaryScale }
                                validators={{
                                    isNumber
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".salaryScale"
                                show="touched"
                                messages={{
                                    required: 'Không bỏ trống. ',
                                    isNumber: 'Phải là một số.'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group m-2">
                        <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                        <Col md={7}>
                            <Control.text model=".startDate" name="startDate"
                                placeholder="Ngày vào công ty"
                                className="form-control"
                                defaultValue={ props.staff.startDate }
                                validators={{
                                    required
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".startDate"
                                show="touched"
                                messages={{
                                    required: 'Không bỏ trống.'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group m-2">
                        <Label htmlFor="departmentId" md={5}>Phòng ban</Label>
                        <Col md={7}>
                            <Control.select 
                                model=".departmentId" 
                                name="departmentId"
                                className="form-control"
                                defaultValue={ props.staff.departmentId }
                                validators={{ required }}
                            >
                                <option value="Dept01">Sale</option>
                                <option value="Dept02">HR</option>
                                <option value="Dept03">Marketing</option>
                                <option value="Dept04">IT</option>
                                <option value="Dept05">Finance</option>
                            </Control.select>
                            <Errors
                                className="text-danger"
                                model=".departmentId"
                                show="touched"
                                messages={{ required: 'Không bỏ qua.' }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group m-2">
                        <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                        <Col md={7}>
                            <Control.text model=".annualLeave" name="annualLeave"
                                placeholder="Số ngày nghỉ còn lại"
                                className="form-control"
                                defaultValue={ props.staff.annualLeave }
                                validators={{
                                    isNumber
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".annualLeave"
                                show="touched"
                                messages={{
                                    required: 'Không bỏ trống. ',
                                    isNumber: 'Phải là một số.'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group m-2">
                        <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                        <Col md={7}>
                            <Control.text model=".overTime" name="overTime"
                                placeholder="Số ngày đã làm thêm"
                                className="form-control"
                                defaultValue={ props.staff.overTime }
                                validators={{
                                    isNumber
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".overTime"
                                show="touched"
                                messages={{
                                    required: 'Không bỏ trống. ',
                                    isNumber: 'Phải là một số.'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group m-2">
                        <Col md={{size:8, offset: 4}}>
                            <Button type="submit" value="submit" color="primary">
                                Gửi
                            </Button>
                        </Col>
                    </Row>
                </Form> */}
            </div>
        )
    } else {
        return(
            <div className="container">
                <Row className="justify-content-between">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Staffs List</Link></BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <div  className="card-body">
                    <h2>Không có thông tin</h2>
                    <Link to="/staff">Quay lại trang chủ</Link>
                </div>
            </div>
        )
    }
}

export default StaffDetail;