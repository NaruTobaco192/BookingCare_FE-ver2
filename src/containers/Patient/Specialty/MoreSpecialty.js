import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllSpecialty, getSpecialtyBySearch } from '../../../services/userService';
import { withRouter } from 'react-router';
import './MoreSpecialty.scss'
class MoreSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            search: ''
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    handleOnChangeText = async (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    };
    handleSearch = async (search) => {
        let res = await getSpecialtyBySearch(search);
        if (res && res.errCode == 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }
    handleBack = () => {
        this.props.history.goBack();
    }
    render() {
        let { dataSpecialty } = this.state
        return (
            <div className='ms-container'>
                <div className='ms-header row'>
                    <button className='btn'
                        onClick={() => this.handleBack()}
                    >
                        <div className='btn-back'>
                            <i className="fas fa-arrow-left"></i>
                        </div>
                    </button>
                    <span className='title-ms'>
                        <FormattedMessage id="homepage.specialty-popular" />
                    </span>

                </div>
                <div className='search row'>
                    <input className='input-search form-control col-3'
                        placeholder="Nhập nội dung tìm kiếm"
                        onChange={(event) => this.handleOnChangeText(event, 'search')}
                        value={this.state.search}
                    />
                    <button className='btn-ms'
                        onClick={() => this.handleSearch(this.state.search)}
                    >Search
                    </button>
                </div>
                <div className='ms-body'>
                    {dataSpecialty && dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                            return (
                                <div className='ms-customize col-3' key={index}
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                >
                                    <div className='bg-image'
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    >
                                    </div>
                                    <div className='title-name'>{item.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreSpecialty));
