import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import { Col, Row, Container, Button } from 'react-bootstrap';
import { CardImage, EmojiSmile, Paperclip, PlayBtn, XCircle, FilePdf, Trash, FileImage, FilePlay, Keyboard, ArrowUpRightSquare, Image, Dot, ArrowRight, SlashCircle, HandThumbsUp, HandThumbsDown, HandThumbsDownFill, HandThumbsUpFill, Share, CaretUp, CaretDown, CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
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
    const [flow, setFlow] = useState(Constants.FLOW_VIEW);
    const [textNew, setTextNew] = useState('');
    const [textOriginal, setTextOriginal] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [deleteTimeoutHandler, setDeleteTimeoutHandler] = useState(null);
    const [removeLikeTimeoutHandler, setRemoveLikeTimeoutHandler] = useState(null);
    const [removeDisLikeTimeoutHandler, setRemoveDisLikeTimeoutHandler] = useState(null);
    const [removeUpVoteTimeoutHandler, setRemoveUpVoteTimeoutHandler] = useState(null);
    const [removeDownVoteTimeoutHandler, setRemoveDownVoteTimeoutHandler] = useState(null);
    const [likes, setLikes] = useState(true);
    const [disLikes, setDisLikes] = useState(true);
    const [iHaveLiked, setIHaveLiked] = useState(false);
    const [iHaveDisLiked, setIHaveDisLiked] = useState(false);
    const [upVotes, setUpVotes] = useState(true);
    const [downVotes, setDownVotes] = useState(true);
    const [iHaveUpVoted, setIHaveUpVoted] = useState(false);
    const [iHaveDownVoted, setIHaveDownVoted] = useState(false);

    const refInputNew = useRef(null);
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

    function onClickAttachment() {

        let url = '';

        const strArr = uploadResult.split("/");
        if(props.cdnPrefix == null) {
            url = 'https://' + props.bucket + ".s3." + props.awsRegion + ".amazonaws.com/" + strArr[1];
        } else {
            let lastCh = props.cdnPrefix;
            lastCh = lastCh.slice(-1);
            if(lastCh == "/") {
                url = props.cdnPrefix + strArr[1];
            } else {
                url = props.cdnPrefix + "/" + strArr[1];
            }
            
         }

        window.open(url)
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
            },
            user: props.user,
            callbackInfo: props.callbackInfo == null ? null : props.callbackInfo
        });
        setFlowWrap(Constants.FLOW_VIEW);
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

    function onEditClicked() {
        if(uploadResult != null && uploadResult.length > 0) {
            setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE);
        } else {
            setFlowWrap(Constants.FLOW_INIT);
        }

    }

    function onCancelClicked() {
        setTextNew(textOriginal);
        setFlowWrap(Constants.FLOW_VIEW);
    }

    function onDeleteClicked() {

        if(flow === Constants.FLOW_VIEW) {
            setFlowWrap(Constants.FLOW_CONFIRM_DELETE)
        } else {
            if(props.onDelete != null) {
                props.onDelete(props.callbackInfo);
            }
            setFlowWrap(Constants.FLOW_DELETED)
        }

    }

    function onReplyClicked() {
        if(props.onReplied != null) {
            props.onReplied(props.callbackInfo);
        }
    }

    function onShareClicked() {
        if(props.onShared != null) {
            props.onShared(props.callbackInfo);
        }
    }
    
    function onLiked() {
        if(!iHaveDisLiked) {
            if(props.onLiked != null) {
                props.onLiked(props.callbackInfo);
            }
            setLikes(likes + 1);
            setIHaveLiked(true);
        }
    }

    function onDisLiked() {
        if(!iHaveLiked) {
            if(props.onDisLiked != null) {
                props.onDisLiked(props.callbackInfo);
            }
            setDisLikes(disLikes + 1);
            setIHaveDisLiked(true);
        }
    }

    function onLikeRemoved() {
        if(flow === Constants.FLOW_VIEW) {
            setFlowWrap(Constants.FLOW_CONFIRM_REMOVE_LIKE)
        } else {
            if(props.onLikeRemoved != null) {
                props.onLikeRemoved(props.callbackInfo);
            }
            setLikes(likes - 1);
            setIHaveLiked(false);
            setFlowWrap(Constants.FLOW_VIEW);
        }
        
    }

    function onDisLikeRemoved() {
        if(flow === Constants.FLOW_VIEW) {
            setFlowWrap(Constants.FLOW_CONFIRM_REMOVE_DISLIKE)
        } else {
            if(props.onDisLikeRemoved != null) {
                props.onDisLikeRemoved(props.callbackInfo);
            }
            setDisLikes(disLikes - 1);
            setIHaveDisLiked(false);
            setFlowWrap(Constants.FLOW_VIEW);
        }
    }

    function onUpVoted() {
        if(!iHaveDownVoted) {
            if(props.onUpVoted != null) {
                props.onUpVoted(props.callbackInfo);
            }
            setUpVotes(upVotes + 1);
            setIHaveUpVoted(true);
        }
    }

    function onDownVoted() {
        if(!iHaveUpVoted) {
            if(props.onDownVoted != null) {
                props.onDownVoted(props.callbackInfo);
            }
            setDownVotes(downVotes + 1);
            setIHaveDownVoted(true);
        }
    }

    function onUpVoteRemoved() {
        if(flow === Constants.FLOW_VIEW) {
            setFlowWrap(Constants.FLOW_CONFIRM_REMOVE_UPVOTE)
        } else {
            if(props.onUpVoteRemoved != null) {
                props.onUpVoteRemoved(props.callbackInfo);
            }
            setUpVotes(upVotes - 1);
            setIHaveUpVoted(false);
            setFlowWrap(Constants.FLOW_VIEW);
        }
        
    }

    function onDownVoteRemoved() {
        if(flow === Constants.FLOW_VIEW) {
            setFlowWrap(Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE)
        } else {
            if(props.onDownVoteRemoved != null) {
                props.onDownVoteRemoved(props.callbackInfo);
            }
            setDownVotes(downVotes - 1);
            setIHaveDownVoted(false);
            setFlowWrap(Constants.FLOW_VIEW);
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

        if(flow === Constants.FLOW_CONFIRM_DELETE) {

            setDeleteTimeoutHandler(setTimeout(() => {
                if(flow === Constants.FLOW_CONFIRM_DELETE) {
                    setFlowWrap(Constants.FLOW_VIEW)
                }
            }, 5000));

        }

        if(flow === Constants.FLOW_DELETED) {
            clearTimeout(deleteTimeoutHandler);
        }

        if(flow === Constants.FLOW_CONFIRM_REMOVE_LIKE) {

            setRemoveLikeTimeoutHandler(setTimeout(() => {
                if(flow === Constants.FLOW_CONFIRM_REMOVE_LIKE) {
                    setFlowWrap(Constants.FLOW_VIEW)
                }
            }, 5000));

        }

        if(flow === Constants.FLOW_VIEW) {
            clearTimeout(removeLikeTimeoutHandler);
        }

        if(flow === Constants.FLOW_CONFIRM_REMOVE_DISLIKE) {

            setRemoveDisLikeTimeoutHandler(setTimeout(() => {
                if(flow === Constants.FLOW_CONFIRM_REMOVE_DISLIKE) {
                    setFlowWrap(Constants.FLOW_VIEW)
                }
            }, 5000));

        }

        if(flow === Constants.FLOW_VIEW) {
            clearTimeout(removeDisLikeTimeoutHandler);
        }

        if(flow === Constants.FLOW_CONFIRM_REMOVE_UPVOTE) {

            setRemoveUpVoteTimeoutHandler(setTimeout(() => {
                if(flow === Constants.FLOW_CONFIRM_REMOVE_UPVOTE) {
                    setFlowWrap(Constants.FLOW_VIEW)
                }
            }, 5000));

        }

        if(flow === Constants.FLOW_VIEW) {
            clearTimeout(removeUpVoteTimeoutHandler);
        }

        if(flow === Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) {

            setRemoveDownVoteTimeoutHandler(setTimeout(() => {
                if(flow === Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) {
                    setFlowWrap(Constants.FLOW_VIEW)
                }
            }, 5000));

        }

        if(flow === Constants.FLOW_VIEW) {
            clearTimeout(removeDownVoteTimeoutHandler);
        }

    }, [flow])

    useEffect(() => {

        if(props.mode === Constants.MODE_EDIT) {
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
        } else if(props.mode === Constants.MODE_VIEW){

            if(props.preFill != null) {
                setTextNew(props.preFill.text);
            }
            if(props.preFill != null && props.preFill.attachment != null) {
                setUploadResult(props.preFill.attachment.object);
                setUploadType(props.preFill.attachment.type);
            }
            setFlowWrap(Constants.FLOW_VIEW);

        } else {
            setFlowWrap(Constants.FLOW_DELETED);
        }

        

    }, [props.mode])

    useEffect(() => {

        if(props.preFill != null) {
            setTextOriginal(props.preFill.text);
        }

    }, [props.preFill?.text])

    useEffect(() => {
        setLikes(props.likes)
    }, [props.likes])

    useEffect(() => {
        setDisLikes(props.disLikes)
    }, [props.disLikes])

    useEffect(() => {
        setIHaveLiked(props.iHaveLiked)
    }, [props.iHaveLiked])

    useEffect(() => {
        setIHaveDisLiked(props.iHaveDisLiked)
    }, [props.iHaveDisLiked])

    useEffect(() => {
        setUpVotes(props.upVotes)
    }, [props.upVotes])

    useEffect(() => {
        setDownVotes(props.downVotes)
    }, [props.downVotes])

    useEffect(() => {
        setIHaveUpVoted(props.iHaveUpVoted)
    }, [props.iHaveUpVoted])

    useEffect(() => {
        setIHaveDownVoted(props.iHaveDownVoted)
    }, [props.iHaveDownVoted])

    return (

        <div style={{position: 'relative'}}>
            <Container className="w-100 rounded-3 d-flex flex-column px-3 pb-2"
            style={{
                border: 'solid 1px',
                borderColor: props.theme != null ? props.theme.commentViewBorderColor : theme.commentViewBorderColor,
                backgroundColor: props.theme != null ? props.theme.commentViewBackgroundColor : theme.commentViewBackgroundColor,
            }}
            >

                <div className="d-flex align-items-center mt-3 mb-0 p-0" role="alert">

                    <div className='me-2' style={{width: '40px', height: '40px', backgroundImage: `url(${props.user.picture})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: '40px'}} ></div>
                    <div><b>{props.user.name}</b></div>
                    {(flow == Constants.FLOW_VIEW || flow == Constants.FLOW_CONFIRM_DELETE || flow == Constants.FLOW_CONFIRM_REMOVE_LIKE || flow == Constants.FLOW_CONFIRM_REMOVE_DISLIKE || flow == Constants.FLOW_CONFIRM_REMOVE_UPVOTE || flow == Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) && <Dot />}
                    {(flow == Constants.FLOW_VIEW || flow == Constants.FLOW_CONFIRM_DELETE || flow == Constants.FLOW_CONFIRM_REMOVE_LIKE || flow == Constants.FLOW_CONFIRM_REMOVE_DISLIKE || flow == Constants.FLOW_CONFIRM_REMOVE_UPVOTE || flow == Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) && <div className='ms-1' style={{color: 'gray'}}><small>{Util.timeDifference(new Date().getTime(), parseInt(props.user.timestamp)*1000)}</small></div>}
                    {((flow == Constants.FLOW_INIT || flow == Constants.FLOW_UPLOAD_COMPLETE) && props.showCancel != null && props.showCancel) && <Dot />}
                    {((flow == Constants.FLOW_INIT || flow == Constants.FLOW_UPLOAD_COMPLETE) && props.showCancel != null && props.showCancel) && <Button className="button_cancel" onClick={() => {onCancelClicked()}} variant="btn btn-outline"><small>Cancel</small></Button>}

                </div>

                {flow == Constants.FLOW_DELETED && <Container className='d-flex flex-column flex-grow-1 p-0'>

                    <div className='py-2' style={{color: '#777777'}}>
                        <SlashCircle className='me-2' />
                        {
                            Constants.CONTENT_DELETED
                        }
                    </div>

                </Container>}
                
                {(flow == Constants.FLOW_VIEW || flow == Constants.FLOW_CONFIRM_DELETE || flow == Constants.FLOW_CONFIRM_REMOVE_LIKE || flow == Constants.FLOW_CONFIRM_REMOVE_DISLIKE || flow == Constants.FLOW_CONFIRM_REMOVE_UPVOTE || flow == Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) && <Container className='d-flex p-0'>

                    {props.showVotes && <div className='d-flex flex-column justify-content-start align-items-center py-2' style={{width: '45px',marginRight: '7px'}}>
                        <small>
                            {iHaveUpVoted && <CaretUpFill className="button_upvoted" onClick={()=>{onUpVoteRemoved()}} style={{cursor: 'pointer'}}/>}
                            {!iHaveUpVoted && <CaretUp className="button_upvote text-muted" onClick={()=>{onUpVoted()}} style={{cursor: 'pointer'}}/>}
                        </small>
                        <small>
                            {(iHaveUpVoted || iHaveDownVoted) && <span style={{color: "black"}}>{props.upVotes - props.downVotes}</span>}
                            {(!iHaveUpVoted && !iHaveDownVoted) && <span className='text-muted'>{props.upVotes - props.downVotes}</span>}
                        </small> 
                        <small>
                            {iHaveDownVoted && <CaretDownFill className="button_downvoted" onClick={() => {onDownVoteRemoved()}} style={{cursor: 'pointer'}}/>}
                            {!iHaveDownVoted && <CaretDown className="button_downvote text-muted" onClick={() => {onDownVoted()}} style={{cursor: 'pointer'}}/>}
                        </small>
                    </div>}

                    <Container className='d-flex flex-column flex-grow-1 p-0'>
                        <div className='py-3' style={{color: '#444444'}}>
                            {
                                textNew
                            }
                        </div>
                        {(uploadResult.length > 0) && <div className='d-flex justify-content-between'>
                            <div className="d-flex align-items-center mb-0 px-0 pt-0 pb-2" role="alert" style={{cursor: 'pointer'}} onClick={() => {onClickAttachment()}}>
                                {uploadType == Constants.UPLOAD_TYPE_PDF && <FilePdf className='me-2'/>}
                                {uploadType == Constants.UPLOAD_TYPE_IMAGE && <Image className='me-2'/>}
                                {uploadType == Constants.UPLOAD_TYPE_VIDEO && <FilePlay className='me-2'/>}
                                <div>
                                    <small>
                                    {
                                        Util.ellipsizeStart(uploadResult, 15)
                                    }
                                    </small>
                                </div>
                                <div className='ms-2' style={{color: 'gray'}}><small><small><ArrowRight /> </small></small></div>
                            </div>
                        </div>}
                        {(props.showLikes || props.showDisLikes) && <div className='d-flex justify-content-between align-items-center text-muted'>
                            <Button className="button_reply text-muted ps-0 pe-0 py-0 me-4" onClick={() => {onReplyClicked()}} variant="btn btn-outline"><small>Reply</small></Button>
                            
                            <div className='d-flex'>
                                {props.showShare && <div className='d-flex justify-content-start align-items-center me-5'>
                                    <small>
                                        <span style={{color: '#444', cursor: 'pointer'}}><Share style={{marginBottom: '2px'}} onClick={() => {onShareClicked()}}/></span>
                                    </small>
                                </div>}
                                {props.showLikes && <div className='d-flex justify-content-start align-items-center me-4'>
                                    <small>
                                        {(iHaveLiked) && <span style={{color: '#444'}}><HandThumbsUpFill className='button_liked me-2' style={{marginBottom: '2px', color: '#444', cursor: 'pointer'}} onClick={() => {onLikeRemoved()}}/>{likes}</span>}
                                        {(!iHaveLiked) && <span className='text-muted'><HandThumbsUp className='button_like me-2 text-muted' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {onLiked()}}/>{likes}</span>}
                                    </small>
                                </div>}
                                {props.showDisLikes && <div className='d-flex justify-content-start align-items-center me-2'>
                                    <small>
                                        {(iHaveDisLiked) && <span style={{color: '#444'}}><HandThumbsDownFill className='button_disliked me-2' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {onDisLikeRemoved()}}/>{disLikes}</span>}
                                        {(!iHaveDisLiked) && <span className='text-muted'><HandThumbsDown className='button_dislike me-2 text-muted' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {onDisLiked()}}/>{disLikes}</span>}
                                    </small>
                                </div>}
                            </div>
                        </div>}
                        {(!props.showLikes && !props.showDisLikes) && <div className='d-flex justify-content-between align-items-center text-muted'>
                            <Button className="button_reply text-muted ps-0 pe-0 py-0 me-4" onClick={() => {onReplyClicked()}} variant="btn btn-outline"><small>Reply</small></Button>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_LIKE) && <div className='d-flex justify-content-end text-muted'>
                            <div>
                                <small><small><small>Press again to remove like</small></small></small>
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_DISLIKE) && <div className='d-flex justify-content-end text-muted'>
                            <div>
                                <small><small><small>Press again to remove dislike</small></small></small>
                            </div>
                        </div>}
                        <div className='d-flex justify-content-between'>
                            <div></div>
                            <div>
                                {(props.showEdit != null && props.showEdit) && <Button className="button_edit  text-muted " onClick={() => {onEditClicked()}} variant="btn btn-outline"><small><small>Edit</small></small></Button>}
                                {(props.showDelete != null && props.showDelete) && <Button className="button_delete  text-muted" onClick={() => {onDeleteClicked()}} variant="btn btn-outline ms-2"><small><small>Delete</small></small></Button>}
                            </div>
                        </div>
                        {(flow === Constants.FLOW_CONFIRM_DELETE) && <div className='d-flex justify-content-end text-muted'>
                            <div>
                                <small><small><small>Press again to delete</small></small></small>
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_UPVOTE) && <div className='d-flex justify-content-start text-muted'>
                            <div>
                                <small><small><small>Press again to remove upvote</small></small></small>
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) && <div className='d-flex justify-content-start text-muted'>
                            <div>
                                <small><small><small>Press again to remove downvote</small></small></small>
                            </div>
                        </div>}
                    </Container>

                </Container>}

                {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE || flow === Constants.FLOW_EMOJI_PICKER) && <Container className='d-flex flex-column flex-grow-1 p-0 my-1'>
                    <textarea ref={refInputNew} className='rounded-3 flex-grow-1 border-0 mt-2 py-1 px-2'  style={{
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
                    {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE) && <Button className="btn-emoji" variant='btn-outline-secondary me-2' onClick={() => {openEmojiPicker(true)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
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
                    {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE) && <ButtonNeutral caption="Submit"  custom={{backgroundColor: props.theme != null ? props.theme.commentViewSubmitButtonBackgroundColor : theme.commentViewSubmitButtonBackgroundColor, color: props.theme != null ? props.theme.commentViewSubmitButtonColor : theme.commentViewSubmitButtonColor}} onClick={() => {submitResult()}} disabled={disableSubmit} icon="ArrowRight"/>}
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