import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import { Col, Row, Container, Button } from 'react-bootstrap';
import { CardImage, EmojiSmile, Paperclip, PlayBtn, XCircle, FilePdf, Trash, FileImage, FilePlay, Keyboard } from 'react-bootstrap-icons';
import { ButtonNeutral, ButtonNext } from 'react-ui-components-superflows';
import { UploadToS3 } from 'react-upload-to-s3';
import { Constants } from './Constants';
import { Util } from './Util';
import Themes from 'react-ui-themes-superflows'
import Picker from 'emoji-picker-react';

export const CommentView = (props) => {

    const [windowDimensions, setWindowDimensions] = useState(Util.getWindowDimensions());
    const [uploadType, setUploadType] = useState(Constants.UPLOAD_TYPE_IMAGE);
    const [uploadResult, setUploadResult] = useState('');
    const [flow, setFlow] = useState(Constants.FLOW_INIT);
    const [textNew, setTextNew] = useState('');
    const refInputNew = useRef(null);
    const [disableSubmit, setDisableSubmit] = useState(true);

    const theme = Themes.getTheme("Default");

    function setFlowWrap(flow, timeout = 500) {
        setTimeout(() => {setFlow(flow)}, timeout);
    }

    function prepareUpload(type) {
        setFlowWrap(Constants.FLOW_UPLOAD);
        setUploadType(type);
    }

    function cancelUpload() {
        setFlowWrap(Constants.FLOW_INIT);
    }

    function onUploadComplete(result) {
        setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE, 1500);
        if(uploadType == Constants.UPLOAD_TYPE_PDF || uploadType == Constants.UPLOAD_TYPE_IMAGE || uploadType == Constants.UPLOAD_TYPE_VIDEO) {
            setUploadResult(result.url)
        }
    }

    function onRemoveUpload() {
        setUploadResult('');
        setFlowWrap(Constants.FLOW_INIT);
    }

    function validateSubmit() {

        if(refInputNew.current != null) {
            if(refInputNew.current.value.length > 0) {
                setDisableSubmit(false);
                return;
            }
        }

        if(uploadResult.length > 0) {
            setDisableSubmit(false);
            return;
        } 
        
        setDisableSubmit(true);

    }

    function submitResult() {
        setTextNew(refInputNew.current.value);
        if(props.onSubmit != null) props.onSubmit({
            text: refInputNew.current.value,
            attachment: uploadResult == '' ? null : {
                object: uploadResult,
                type: uploadType
            }
        });
    }

    function onTextAreaKeyUp(event) {

        if(event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitResult();
        } else {
            setTextNew(refInputNew.current.value);
            validateSubmit();
        }
    }

    function onEmojiChosen(event, obj) {
        refInputNew.current.value = refInputNew.current.value + obj.emoji;
        setTextNew(refInputNew.current.value)
    }

    function openEmojiPicker(value) {
        if(value) {
            setFlowWrap(Constants.FLOW_EMOJI_PICKER);
        } else {
            if(uploadResult != '') {
                setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE)
            } else {
                setFlowWrap(Constants.FLOW_INIT)
            }
            refInputNew.current.focus();
        }

    }

    useEffect(() => {

        validateSubmit();

    }, [uploadResult])
    
    useEffect(() => {

        if(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE) {
            refInputNew.current.focus();
            refInputNew.current.value = textNew;
        }

    }, [flow])

    useEffect(() => {

        console.log('prefille', props.preFill);
        if(props.preFill != null) {
            setTextNew(props.preFill.text);
            if(refInputNew.current != null) {
                refInputNew.current.value = props.preFill.text;
            }

            if(props.preFill.attachment != null) {
                setUploadResult(props.preFill.attachment.object);
                setUploadType(props.preFill.attachment.type);
                setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE);
            }
        }

    }, [])

    return (

        <div style={{position: 'relative'}}>
            <Container className="w-100 rounded-3 d-flex flex-column px-2"
            style={{
                border: 'solid 1px',
                borderColor: props.theme != null ? props.theme.commentViewBorderColor : theme.commentViewBorderColor,
                backgroundColor: props.theme != null ? props.theme.commentViewBackgroundColor : theme.commentViewBackgroundColor,
            }}
            >

                {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE || flow === Constants.FLOW_EMOJI_PICKER) && <Container className='d-flex flex-column flex-grow-1 p-0'>
                    <textarea ref={refInputNew} className='rounded-3 flex-grow-1 border-0 mt-2'  style={{
                height: windowDimensions.height > windowDimensions.width ? '150px' : '150px'
            }} onChange={()=>{}} onKeyUp={(event) => {onTextAreaKeyUp(event)}}></textarea>
                </Container>}

                {flow === Constants.FLOW_UPLOAD_COMPLETE && <Container className='d-flex flex-row justify-content-start align-items-center ps-0 pe-0 pt-2'>
                    <div className="d-flex alert alert-secondary align-items-center mb-0 p-0 px-2" role="alert">
                        {uploadType == Constants.UPLOAD_TYPE_PDF && <FilePdf className='me-2' style={{marginBottom: '2px'}}/>}
                        {uploadType == Constants.UPLOAD_TYPE_IMAGE && <FileImage className='me-2' style={{marginBottom: '2px'}}/>}
                        {uploadType == Constants.UPLOAD_TYPE_VIDEO && <FilePlay className='me-2' style={{marginBottom: '2px'}}/>}
                        <div>
                            {
                                Util.ellipsizeStart(uploadResult, 15)
                            }
                        </div>
                        <Button variant="btn btn-sm btn-secondary pt-0 pb-0 ms-2 mt-1 mb-1"><Trash style={{marginBottom: '2px'}} onClick={() => {onRemoveUpload()}}/></Button>
                        
                    </div>
                </Container>}

                {flow === Constants.FLOW_EMOJI_PICKER && <Container className='d-flex flex-row justify-content-start align-items-start ps-0 pe-0 pt-2'>
                    <Button className='cancel-emoji' variant='btn-outline-secondary me-2' onClick={() => {openEmojiPicker(false)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}><Keyboard/></Button>
                    <Picker onEmojiClick={(event, obj) => {onEmojiChosen(event, obj)}}  pickerStyle={{ width: '100%' }}/>
                </Container>}

                {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE || flow === Constants.FLOW_EMOJI_PICKER) && <Container className='d-flex flex-row justify-content-end align-items-center ps-0 pe-0 pt-2 pb-2'>
                    {(flow === Constants.FLOW_INIT) && <Button className="btn-emoji" variant='btn-outline-secondary me-2' onClick={() => {openEmojiPicker(true)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <EmojiSmile/>
                    </Button>}
                    <div className='flex-grow-1'  style={{visibility: 'hidden'}}/>
                    {(flow === Constants.FLOW_INIT) && <Button className="btn-video" variant='btn-outline-secondary me-2' onClick={() => {prepareUpload(Constants.UPLOAD_TYPE_VIDEO)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <PlayBtn/>
                    </Button>}
                    {(flow === Constants.FLOW_INIT) && <Button className="btn-pdf" variant='btn-outline-secondary me-2' onClick={() => {prepareUpload(Constants.UPLOAD_TYPE_PDF)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <Paperclip/>
                    </Button>}
                    {(flow === Constants.FLOW_INIT) && <Button className="btn-image" variant='btn-outline-secondary me-4' onClick={() => {prepareUpload(Constants.UPLOAD_TYPE_IMAGE)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <CardImage />
                    </Button>}
                    {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE) && <ButtonNeutral caption="Submit"  custom={{backgroundColor: props.theme != null ? props.theme.commentViewSubmitButtonBackgroundColor : theme.commentViewSubmitButtonBackgroundColor, color: props.theme != null ? props.theme.commentViewSubmitButtonColor : theme.commentViewSubmitButtonColor}} onClick={() => {submitResult()}} disabled={disableSubmit}/>}
                </Container>}

                {flow === Constants.FLOW_UPLOAD && <Container className='d-flex flex-row justify-content-end align-items-center ps-0 pe-0 pt-2 pb-2'>
                <UploadToS3 
                    bucket={props.bucket}
                    awsRegion={props.awsRegion}
                    awsKey={props.awsKey}
                    awsSecret={props.awsSecret}
                    awsMediaConvertEndPoint={props.awsMediaConvertEndPoint}
                    type={uploadType}
                    mediaConvertRole={props.mediaConvertRole}
                    onResult={(result) => {onUploadComplete(result)}}
                    showNewUpload={false}
                    theme={props.theme != null ? props.theme : theme} />
                </Container>}

                {(flow === Constants.FLOW_UPLOAD) && <Container className='d-flex flex-row justify-content-end align-items-center ps-0 pe-0 pb-2'>
                    <Button className="cancel-uploader" variant="btn btn-sm btn-outline-secondary" onClick={cancelUpload}  style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>✖</Button>
                </Container>}

            </Container>
            
        </div>
        
        

    )
}


export default CommentView;