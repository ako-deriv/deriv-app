import DocumentUploader from '@binary-com/binary-document-uploader';
import classNames       from 'classnames';
import React            from 'react';
import { FileDropzone } from 'deriv-components';
import BinarySocket     from '_common/base/socket_base';
import {
    compressImg,
    convertToBase64,
    isImageType }       from '_common/image_utility';
import { localize }     from 'App/i18n';
import IconCloudUpload  from 'Assets/AccountManagement/ProofOfAddress/icon-cloud-uploading.svg';
import IconRemoveFile   from 'Assets/AccountManagement/icon-remove-file.svg';
import {
    filesize_error_message,
    getFormatFromMIME,
    getSupportedFiles,
    max_document_size,
    supported_filetypes,
    unsupported_file_message } from './constants';

const UploadMessage = (
    <>
        <IconCloudUpload className='dc-file-dropzone__message-icon' />
        <div className='dc-file-dropzone__message-subtitle' >
            {localize('Drop file (JPEG  JPG  PNG  PDF  GIF) or click here to upload')}
        </div>
    </>
);

const compressImageFiles = (files) => {
    const promises = [];
    files.forEach((f) => {
        const promise = new Promise((resolve) => {
            if (isImageType(f.type)) {
                convertToBase64(f).then((img) => {
                    compressImg(img).then((compressed_img) => {
                        const file_arr = f;
                        file_arr.file = compressed_img;
                        resolve(file_arr);
                    });
                });
            } else {
                resolve(f);
            }
        });
        promises.push(promise);
    });

    return Promise.all(promises);
};

const readFiles = (files) => {
    const promises = [];
    files.forEach((f) => {
        const fr      = new FileReader();
        const promise = new Promise((resolve) => {
            fr.onload = () => {
                const file_obj    = {
                    filename      : f.file.name,
                    buffer        : fr.result,
                    documentType  : 'proofaddress',
                    documentFormat: getFormatFromMIME(f),
                    file_size     : f.file.size,
                };
                resolve(file_obj);
            };

            fr.onerror = () => {
                resolve({
                    message: localize('Unable to read file [_1]', f.file.name),
                    class  : f.class,
                });
            };
            // Reading file.
            fr.readAsArrayBuffer(f.file);
        });

        promises.push(promise);
    });

    return Promise.all(promises);
};

class UploadFile extends React.PureComponent {
    state = {
        document_file       : [],
        file_error_message  : null,
        is_any_upload_failed: false,
    };

    handleAcceptedFiles = (files) => {
        if (files.length > 0) {
            this.setState({
                document_file     : files,
                file_error_message: null,
            }, () => {
                this.props.onFileDrop(this.state);
            });
        }
    }

    handleRejectedFiles = (files) => {
        const isFileTooLarge    = files.length > 0 && files[0].size > max_document_size;
        const hasSupportedFiles = files.filter((file) => getSupportedFiles(file.name));
        const file_error_message = ((isFileTooLarge && (hasSupportedFiles.length > 0)) ?
            filesize_error_message
            :
            unsupported_file_message
        );

        this.setState({
            document_file: files,
            file_error_message,
        }, () => {
            this.props.onFileDrop(this.state);
        });
    }

    removeFile = () => {
        this.setState({
            document_file     : [],
            file_error_message: null,
        }, () => {
            this.props.onFileDrop(this.state);
        });
    }

    upload = () => {
        const {
            document_file,
            file_error_message,
        } = this.state;

        if (!!file_error_message || (document_file.length < 1)) return 0;

        // File uploader instance connected to binary_socket
        const uploader = new DocumentUploader({ connection: BinarySocket.getSocket() });

        let is_any_file_error = false;

        return new Promise((resolve, reject) => {
            compressImageFiles(this.state.document_file).then((files_to_process) => {
                readFiles(files_to_process).then((processed_files) => {
                    processed_files.forEach((file) => {
                        if (file.message) {
                            is_any_file_error = true;
                            reject(file);
                        }
                    });
                    const total_to_upload = processed_files.length;
                    if (is_any_file_error || !total_to_upload) {
                        this.props.onFileDrop(undefined);
                        return; // don't start submitting files until all front-end validation checks pass
                    }

                    // send files
                    const uploader_promise = uploader
                        .upload(processed_files[0])
                        .then((api_response) => api_response);
                    resolve(uploader_promise);
                });
            });
        });
    }

    render() {
        const {
            document_file,
            file_error_message,
        } = this.state;

        return (
            <>
                <FileDropzone
                    onDropAccepted={
                        this.onDropAccepted = (files) => this.handleAcceptedFiles(files)
                    }
                    onDropRejected={
                        this.onDropRejected = (files) => this.handleRejectedFiles(files)
                    }
                    accept={supported_filetypes}
                    max_size={max_document_size}
                    multiple={false}
                    message={UploadMessage}
                    hover_message={localize('Drop files here..')}
                    error_message={localize('Please upload supported file type.')}
                    validation_error_message={file_error_message}
                    value={document_file}
                />
                {(document_file.length > 0 || !!file_error_message) &&
                <div className='account-poa__upload-remove-btn-container'>
                    <IconRemoveFile
                        className={classNames('account-poa__upload-remove-btn', {
                            'account-poa__upload-remove-btn--error': !!file_error_message,
                        })}
                        onClick={this.removeFile}
                    />
                </div>
                }
            </>
        );
    }
}

export default UploadFile;
