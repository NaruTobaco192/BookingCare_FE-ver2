import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './AddSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast, Toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class AddSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
        // console.log('handleEditorChange', html, text);
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty succeed!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Add new specialty error!')
        }
    }
    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>
                    <FormattedMessage id="menu.admin.add-specialty" />
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-specialty.name-specialty" /></label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='menu.admin.photo-clinic' /></label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)} />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '350px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialty);
