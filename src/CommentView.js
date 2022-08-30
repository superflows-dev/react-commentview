import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import { Col, Row, Container, Button, Overlay } from 'react-bootstrap';
import { CardImage, EmojiSmile, Paperclip, PlayBtn, XCircle, FilePdf, Trash, FileImage, FilePlay, Keyboard, ArrowUpRightSquare, Image, Dot, ArrowRight, SlashCircle, HandThumbsUp, HandThumbsDown, HandThumbsDownFill, HandThumbsUpFill, Share, CaretUp, CaretDown, CaretUpFill, CaretDownFill, ThreeDotsVertical, X, ArrowRightShort, Plus, Dash, ChevronExpand, ChevronContract, ChevronDown, ChevronUp, Send } from 'react-bootstrap-icons';
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
    const [dirty, setDirty] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [mode, setMode] = useState(Constants.MODE_VIEW);
    const [flow, setFlow] = useState(Constants.FLOW_VIEW);
    const [replyTo, setReplyTo] = useState('{}')
    const [edited, setEdited] = useState(false);
    const [preFill, setPreFill] = useState('{}');
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
    const [callbackInfo, setCallbackInfo] = useState(false);
    const refInputNew = useRef(null);
    const refPopup = useRef(null);
    const theme = Themes.getTheme("Default");

    function setReplyToWrap(value) {
        setReplyTo(JSON.stringify(value));
    }

    function getReplyToWrap() {
        return JSON.parse(replyTo);
    }

    function setPreFillWrap(value) {
        setPreFill(JSON.stringify(value))
    }

    function getPreFillWrap() {
        return JSON.parse(preFill);
    }

    function setCallbackInfoWrap(value) {
        setCallbackInfo(JSON.stringify(value));
    }

    function getCallbackInfoWrap() {
        return JSON.parse(callbackInfo);
    }

    function showAttachment(value) {

        setShowAttachments(value)

    }
    
    function showEdit(value) {
        if(value) {
            setFlowWrap(Constants.FLOW_SHOW_EDIT)
        } else {
            setFlowWrap(Constants.FLOW_VIEW)
        }

    }

    function setFlowWrap(flow, timeout = 500) {
        setTimeout(() => {setFlow(flow)}, timeout);
    }

    function prepareUpload(type) {

        setUploadType(type);
        setTimeout(() => {setShowUpload(true)}, 500);
    }

    function cancelUpload() {

        setShowUpload(false);
        
    }

    function onUploadComplete(result) {
        setDirty(true);
        setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE, 1500);
        if(uploadType == Constants.UPLOAD_TYPE_PDF || uploadType == Constants.UPLOAD_TYPE_IMAGE || uploadType == Constants.UPLOAD_TYPE_VIDEO) {
            setUploadResult(result.url)
        }
    }

    function onRemoveUpload() {
        setUploadResult('');
        setDirty(true)
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
        setTextNew(refInputNew.current.value.replace(/\n$/, ""));
        if(props.onSubmit != null) props.onSubmit({
            text: refInputNew.current.value.replace(/\n$/, ""),
            attachment: uploadResult == '' ? null : {
                object: uploadResult,
                type: uploadType
            },
            user: props.user,
            callbackInfo: props.callbackInfo == null ? null : props.callbackInfo
        });
        if(props.preventEditToView != null) {
            if(props.preventEditToView) {

            } else {
                //setFlowWrap(Constants.FLOW_VIEW);
                setMode(Constants.MODE_VIEW)
            }
        } else {
            // setFlowWrap(Constants.FLOW_VIEW);
            setMode(Constants.MODE_VIEW)
        }
        if(props.clearOnSubmit) {
            setTextNew('');
            setTextOriginal('');
            setUploadResult('');
            refInputNew.current.value = '';
            setFlowWrap(Constants.FLOW_INIT)
        }
        
    }

    function onTextAreaKeyUp(event) {

        if(event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitResult();
        } else {
            setTextNew(refInputNew.current.value);
            setDirty(true);
            validateSubmit();
        }
    }

    function onEmojiChosen(event, obj) {
        refInputNew.current.value = refInputNew.current.value + obj.emoji;
        setTextNew(refInputNew.current.value)
    }

    function openEmojiPicker(value) {

        setShowEmoji(value)

    }

    function onEditClicked() {
        // if(uploadResult != null && uploadResult.length > 0) {
        //     setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE);
        // } else {
        //     setFlowWrap(Constants.FLOW_INIT);
        // }
        setMode(Constants.MODE_EDIT);

    }

    function onCancelClicked() {
        setTextNew(textOriginal);
        //setFlowWrap(Constants.FLOW_VIEW);
        setMode(Constants.MODE_VIEW)
    }

    function onDeleteClicked() {

        if(flow === Constants.FLOW_SHOW_EDIT) {
            setFlowWrap(Constants.FLOW_CONFIRM_DELETE)
        } else {
            if(props.onDelete != null) {
                props.onDelete(getCallbackInfoWrap());
            }
            setFlowWrap(Constants.FLOW_DELETED)
        }

    }

    function onReplyClicked() {
        if(props.onReplied != null) {
            props.onReplied(getCallbackInfoWrap());
        }
    }

    function onShareClicked() {
        if(props.onShared != null) {
            props.onShared(getCallbackInfoWrap());
        }
    }
    
    function onReplyToClosed() {
        if(props.onReplyToClosed != null) {
            props.onReplyToClosed(getCallbackInfoWrap());
        }
    }

    function onLiked() {
        if(!iHaveDisLiked) {
            if(props.onLiked != null) {
                props.onLiked(getCallbackInfoWrap());
            }
            setLikes(likes + 1);
            setIHaveLiked(true);
        }
    }

    function onDisLiked() {
        if(!iHaveLiked) {
            if(props.onDisLiked != null) {
                props.onDisLiked(getCallbackInfoWrap());
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
                props.onLikeRemoved(getCallbackInfoWrap());
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
                props.onDisLikeRemoved(getCallbackInfoWrap());
            }
            setDisLikes(disLikes - 1);
            setIHaveDisLiked(false);
            setFlowWrap(Constants.FLOW_VIEW);
        }
    }

    function onUpVoted() {
        if(!iHaveDownVoted) {
            if(props.onUpVoted != null) {
                props.onUpVoted(getCallbackInfoWrap());
            }
            setUpVotes(upVotes + 1);
            setIHaveUpVoted(true);
        }
    }

    function onDownVoted() {
        if(!iHaveUpVoted) {
            if(props.onDownVoted != null) {
                props.onDownVoted(getCallbackInfoWrap());
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
                props.onUpVoteRemoved(getCallbackInfoWrap());
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
                props.onDownVoteRemoved(getCallbackInfoWrap());
            }
            setDownVotes(downVotes - 1);
            setIHaveDownVoted(false);
            setFlowWrap(Constants.FLOW_VIEW);
        }
    }

    function onReplyToClicked() {
        if(getReplyToWrap().userName != null) {
            props.onReplyTo({callbackInfo: getCallbackInfoWrap(), replyTo: getReplyToWrap()});
        }
    }

    function auto_grow(event) {
        event.target.style.height = "5px";
        event.target.style.height = (event.target.scrollHeight)+"px";
    }

    useEffect(() => {

        validateSubmit();

    }, [uploadResult])

    useEffect(() => {

        if(!dirty) {
            if(getPreFillWrap() != null) {

                if(getPreFillWrap().text != null) {
                    setTextNew(getPreFillWrap().text);
                    setTextOriginal(getPreFillWrap().text);
                }
                if(refInputNew.current != null) {
                    if(getPreFillWrap().text != null && refInputNew.current != null) {
                        refInputNew.current.value = getPreFillWrap().text;
                    }
                }
                if(getPreFillWrap().attachment != null) {
                    setUploadResult(getPreFillWrap().attachment.object);
                    setUploadType(getPreFillWrap().attachment.type);
                } else {
                    setUploadResult('');
                }
            }
        }

        if(mode === Constants.MODE_VIEW) {

            if(flow === Constants.FLOW_SHOW_EDIT) {

                setFlowWrap(Constants.FLOW_SHOW_EDIT);

            } else if(flow === Constants.FLOW_CONFIRM_DELETE) {
                
                setDeleteTimeoutHandler(setTimeout(() => {
                    if(flow === Constants.FLOW_CONFIRM_DELETE) {
                        setFlowWrap(Constants.FLOW_VIEW)
                    }
                }, 5000));
    
            } else if(flow === Constants.FLOW_CONFIRM_REMOVE_LIKE) {
                
                setRemoveLikeTimeoutHandler(setTimeout(() => {
                    if(flow === Constants.FLOW_CONFIRM_REMOVE_LIKE) {
                        setFlowWrap(Constants.FLOW_VIEW)
                    }
                }, 5000));
    
            } else if(flow === Constants.FLOW_CONFIRM_REMOVE_DISLIKE) {
                
                setRemoveDisLikeTimeoutHandler(setTimeout(() => {
                    if(flow === Constants.FLOW_CONFIRM_REMOVE_DISLIKE) {
                        setFlowWrap(Constants.FLOW_VIEW)
                    }
                }, 5000));
    
            } else if(flow === Constants.FLOW_CONFIRM_REMOVE_UPVOTE) {
                
                setRemoveUpVoteTimeoutHandler(setTimeout(() => {
                    if(flow === Constants.FLOW_CONFIRM_REMOVE_UPVOTE) {
                        setFlowWrap(Constants.FLOW_VIEW)
                    }
                }, 5000));
    
            } else if(flow === Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) {
                
                setRemoveDownVoteTimeoutHandler(setTimeout(() => {
                    if(flow === Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) {
                        setFlowWrap(Constants.FLOW_VIEW)
                    }
                }, 5000));
    
            } else if(flow === Constants.FLOW_VIEW) {

                clearTimeout(deleteTimeoutHandler);
                clearTimeout(removeLikeTimeoutHandler);
                clearTimeout(removeDisLikeTimeoutHandler);
                clearTimeout(removeUpVoteTimeoutHandler);
                clearTimeout(removeDownVoteTimeoutHandler);

            } else if(flow === Constants.FLOW_INIT) {
                
                if(refInputNew.current != null) {
                    refInputNew.current.focus();
                    refInputNew.current.value = textNew;
                }

            } else if(flow === Constants.FLOW_UPLOAD_COMPLETE) {
                
                if(refInputNew.current != null) {
                    refInputNew.current.focus();
                    refInputNew.current.value = textNew;
                }
                
            }
    

        }

        if(mode === Constants.MODE_EDIT) {
            if(refInputNew.current != null) {
                refInputNew.current.focus();
                refInputNew.current.value = textNew;
            }

            if(showUpload) {
                setFlowWrap(Constants.FLOW_UPLOAD)
            } else if(showEmoji) {
                setFlowWrap(Constants.FLOW_EMOJI_PICKER);
            } else if(showAttachments) {
                setFlowWrap(Constants.FLOW_SHOW_ATTACHMENT)
            } else {
                if(uploadResult != '') {
                    setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE)
                } else {
                    setFlowWrap(Constants.FLOW_INIT)
                }
            }
        
            // if(uploadResult != '') {
            //     setFlowWrap(Constants.FLOW_UPLOAD_COMPLETE);
            // }
        }

        if(mode === Constants.MODE_DELETED) {
            
            
            if(flow === Constants.FLOW_DELETED) {
                clearTimeout(deleteTimeoutHandler);
            }
        }

    }, [preFill, flow, refInputNew.current, showEmoji, showAttachments, showUpload, replyTo])

    useEffect(() => {
      
        if(mode == Constants.MODE_EDIT) {
            setFlowWrap(Constants.FLOW_INIT);
        }

        if(mode == Constants.MODE_VIEW) {
            setFlowWrap(Constants.FLOW_VIEW);
        }

        if(mode == Constants.MODE_DELETED) {
            setFlowWrap(Constants.FLOW_DELETED);
        }

    }, [mode])
    
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

    useEffect(() => {
        setCallbackInfoWrap(props.callbackInfo)
    }, [props.callbackInfo])

    useEffect(() => {
        setEdited(props.edited);
    }, [props.edited])

    useEffect(() => {
        setMode(props.mode);
    }, [props.mode])

    useEffect(() => {
        setReplyToWrap(props.replyTo != null ? props.replyTo : {})
    }, [props.replyTo])

    useEffect(() => {
        if(props.preFill != null) {
            setPreFillWrap(props.preFill);
        }

    }, [props.preFill?.text])

    return (

        <div style={{position: 'relative'}}>
            <Container className="w-100 rounded-3 d-flex flex-column px-3 pb-3"
            style={{
                border: 'solid 1px',
                borderColor: props.theme != null ? props.theme.commentViewBorderColor : theme.commentViewBorderColor,
                backgroundColor: ((props.showEdit != null && props.showEdit) || (props.showDelete != null && props.showDelete)) ? (props.theme != null ? props.theme.commentViewMyBackgroundColor : theme.commentViewMyBackgroundColor) : (props.theme != null ? props.theme.commentViewBackgroundColor : theme.commentViewBackgroundColor),
            }}
            >

                <div className="d-flex align-items-center justify-content-between mt-3 mb-0 p-0" role="alert">

                    <div className='d-flex align-items-center'>
                        <div className='me-2' style={{width: '40px', height: '40px', backgroundImage: `url(${props.user.picture})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: '40px'}} ></div>
                        <div style={{
                            color: props.theme != null ? props.theme.commentViewUserColor : theme.commentViewUserColor,
                        }}><b>{props.user.name}</b></div>
                        {(flow == Constants.FLOW_VIEW || flow == Constants.FLOW_CONFIRM_DELETE || flow == Constants.FLOW_CONFIRM_REMOVE_LIKE || flow == Constants.FLOW_CONFIRM_REMOVE_DISLIKE || flow == Constants.FLOW_CONFIRM_REMOVE_UPVOTE || flow == Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) && <div style={{color: props.theme != null ? props.theme.commentViewUserColor : theme.commentViewUserColor}}><Dot /></div>}
                        {((flow == Constants.FLOW_INIT || flow == Constants.FLOW_UPLOAD_COMPLETE || flow == Constants.FLOW_SHOW_ATTACHMENT) && props.showCancel != null && props.showCancel) && <div style={{color: props.theme != null ? props.theme.commentViewUserColor : theme.commentViewUserColor}}><Dot /></div>}
                        {((flow == Constants.FLOW_INIT || flow == Constants.FLOW_UPLOAD_COMPLETE || flow == Constants.FLOW_SHOW_ATTACHMENT) && props.showCancel != null && props.showCancel) && <Button style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}} className="button_cancel" onClick={() => {onCancelClicked()}} variant="btn btn-outline"><small>Cancel</small></Button>}
                    </div>
                    {((flow == Constants.FLOW_VIEW || flow == Constants.FLOW_CONFIRM_DELETE || flow == Constants.FLOW_CONFIRM_REMOVE_LIKE || flow == Constants.FLOW_CONFIRM_REMOVE_DISLIKE || flow == Constants.FLOW_CONFIRM_REMOVE_UPVOTE || flow == Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) && ((props.showEdit != null && props.showEdit) || (props.showDelete != null && props.showDelete))) && <div className='button_show_edit d-flex me-2' ref={refPopup} onClick={() => {showEdit(true)}} style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}><ChevronDown /></div>}
                    {((flow == Constants.FLOW_SHOW_EDIT) && ((props.showEdit != null && props.showEdit) || (props.showDelete != null && props.showDelete))) && <div className='button_show_edit d-flex me-2' ref={refPopup} onClick={() => {showEdit(false)}} style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}><ChevronUp /></div>}

                </div>

                {(flow == Constants.FLOW_SHOW_EDIT || flow == Constants.FLOW_CONFIRM_DELETE) && <div className='d-flex justify-content-between'>
                    <div></div>
                    <div>
                        {(props.showEdit != null && props.showEdit) && <Button className="button_edit" onClick={() => {onEditClicked()}} variant="btn btn-outline" style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}><small><small>Edit</small></small></Button>}
                        {(props.showDelete != null && props.showDelete) && <Button className="button_delete " onClick={() => {onDeleteClicked()}} variant="btn btn-outline" style={{color: props.theme != null ? props.theme.commentViewDecorationColor: theme.commentViewDecorationColor}}><small><small>Delete</small></small></Button>}
                    </div>
                </div>}


                {flow == Constants.FLOW_DELETED && <Container className='d-flex flex-column flex-grow-1 p-0'>

                    <div className='slash_circle py-2' style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <SlashCircle className='me-2' />
                        {
                            Constants.CONTENT_DELETED
                        }
                    </div>

                </Container>}
                
                {(flow == Constants.FLOW_VIEW || flow == Constants.FLOW_CONFIRM_DELETE || flow == Constants.FLOW_CONFIRM_REMOVE_LIKE || flow == Constants.FLOW_CONFIRM_REMOVE_DISLIKE || flow == Constants.FLOW_CONFIRM_REMOVE_UPVOTE || flow == Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE || flow == Constants.FLOW_SHOW_EDIT) && <Container className='d-flex p-0'>

                    {props.showVotes && <div className='d-flex flex-column justify-content-start align-items-center py-2' style={{width: '45px',marginRight: '7px'}}>
                        <small>
                            {iHaveUpVoted && <CaretUpFill className="button_upvoted" onClick={()=>{onUpVoteRemoved()}} style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}}/>}
                            {!iHaveUpVoted && <CaretUp className="button_upvote" onClick={()=>{onUpVoted()}} style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}/>}
                        </small>
                        <small>
                            {(iHaveUpVoted || iHaveDownVoted) && <span style={{color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}}>{upVotes - downVotes}</span>}
                            {(!iHaveUpVoted && !iHaveDownVoted) && <span style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}>{upVotes - downVotes}</span>}
                        </small> 
                        <small>
                            {iHaveDownVoted && <CaretDownFill className="button_downvoted" onClick={() => {onDownVoteRemoved()}} style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}}/>}
                            {!iHaveDownVoted && <CaretDown className="button_downvote" onClick={() => {onDownVoted()}} style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}/>}
                        </small>
                    </div>}

                    <Container className='d-flex flex-column flex-grow-1 p-0'>
                        {(getReplyToWrap().userName != null) && <div className='p-2 rounded-3 mt-3' style={{
                            backgroundColor: props.theme.commentViewReplyToBackgroundColor != null ? props.theme.commentViewReplyToBackgroundColor : theme.commentViewReplyToBackgroundColor,
                            color: props.theme.commentViewReplyToTitleColor != null ? props.theme.commentViewReplyToTitleColor : theme.commentViewReplyToTitleColor, 
                            borderLeftWidth: '5px', 
                            borderLeftColor: props.theme.commentViewReplyToTitleColor != null ? props.theme.commentViewReplyToTitleColor : theme.commentViewReplyToTitleColor, 
                            borderLeftStyle: 'solid', 
                            cursor: 'pointer'}} onClick={() => {onReplyToClicked()}}>
                            <div>
                                <b>
                                {
                                    getReplyToWrap().userName.substring(0, 40)
                                }    
                                </b>
                            </div>
                            <div>
                                <small>
                                {
                                    getReplyToWrap().text.substring(0, 40)
                                }    
                                </small>
                            </div>
                        </div>}
                        <div className='py-3' style={{
                            color: props.theme.commentViewColor != null ? props.theme.commentViewColor : theme.commentViewColor
                            }}>
                            {
                                textNew
                            }
                        </div>
                        {(uploadResult.length > 0) && <div className='d-flex justify-content-between'>
                            <div className="d-flex align-items-center mb-0 px-0 pt-0 pb-2" role="alert" style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}} onClick={() => {onClickAttachment()}}>
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
                                <div className='ms-2'><small><small><ArrowRight /> </small></small></div>
                            </div>
                        </div>}
                        <div className='d-flex justify-content-end align-items-center text-muted'>
                            
                            <Button className="button_reply ps-0 pe-0 py-0 me-2" onClick={() => {onReplyClicked()}} variant="btn btn-outline" style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}><small>Reply</small></Button>
                            {props.showShare && <Dot style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}/>}
                            {props.showShare && <Button className="button_reply ps-0 pe-0 py-0 ms-2 me-2" onClick={() => {onShareClicked()}} variant="btn btn-outline" style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}><small>Share</small></Button>}
                        
                        </div>
                        {(props.showLikes || props.showDisLikes || props.user.timestamp != null) && <div className='d-flex justify-content-start align-items-center text-muted mt-2'>
                            
                            <div className='d-flex w-100 justify-content-end align-items-center'>
                                
                                {props.user.timestamp != null && <div style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}} className="me-3"><small><small>{Util.timeDifference(new Date().getTime(), parseInt(props.user.timestamp)*1000)}</small></small></div>}
                                {edited &&  <Dot className='me-2' style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}/>}
                                {edited && <Button className="button_reply ps-0 pe-0 py-0 me-2" disabled={true} variant="btn btn-link" style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}><small><small>Edited</small></small></Button>}
                                {edited &&  <Dot className='me-2'/>}
                                {props.showLikes && <div className='d-flex justify-content-start align-items-center me-4'>
                                    <small>
                                        {(iHaveLiked) && <span style={{color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}}><HandThumbsUpFill className='button_liked me-2' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {onLikeRemoved()}}/>{likes}</span>}
                                        {(!iHaveLiked) && <span style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}><HandThumbsUp className='button_like me-2' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {onLiked()}}/>{likes}</span>}
                                    </small>
                                </div>}
                                {props.showDisLikes && <div className='d-flex justify-content-start align-items-center me-2'>
                                    <small>
                                        {(iHaveDisLiked) && <span style={{color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}}><HandThumbsDownFill className='button_disliked me-2' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {onDisLikeRemoved()}}/>{disLikes}</span>}
                                        {(!iHaveDisLiked) && <span style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}><HandThumbsDown className='button_dislike me-2' style={{marginBottom: '2px', cursor: 'pointer'}} onClick={() => {onDisLiked()}}/>{disLikes}</span>}
                                    </small>
                                </div>}
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_LIKE) && <div className='d-flex justify-content-end' style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}>
                            <div>
                                <small><small><small>Press again to remove like</small></small></small>
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_DISLIKE) && <div className='d-flex justify-content-end' style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}>
                            <div>
                                <small><small><small>Press again to remove dislike</small></small></small>
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_DELETE) && <div className='d-flex justify-content-end' style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}>
                            <div>
                                <small><small><small>Press again to delete</small></small></small>
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_UPVOTE) && <div className='d-flex justify-content-start' style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}>
                            <div>
                                <small><small><small>Press again to remove upvote</small></small></small>
                            </div>
                        </div>}
                        {(flow === Constants.FLOW_CONFIRM_REMOVE_DOWNVOTE) && <div className='d-flex justify-content-start' style={{color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor}}>
                            <div>
                                <small><small><small>Press again to remove downvote</small></small></small>
                            </div>
                        </div>}
                    </Container>

                </Container>}

                {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE || flow === Constants.FLOW_EMOJI_PICKER || flow == Constants.FLOW_SHOW_ATTACHMENT) && <Container className='d-flex flex-column flex-grow-1 p-0 my-1'>

                    {(getReplyToWrap().userName != null) && <div className='p-2 rounded-3 my-2' style={{
                            backgroundColor: props.theme.commentViewReplyToBackgroundColor != null ? props.theme.commentViewReplyToBackgroundColor : theme.commentViewReplyToBackgroundColor,
                            color: props.theme.commentViewReplyToTitleColor != null ? props.theme.commentViewReplyToTitleColor : theme.commentViewReplyToTitleColor, 
                            borderLeftWidth: '5px', 
                            borderLeftColor: props.theme.commentViewReplyToTitleColor != null ? props.theme.commentViewReplyToTitleColor : theme.commentViewReplyToTitleColor, 
                            borderLeftStyle: 'solid', 
                            cursor: 'pointer'}}  onClick={() => {onReplyToClicked()}}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                {
                                    getReplyToWrap().userName.substring(0, 40)
                                }    
                                </div>
                                {props.showReplyToClose != null && props.showReplyToClose && <div className='button_replyto_close px-2' onClick={(event) => {event.stopPropagation(); onReplyToClosed()}} style={{
                                    cursor: 'pointer'
                                }}>
                                    <X />
                                </div>}
                            </div>
                            <div>
                                <small>
                                {
                                    getReplyToWrap().text.substring(0, 40)
                                }    
                                </small>
                            </div>
                    </div>}

                    <div className='d-flex align-items-end'>
                        {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE || flow === Constants.FLOW_SHOW_ATTACHMENT) && <Button className="btn_emoji" variant='btn-outline-secondary me-1' onClick={() => {openEmojiPicker(true)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                            <EmojiSmile/>
                        </Button>}
                        {(flow === Constants.FLOW_EMOJI_PICKER) && <Button className="btn_cancel_emoji" variant='btn-outline-secondary me-1' onClick={() => {openEmojiPicker(false)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                            <Keyboard/>
                        </Button>}
                        <textarea ref={refInputNew} className='text_input rounded-3 flex-grow-1 border-0 mt-2 py-1 px-2 me-1'  style={{resize: 'none', overflow: 'hidden', height: '35px', minHeight: '35px'}} onChange={()=>{}} onKeyUp={(event) => {onTextAreaKeyUp(event)}} onInput={(event) => {auto_grow(event)}}></textarea>
                        {(flow === Constants.FLOW_INIT  || flow === Constants.FLOW_EMOJI_PICKER ) && <Button className="btn_paperclip" variant='btn-outline-secondary me-1' onClick={() => {showAttachment(true)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                            <Paperclip/>
                        </Button>}
                        {(flow === Constants.FLOW_SHOW_ATTACHMENT) && <Button className="btn_cancel_paperclip" variant='btn-outline-secondary mx-1' onClick={() => {showAttachment(false)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                            <ChevronUp/>
                        </Button>}
                        <Button className="btn_send" variant='btn btn-secondary' onClick={() => {submitResult()}} disabled={disableSubmit} style={{backgroundColor: theme.uploadToS3UploadBackgroundColor, color: theme.uploadToS3UploadColor}}>
                            <Send/>
                        </Button>
                    </div>
                    
                </Container>}

                {flow === Constants.FLOW_UPLOAD_COMPLETE && <Container className='d-flex flex-row justify-content-start align-items-center ps-0 pe-0 pt-2'>
                    <div className="d-flex alert alert-secondary align-items-center mb-0 p-0 px-2" role="alert" style={{
                            backgroundColor: props.theme.commentViewReplyToBackgroundColor != null ? props.theme.commentViewReplyToBackgroundColor : theme.commentViewReplyToBackgroundColor,
                            color: props.theme.commentViewReplyToTitleColor != null ? props.theme.commentViewReplyToTitleColor : theme.commentViewReplyToTitleColor}} >
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
                    <Picker onEmojiClick={(event, obj) => {onEmojiChosen(event, obj)}}  pickerStyle={{ width: '100%' }}/>
                </Container>}

                {(flow == Constants.FLOW_SHOW_ATTACHMENT) && <Container className='d-flex flex-row justify-content-center align-items-center ps-0 pe-0 pt-2 pb-2'>
                    {/* {(flow === Constants.FLOW_INIT || flow === Constants.FLOW_UPLOAD_COMPLETE) && <Button className="btn_emoji" variant='btn-outline-secondary me-2' onClick={() => {openEmojiPicker(true)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <EmojiSmile/>
                    </Button>} */}
                    <div style={{visibility: 'hidden'}}/>
                    {<Button className="btn-video" variant='btn-outline-secondary mx-2' onClick={() => {prepareUpload(Constants.UPLOAD_TYPE_VIDEO)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <PlayBtn/>
                    </Button>}
                    {<Button className="btn-pdf" variant='btn-outline-secondary mx-2' onClick={() => {prepareUpload(Constants.UPLOAD_TYPE_PDF)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <Paperclip/>
                    </Button>}
                    {<Button className="btn-image" variant='btn-outline-secondary mx-2' onClick={() => {prepareUpload(Constants.UPLOAD_TYPE_IMAGE)}} style={{color: props.theme != null ? props.theme.commentViewColor : theme.commentViewColor}}>
                        <CardImage />
                    </Button>}

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