import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment'
import LoadingOverlay from 'react-loading-overlay'

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthDay: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            isShowLoading: false,
        }

    }

    async componentDidMount() {
        this.props.getGenders();
    }
    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.value_Vi : item.value_En;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }
    handleOnChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }
    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true
        })
        let date = new Date(this.state.birthDay).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthDay: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,

        })
        this.setState({
            isShowLoading: false
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed')
            this.props.closeBookingModal();

            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthDay: '',
                selectedGender: '',
                doctorId: '',
                genders: '',
                timeType: '',
            })
        }
        else {
            toast.error('Booking a new appointment failed')
        }
    }
    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.value_Vi : dataTime.timeTypeData.value_En;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }
    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name;
        }
        return ''
    }
    render() {

        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }

        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Sending'
            >
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                //backdrop={true}
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className="left">
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className="right"
                                onClick={closeBookingModal}
                            >
                                <i className='fas fa-times'></i>
                            </span>
                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-info'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                        className='form-control'>
                                    </input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                        className='form-control'>
                                    </input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                        className='form-control'>
                                    </input>
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        className='form-control'>
                                    </input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                        className='form-control'>
                                    </input>
                                </div>
                                {/* <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.date" />
                                    </label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthDay}
                                    />
                                </div> */}
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleOnChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}>
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button className='btn-booking-cancel'
                                onClick={closeBookingModal}>
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);



