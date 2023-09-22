import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageHandBook.scss';
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
import { getAllHandbook, getAllDetailHandbookById, getDetailHandbookById } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay'

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandBook extends Component {

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

            listHandbook: [],
            name: '',
            selectedHandbook: '',
            isShowLoading: false
        }
    }
    async componentDidMount() {
        let resHandbook = await getAllHandbook();
        let dataSelectHandbook = this.buildDataInputSelect(resHandbook.data, 'HANDBOOK');

        this.setState({
            listHandbook: dataSelectHandbook,
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.language !== this.props.language) {

            let resHandbook = await getAllHandbook();
            let dataSelectHandbook = this.buildDataInputSelect(resHandbook.data, 'HANDBOOK');

            this.setState({
                listHandbook: dataSelectHandbook,
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
    handleSaveContentMarkdown = async () => {
        let { hasOldData } = this.state;
        this.props.saveDetailHandbook({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            handbookId: this.state.selectedHandbook.value,

            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            name: this.state.name,
            image: this.state.image
        })
        this.setState({
            contentHTML: '',
            contentMarkdown: '',
            hasOldData: false,
            name: '',
            selectedHandbook: '',
            image: '',
            previewImgUrl: ''
        })
        let resHandbook = await getAllHandbook();
        let dataSelectHandbook = this.buildDataInputSelect(resHandbook.data, 'HANDBOOK');

        this.setState({
            listHandbook: dataSelectHandbook,
        })
    }
    handleChangeSelect = async (selectedHandbook) => {
        this.setState({ selectedHandbook });

        let res = await getDetailHandbookById(selectedHandbook.value);
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
            if (type === 'HANDBOOK') {
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

    handleDeleteHandbook = async (handbookId) => {
        if (window.confirm("Are you sure you want to delete?")) {
            this.setState({
                isShowLoading: true
            })
            this.props.deleteHandbook(handbookId);
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                previewImgUrl: '',
                image: '',
                name: '',
                address: '',
                selectedHandbook: ''
            })
            this.setState({
                isShowLoading: false
            })
        }
        let resHandbook = await getAllHandbook();
        let dataSelectHandbook = this.buildDataInputSelect(resHandbook.data, 'HANDBOOK');

        this.setState({
            listHandbook: dataSelectHandbook,
        })
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
                <div className='manage-handbook-container'>
                    <div className='ms-title'>
                        <FormattedMessage id="menu.admin.manage-handbook" />
                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-handbook" />
                            </label>
                            <Select
                                value={this.state.selectedHandbook}
                                onChange={this.handleChangeSelect}
                                options={this.state.listHandbook}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-handbook" />}
                                name="selectedHandbook"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="admin.manage-handbook.name-handbook" /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'name')}
                                value={this.state.name} />
                        </div>
                        <div className='col-3 form-group'>
                            <label>
                                <FormattedMessage id='menu.admin.photo-handbook' />
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
                        onClick={() => this.handleDeleteHandbook(this.state.selectedHandbook.value)}
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

        saveDetailHandbook: (data) => dispatch(actions.saveDetailHandbook(data)),
        deleteHandbook: (id) => dispatch(actions.deleteHandbook(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
