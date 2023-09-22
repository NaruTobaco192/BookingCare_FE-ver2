import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./ManagePatient.scss";
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor, postPrescription } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import PrescriptionModal from './PrescriptionModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay'

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenPrescriptionModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }
    async componentDidMount() {
        this.getDataPatient()
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            name: item.patientData.firstName

        }
        this.setState({
            isOpenPrescriptionModal: true,
            dataModal: data
        })
    }
    closeModal = () => {
        this.setState({
            isOpenPrescriptionModal: false,
            dataModal: {}
        })
    }
    sendPrescription = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postPrescription({
            ...dataChild,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            name: dataModal.name
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send Prescription succeed!");
            this.closeModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error("Some thing wrong!");
            console.log('Send Prescription error: ', res)
        }
    }
    render() {
        let { dataPatient, isOpenPrescriptionModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Sending'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quản lý bệnh nhân khám bệnh
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-4 form-group'>
                                <label>Chọn ngày</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ width: '100%' }}>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>Họ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Action</th>
                                    </tr>
                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            let gender = language === LANGUAGES.VI ?
                                                item.patientData.genderData.value_Vi : item.patientData.genderData.value_En
                                            let time = language === LANGUAGES.VI ?
                                                item.timeTypeDataPatient.value_Vi : item.timeTypeDataPatient.value_En
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >
                                                            Xác nhận
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan='6' style={{ textAlign: 'center' }}>No data</td>
                                        </tr>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    <PrescriptionModal
                        isOpenModal={isOpenPrescriptionModal}
                        dataModal={dataModal}
                        closeModal={this.closeModal}
                        sendPrescription={this.sendPrescription}
                    />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
