import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSpecialty.scss';
import * as actions from '../../../store/actions/';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// import { confirmAlert } from "react-confirm-alert";
import Select from 'react-select';
import { getDetailSpecialtyById } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay'

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            previewImgUrl: '',
            image: '',
            isOpen: false,
            hasOldData: false,
            //save to doctor-infor table

            listSpecialty: [],
            name: '',
            selectedSpecialty: '',
            isShowLoading: false
        }
    }
    componentDidMount() {
        this.props.getAllRequiredDoctorInfo();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {

            let { resSpecialty } = this.props.allRequiredDoctorInfo;
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            this.setState({
                listSpecialty: dataSelectSpecialty,
            })
        }
        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resSpecialty } = this.props.allRequiredDoctorInfo;
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            this.setState({
                listSpecialty: dataSelectSpecialty,
            })
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        })
        // console.log('handleEditorChange', html, text);
    }
    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                image: base64
            })
        }
    }
    OpenPreviewImg = () => {
        if (!this.state.previewImgUrl) {
            return;
        }
        this.setState({
            isOpen: true,
        })
    }
    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailSpecialty({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            specialtyId: this.state.selectedSpecialty.value,

            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            name: this.state.name,
            image: this.state.image
        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            hasOldData: false,
            name: '',
            selectedSpecialty: '',
            image: '',
            previewImgUrl: ''
        })
        this.props.getAllRequiredDoctorInfo();
    }
    handleChangeSelect = async (selectedSpecialty) => {
        this.setState({ selectedSpecialty });

        let res = await getDetailSpecialtyById(selectedSpecialty.value);
        if (res && res.errCode === 0 && res.data) {
            let name = '', contentHTML = '', contentMarkdown = '', image = ''

            if (res.data) {
                name = res.data.name;
                contentHTML = res.data.descriptionHTML;
                contentMarkdown = res.data.descriptionMarkdown;
                image = res.data.image
            }
            this.setState({
                contentHTML: contentHTML,
                contentMarkdown: contentMarkdown,
                hasOldData: true,
                name: name,
                image: image,
                previewImgUrl: image
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                hasOldData: false,
                name: '',
                previewImgUrl: ''
            })
        }
    };
    handleOnChangeText = async (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    };
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }
        return result;
    }
    // handleDeleteConfirm = (specialtyId) => {
    //     confirmAlert({
    //         title: 'Confirm to submit',
    //         message: 'Are you sure to do this.',
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: () => this.handleDeleteSpecialty(specialtyId)
    //             },
    //             {
    //                 label: 'No',
    //                 //onClick: () => alert('Click No')
    //             }
    //         ]
    //     });
    // }

    handleDeleteSpecialty = async (specialtyId) => {
        if (window.confirm("Are you sure you want to delete?")) {
            this.setState({
                isShowLoading: true
            })
            this.props.deleteSpecialty(specialtyId);
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                previewImgUrl: '',
                image: '',
                name: '',
                address: '',
                selectedSpecialty: ''
            })
            this.setState({
                isShowLoading: false
            })
        }
        this.props.getAllRequiredDoctorInfo();
    }
    render() {
        let { hasOldData } = this.state;
        // console.log(this.props.allRequiredDoctorInfo)
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Deleting'
            >
                <div className='manage-specialty-container'>
                    <div className='ms-title'>
                        <FormattedMessage id="menu.admin.manage-specialty" />
                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-specialty" />
                            </label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelect}
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-specialty" />}
                                name="selectedSpecialty"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-specialty.name-specialty" /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'name')}
                                value={this.state.name} />
                        </div>
                        <div className='col-3 form-group'>
                            <label>
                                <FormattedMessage id='menu.admin.photo-specialty' />
                            </label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type='file' hidden
                                    onChange={(event) => this.handleOnChangeImg(event)}
                                />
                                <label className='label-upload' htmlFor='previewImg'>
                                    <FormattedMessage id="admin.manage-clinic.upload-photo" />
                                    <i className='fas fa-upload'></i>
                                </label>
                                <div className='previewImage'
                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    onClick={() => this.OpenPreviewImg()}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '350px' }} renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {hasOldData === true ?
                            <span>
                                <FormattedMessage id="admin.manage-doctor.save" />
                            </span>
                            :
                            <span>
                                <FormattedMessage id="admin.manage-doctor.add" />
                            </span>}
                    </button>
                    <button className='delete-btn'
                        onClick={() => this.handleDeleteSpecialty(this.state.selectedSpecialty.value)}
                    >
                        <span>
                            <FormattedMessage id="admin.manage-clinic.Delete-btn" />
                        </span>
                    </button>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctorsRedux: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        saveDetailSpecialty: (data) => dispatch(actions.saveDetailSpecialty(data)),
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
