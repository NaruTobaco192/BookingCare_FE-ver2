import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './PrescriptionModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from '../../../utils';

class PrescriptionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }

    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendPrescription = () => {
        this.props.sendPrescription(this.state)
    }
    render() {
        let { isOpenModal, closeModal, dataModal, sendPrescription } = this.props;

        return (
            <Modal
                isOpen={isOpenModal}
                className={'prescription-modal-container'}
                size="md"
                centered
            //backdrop={true}
            >
                <div className='modal-header'>
                    <h5 className='modal-title'>Gửi hóa đơn khám bệnh</h5>
                    <button className='close' type='button' aria-label='Close' onClick={closeModal}>
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                                disabled={true}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnChangeImg(event)}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                        onClick={() => this.handleSendPrescription()}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={closeModal}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);



