import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllClinic, getClinicBySearch } from '../../../services/userService';
import { withRouter } from 'react-router';
import './MoreClinic.scss'

class MoreClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
            search: ''
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
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
        let res = await getClinicBySearch(search);
        if (res && res.errCode == 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }
    handleBack = () => {
        this.props.history.goBack();
    }
    render() {
        let { dataClinic } = this.state
        return (
            <div className='mc-share mc-clinic'>
                <div className='mc-container'>
                    <div className='mc-header row'>
                        <button className='btn'
                            onClick={() => this.handleBack()}
                        >
                            <div className='btn-back'>
                                <i className="fas fa-arrow-left"></i>
                            </div>
                        </button>
                        <span className='title-mc'>
                            <FormattedMessage id="homepage.clinic-popular" />
                        </span>
                    </div>
                    <div className='search row'>
                        <input className='input-search form-control col-3'
                            placeholder="Nhập nội dung tìm kiếm"
                            onChange={(event) => this.handleOnChangeText(event, 'search')}
                            value={this.state.search}
                        />
                        <button className='btn-mc'
                            onClick={() => this.handleSearch(this.state.search)}
                        >Search
                        </button>
                    </div>
                    <div className='mc-body'>
                        {dataClinic && dataClinic.length > 0 &&
                            dataClinic.map((item, index) => {
                                return (
                                    <div className='mc-customize' key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className='bg-image mc-clinic'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreClinic));
