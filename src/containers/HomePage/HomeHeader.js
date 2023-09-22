import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }
    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
    }

    /* Set the width of the side navigation to 0 */
    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
    }

    handleViewMoreSpecialty = () => {
        if (this.props.history) {
            this.props.history.push(`/more-specialty`)
        }
    }
    handleViewMoreDoctor = () => {
        if (this.props.history) {
            this.props.history.push(`/more-doctor`)
        }
    }
    handleViewMoreClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/more-clinic`)
        }
    }
    handleViewMoreHandBook = () => {
        if (this.props.history) {
            this.props.history.push(`/more-handbook`)
        }
    }

    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            {/* <i className="fas fa-bars"></i> */}
                            <div id="mySidenav" class="sidenav">
                                <a href="javascript:void(0)" class="closebtn"
                                    onClick={() => this.closeNav()}>&times;</a>
                                <a onClick={() => this.handleViewMoreSpecialty()}>
                                    <FormattedMessage id="home-header.specialty" /></a>
                                <a onClick={() => this.handleViewMoreDoctor()}>
                                    <FormattedMessage id="home-header.doctor" /></a>
                                <a onClick={() => this.handleViewMoreClinic()}>
                                    <FormattedMessage id="menu.admin.clinic" /></a>
                                <a onClick={() => this.handleViewMoreHandBook()}>
                                    <FormattedMessage id="menu.admin.handbook" /></a>
                            </div>

                            <span onClick={() => this.openNav()}>
                                <i className="fas fa-bars"></i>
                            </span>

                            <img className='header-logo' src={logo}
                                onClick={() => this.returnToHome()}
                            />

                        </div>
                        <div className={language === LANGUAGES.VI ? "center-content" : "center-content-en"}>
                            <div className='child-content'>
                                <div><b
                                    onClick={() => this.handleViewMoreSpecialty()}
                                >
                                    <FormattedMessage id="home-header.specialty" />
                                </b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>

                            <div className='child-content'>
                                <div><b
                                    onClick={() => this.handleViewMoreClinic()}
                                >
                                    <FormattedMessage id="home-header.health-facility" />
                                </b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.select-room" />
                                </div>

                            </div><div className='child-content'>
                                <div><b
                                    onClick={() => this.handleViewMoreDoctor()}
                                >
                                    <FormattedMessage id="home-header.doctor" />
                                </b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.choose-doctor" />
                                </div>

                            </div><div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="home-header.fee" />

                                </b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vn active' : 'language-vn'}
                            ><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&

                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                <FormattedMessage id="banner.title1" />

                            </div>
                            <div className='title2'>
                                <FormattedMessage id="banner.title2" />

                            </div>
                            <div className='search'>
                                <i className="fas fa-search"></i>
                                <input type='text'
                                    placeholder="Nhập nội dung tìm kiếm..." />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='option'>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="far fa-hospital"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child2" />

                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child3" />

                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child4" />

                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child5" />

                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
