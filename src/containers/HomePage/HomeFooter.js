import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import logo from '../../assets/images/logo.svg'
import { withRouter } from 'react-router';

class HomeFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
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
        return (
            <div className='home-footer'>
                <div className='info row'>
                    <div className='left col-6'>
                        <img className='logo' src={logo} />
                        <div className='company'>
                            <h2><FormattedMessage id="homepage.footer.company" /></h2>
                            <p className='up'>
                                <i class="fas fa-map-marker-alt"></i>
                                <FormattedMessage id="homepage.footer.address" />
                            </p>
                            <p className='down'>
                                <i class="fas fa-check"></i>
                                <FormattedMessage id="homepage.footer.number-business" />
                            </p>
                        </div>
                    </div>
                    <div className='mid col-3'>
                        <p onClick={() => this.handleViewMoreSpecialty()}>
                            <FormattedMessage id="home-header.specialty" />
                        </p>
                        <p onClick={() => this.handleViewMoreDoctor()}
                        ><FormattedMessage id="home-header.doctor" /></p>
                        <p onClick={() => this.handleViewMoreClinic()}
                        ><FormattedMessage id="menu.admin.clinic" /></p>
                        <p onClick={() => this.handleViewMoreHandBook()}
                        ><FormattedMessage id="menu.admin.handbook" /></p>
                        <p><FormattedMessage id="home-header.question" /></p>
                    </div>
                    <div className='right col-3'>
                        <p>
                            <p className='up'><FormattedMessage id="homepage.footer.headquarters" /></p>
                            <p className='down'><FormattedMessage id="homepage.footer.address" />
                            </p>
                        </p>
                        <p>
                            <p className='up'><FormattedMessage id="homepage.footer.office" /></p>
                            <p className='down'>
                                <FormattedMessage id="homepage.footer.address2" />
                            </p>
                        </p>
                        <p>
                            <p className='up'><FormattedMessage id="homepage.footer.customer-support" /></p>
                            <p className='down'>
                                support@bookingcareVN.com (7h - 18h)
                            </p>
                        </p>
                        <p>
                            <p className='up'>Hotline</p>
                            <p className='down'>
                                025-8402-3579 (7h - 18h)
                            </p>
                        </p>
                    </div>
                </div>
                <div className='social'>
                    <p className='copyright'>
                        &copy; 2022 BookingCare with Long. More informatio &nbsp;
                        <a href='https://github.com/NaruTobaco192' target='_blank'>
                            &#8594; Click Here &#8592;
                        </a>
                    </p>
                    <div className='fb'><i class="fab fa-facebook-f"></i></div>
                    <div className='ytb'><i class="fab fa-youtube"></i></div>
                    <div className='gg'><i class="fab fa-google-plus-g"></i></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
