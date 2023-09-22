import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import { getDoctorBySearch } from '../../../services/userService';
import './MoreDoctor.scss'
class MoreDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
            search: ''
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            // let {resSpecialty} = this.props.topDoctorsRedux
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    async componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.Doctor_Infor.specialtyData.id}`)
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
        console.log(search)
        let res = await getDoctorBySearch(search);
        if (res && res.errCode == 0) {
            this.setState({
                arrDoctors: res.data
            })
        }
        console.log(this.state.arrDoctors)
    }
    handleBack = () => {
        this.props.history.goBack();
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props
        return (
            <div className='moreDoctor-container'>
                <div className='moreDoctor-header row'>
                    <button className='btn'
                        onClick={() => this.handleBack()}
                    >
                        <div className='btn-back'>
                            <i className="fas fa-arrow-left"></i>
                        </div>
                    </button>
                    <span className='title-moreDoctor'>
                        <FormattedMessage id="homepage.outstanding-doctor" />
                    </span>
                </div>
                <div className='search row'>
                    <input className='input-search form-control col-3'
                        placeholder="Nhập nội dung tìm kiếm"
                        onChange={(event) => this.handleOnChangeText(event, 'search')}
                        value={this.state.search}
                    />
                    <button className='btn-moreDoctor'
                        onClick={() => this.handleSearch(this.state.search)}
                    >Search
                    </button>
                </div>
                <div className='moreDoctor-body'>
                    {arrDoctors && arrDoctors.length > 0 &&
                        arrDoctors.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            let nameVi = `${item.positionData.value_Vi}, ${item.lastName} ${item.firstName}`
                            let nameEn = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}`
                            return (
                                <div className='moreDoctor-customize' key={index}
                                >
                                    <div className='customize-border'>
                                        <div className='outer-bg'>
                                            <div className='bg-image moreDoctor-outstanding-doctor'
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                onClick={() => this.handleViewDetailDoctor(item)}
                                            />
                                        </div>
                                    </div>
                                    <div className='position text-center'>
                                        <div className='title-name'
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                        <div className='specialty-name'
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            {item.Doctor_Infor.specialtyData.name
                                            }
                                        </div>
                                    </div>
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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreDoctor));
