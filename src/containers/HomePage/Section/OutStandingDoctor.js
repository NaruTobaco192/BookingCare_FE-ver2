import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
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
    handleViewMoreDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/more-doctor`)
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </span>
                        <button className='btn-section'
                            onClick={() => this.handleViewMoreDoctor()}
                        >
                            <FormattedMessage id="homepage.more-info" />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.value_Vi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='section-customize' key={index}
                                        >
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
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
                        </Slider>
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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
