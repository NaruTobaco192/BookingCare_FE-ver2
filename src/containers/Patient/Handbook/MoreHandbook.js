import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getAllHandbook, getHandbookBySearch } from '../../../services/userService';
import { withRouter } from 'react-router';
import './MoreHandbook.scss'
class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
            search: ''
        }
    }
    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }
    handleViewDetailHandbook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`)
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
        let res = await getHandbookBySearch(search);
        if (res && res.errCode == 0) {
            this.setState({
                dataHandbook: res.data
            })
        }
    }
    handleBack = () => {
        this.props.history.goBack();
    }
    render() {
        let { dataHandbook } = this.state
        return (
            <div className='mh-container'>
                <div className='mh-header row'>
                    <button className='btn'
                        onClick={() => this.handleBack()}
                    >
                        <div className='btn-back'>
                            <i className="fas fa-arrow-left"></i>
                        </div>
                    </button>
                    <span className='title-mh'>
                        <FormattedMessage id="homepage.handbook" />
                    </span>
                </div>
                <div className='search row'>
                    <input className='input-search form-control col-3'
                        placeholder="Nhập nội dung tìm kiếm"
                        onChange={(event) => this.handleOnChangeText(event, 'search')}
                        value={this.state.search}
                    />
                    <button className='btn-mh'
                        onClick={() => this.handleSearch(this.state.search)}
                    >Search
                    </button>
                </div>
                <div className='mh-body'>
                    {dataHandbook && dataHandbook.length > 0 &&
                        dataHandbook.map((item, index) => {
                            return (
                                <div className='mh-customize' key={index}
                                    onClick={() => this.handleViewDetailHandbook(item)}
                                >
                                    <div className='bg-image mh-handbook'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
