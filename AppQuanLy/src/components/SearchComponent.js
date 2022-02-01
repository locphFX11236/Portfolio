import React, { Component } from 'react';
import { Button, Row, Input } from 'reactstrap';

class Search extends Component  {

    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch() {
        const searchData = [
            this.props.staffs.staffs.filter(
                (staff) => staff.name.toLowerCase().includes(this.search.value)
            ),
            this.search.value
        ]
        this.props.searchStaff( searchData )
    }

    render() {
        return(
            <Row className="col-12 col-md-5 justify-content-end" >
                <Input
                    className="col-10"
                    type="search"
                    placeholder="Search"
                    innerRef={(input) => this.search = input}
                />
                <Button onClick={this.handleSearch} className="col-2" type="button">
                    <i class="fa fa-search"></i>
                </Button>
            </Row>
        )
    }
}

export default Search