# react-commentview

> A responsive, reusable & customizable react component that can be used as a comment box or as a comment input. It is a pure front-end component and does not require backend coding.

[![NPM](https://img.shields.io/npm/v/react-commentview.svg)](https://www.npmjs.com/package/react-commentview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


<table style="border: solid 1px; margin-left: 10px">
<tr>
<td valign="center" style="text-align: center">

<img src="https://user-images.githubusercontent.com/108924653/186316322-c2d55ca2-9ee7-46da-b854-bfd8a63c7258.png" height="40" /> 
<br />
React

</td>
<td valign="center" style="text-align: center">

<img src="https://user-images.githubusercontent.com/108924653/186323459-68acfb91-f707-4184-a2c2-9aa96337067c.png" height="40" /> 
<br />
AWS Serverless

</td>
<td valign="center" style="text-align: center">

<img src="https://user-images.githubusercontent.com/108924653/186630282-c2500c7b-d030-49e3-a359-b3ec47937eb5.png" height="40" /> 
<br />
Bootstrap

</td>
</tr>
</table>

<br />


<img src="https://user-images.githubusercontent.com/108924653/186482331-051af31f-f027-4393-8344-4480b71d3db4.png" width="450"/>

<img src="https://user-images.githubusercontent.com/108924653/186482367-fe37f887-7eac-48bb-9d44-a38ed2b418f8.png" width="450"/>

<br />

## On This Page

- [Introduction](#introduction)
- [Use Cases](#use-cases)
- [Features](#features)
- [Modes](#modes)
- [Functionality](#functionality)
- [Quickstart](#quickstart)
- [Props](#props)
- [More Use-Cases](#more-use-cases)
- [Customization](#customization)
- [AWS Configuration](#aws-configuration)
- [Tests](#tests)

<br />

## Introduction 

Use this flexible, customizable and reusable React component to develop user comments based functionality into your application. It is packed with functionality, keeping the basic usage simple. It is designed in Bootstrap, is responsive and renders nicely on all screen sizes. Customizable color scheme allows it to seamlessly blend in to any UI. It depends on AWS serverless technologies for certain functionalities such as uploading and processing attachments. However, it is a pure front-end component and does not need backend coding. 

[Back To Top ▲](#on-this-page)

<br />

## Use Cases

Possible usage of this component includes but is not limited to the following use-cases:
- Development of a chat / group chat / messenger module
- Development of a web based forum module
- Developement of a social network
- Development of a topic-based commenting / discussion module
- Development of a user reviews module
- Development of a user feedback module
- Development of a contact us module

and many more.

[Back To Top ▲](#on-this-page)

<br />

## Features

- **Reusable** - It can be integrated easily into your react application, in any place, where a comment input or comment display, is required. It allows multiple instances on a single page.
- **Responsive** - UI is designed in bootstrap, is fully responsive and renders nicely on all screen sizes.
- **Customizable** - The colors scheme of this component is customizable. It can be changed for it to blend in with any UI.
- **Pure Front-end** - This is a pure front-end react component and backend coding is not required. For certain functionalities that need a backend, AWS configuration is required and is explained in the subsequent sections.

[Back To Top ▲](#on-this-page)

<br />

## Modes

This component has three operating modes - view mode, edit mode and deleted mode. For setting the mode during initial render, a prop is used. As the user interacts with the component further, the component can switch from one mode to other. This behaviour can be controlled by setting the [props](#props).

<br />

### View Mode

In view mode the comment text is displayed along with other enabled decorations, such as likes, votes, etc.

<img src="https://user-images.githubusercontent.com/108924653/186482367-fe37f887-7eac-48bb-9d44-a38ed2b418f8.png" width="450"/>
<br /><br />

### Edit Mode

In edit mode, the component functions as a comment editor. Edit mode can be used for accepting new comments as well as editing existing comments. User can provide text, image, pdf and video as inputs. For uploading attachments such as images, pdfs and video, this component depends on AWS. Backend coding is not necessary. Only [AWS configuration](#aws-configuration) is required. 

<img src="https://user-images.githubusercontent.com/108924653/186482331-051af31f-f027-4393-8344-4480b71d3db4.png" width="450"/>
<br /><br />

### Deleted Mode

Deleted mode looks like the image below.

<img src="https://user-images.githubusercontent.com/108924653/184696101-db982c87-475a-450f-a70e-02b8074ddb74.png" width="450"/></a>

[Back To Top ▲](#on-this-page)

<br />

## Functionality

This component provides the following functionality:

<br />

### Edit Mode Functionality

- **Text Input** - Auto-resizable text area component to accept textual input
- **Emoji Support** - More than 1100 standard emojis are available to choose from
- **Image Upload** - Supports image attachments (preview & cropping integrated)
- **PDF Upload** - Supports pdf attachments (preview integrated)
- **Video Upload** - Supports video attachments (preview, thumbnail generation & video start-end clipping integrated)

<br />

### View Mode Functionality

- **Likes** - Allow users to like
- **Dislikes** - Allow users to dislike
- **Votes** - Allow users to upvote or downvote
- **Share** - Allow users to share
- **Reply** - Allow users to reply to any particular comment
- **Replied To** - Show the source comment summary, to which the current comment is a reply to

[Back To Top ▲](#on-this-page)

<br />

## Quickstart

Read this section to get started with the implementation. You can use this component in view, edit and delete [modes](#modes). This section will help you get started with the basic usage. After you become familiar, you can move on to explore [further features](#more-use-cases) and [customization](#customization).

<br />

### Before You Begin

<br />

<u>Install Dependencies</u>

This module depends on the following packages. Install them first.

```bash

npm install --save aws-sdk
npm install --save bootstrap
npm install --save react-bootstrap
npm install --save react-bootstrap-icons
npm install --save react-ui-components-superflows
npm install --save react-ui-themes-superflows
npm install --save react-upload-to-s3

```

- **AWS SDK** is used for uploading attachments such as images, pdfs and videos.
- **Bootstrap** is the framework, which this component uses for design and layouting
- **UI Components** contains some specially designed components (developed by us) that are used by this component
- **UI Themes** contains some specially designed themes (developed by us) that are used by this component
- **Upload To S3** is developed by us and used to process attachments and to upload them to aws

<br />

<u>AWS Configuration</u>

This component uses AWS as the backend for uploading images, pdfs and videos. The [configuration section](#aws-configuration) below will help you get your AWS setup properly.

<br />

### Installation

```bash
npm install --save react-commentview
```

<br />

### Basic Usage

Same component can be reused in multiple ways, simply by using various combination of props. Three very basic use-cases are covered in this section.

- Showing a simple editor
- Showing a comment
- Showing a deleted comment

After you become familiar with these use-cases, you can move on to [studying the props](#props) and then understanding the [subsequent use-cases](#more-use-cases).

<br />

<u>As a simple editor</u>

<img src="https://user-images.githubusercontent.com/108924653/186572725-01530852-e28f-47ad-82c3-ed26635a1b69.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                bucket="your_bucket"
                awsRegion="your_aws_region"
                awsKey="your_aws_key"
                awsSecret="your_aws_secret"
                awsMediaConvertEndPoint="https://<endpoint_prefix>.mediaconvert.<region>.amazonaws.com"
                mediaConvertRole="mediaconvert_role"
                cdnPrefix="your_cdn_prefix"
                mode="edit"
                preventEditToView={true}
                clearOnSubmit={true}
                callbackInfo={{id: 22}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                onSubmit={(result) => {console.log('submit result', result);}}
                theme={theme}
                onSubmit={(result) => {console.log('submit result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

<br />

<u>To display a comment</u>

<img src="https://user-images.githubusercontent.com/108924653/186573883-2a51a5ea-dff8-4180-94cb-fada8dca42a5.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                bucket="your_bucket"
                awsRegion="your_aws_region"
                awsKey="your_aws_key"
                awsSecret="your_aws_secret"
                awsMediaConvertEndPoint="https://<endpoint_prefix>.mediaconvert.<region>.amazonaws.com"
                mediaConvertRole="mediaconvert_role"
                cdnPrefix="your_cdn_prefix"
                mode="view"
                preFill={{id: 10, text: 'Hello how are you doing? Hoping that things are going good at your end. Lets catchup soon, have something to discuss!', attachment: {object: 'http://superflows.dev/234232344.mp4', type: 'video'}}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
                onReplied={(result) => {console.log('reply result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

<br />

<u>To display a deleted comment</u>

<img src="https://user-images.githubusercontent.com/108924653/186575568-03d13254-9f55-401f-a08b-416c261b4c0e.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                mode="deleted"
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

[Back To Top ▲](#on-this-page)

<br />

## Props 

Use the table below to understand the props and how they can be set to customize the appearance and behaviour of this component.

<br />

### AWS Related Props

Please refer to the [AWS configuration](#aws-configuration) section to know how to obtain your values for these props.

| Prop                       | Type        | Description
|----------------------------|-------------|-------------------------------------------------------------------------------------
| bucket                     | string      | name of your s3 bucket where attachments will be uploaded
| awsRegion                  | string      | name of the aws region where s3 bucket is hosted
| awsKey                     | string      | aws access key (recommended that it should be stored in environment variables)
| awsSecret                  | string      | aws secret (recommended that it should be stored in environment variables)
| awsMediaConvertEndPoint    | url string  | aws media convert endpoint
| mediaConvertRole           | string      | name of aws media convert role
| cdnPrefix                  | url string  | prefix in case your s3 bucket is behind aa cdn

<br />

### Functional Props

| Prop                       | Type        | Description
|----------------------------|-------------|-------------------------------------------------------------------------------------
| mode                       | string      | mode of render, should be either of "view", "edit" and "deleted"
| preventEditToView          | boolean     | flag, which is enables / disables the edit mode from going to view mode after submit
| clearOnSubmit              | boolean     | flag, which enables / disables clearing the editor after submit, in edit mode
| edited                     | boolean     | flag, which shows / hides the 'Edited' decorator, in view mode
| showCancel                 | boolean     | flag, which shows / hides the Cancel button on the editor, in edit mode
| showEdit                   | boolean     | flag, which shows / hides the edit button, in view mode
| showDelete                 | boolean     | flag, which shows / hides the delete button, in view mode
| showLikes                  | boolean     | flag, which enables / disables the like button & functionality, in view mode
| showDisLikes               | boolean     | flag, which enables / disables the dislike button & functionality, in view mode
| showVotes                  | boolean     | flag, which enables / disables the voting functionality, in view mode
| showShare                  | boolean     | flag, which shows / hides the share button, in view mode
| iHaveLiked                 | boolean     | flag, which sets / unsets whether the current user has liked
| iHaveDisLiked              | boolean     | flag, which sets / unsets whether the current user has disliked
| iHaveUpVoted               | boolean     | flag, which sets / unsets whether the current user has upvoted
| iHaveDownVoted             | boolean     | flag, which sets / unsets whether the current user has downvoted
| likes                      | number      | number of likes
| disLikes                   | number      | number of dislikes
| upVotes                    | number      | number of upvotes
| downVotes                  | number      | number of downvotes
| callbackInfo               | json object | any json object can be provided, which is passed back by all callback functions
| replyTo                    | json object | any json object representing a comment to which the current comment is a reply, should follow the template {userName: "Sneha G", text: "Hey buddy!"}
| user                       | json object | any json object representing the current user, should follow the template {id: 2, name: "Hrushi M", picture: "picture_url", timestamp: "1660215594"}
| theme                      | theme object| superflows theme object

<br />

### Callback Function Props

| Prop                       | Type        | Description
|----------------------------|-------------|-------------------------------------------------------------------------------------
| onSubmit                   | callback    | gets invoked after user submits, in edit mode
| onDelete                   | callback    | gets invoked after user deletes, in view mode
| onLiked                    | callback    | gets invoked after user likes, in view mode
| onLikeRemoved              | callback    | gets invoked after user removes like, in view mode
| onDisLiked                 | callback    | gets invoked after user dislikes, in view mode
| onDisLikeRemoved           | callback    | gets invoked after user removes dislike, in view mode
| onReplied                  | callback    | gets invoked after user clicks on reply, in view mode
| onShared                   | callback    | gets invoked after user clicks on share, in view mode
| onUpVoted                  | callback    | gets invoked after user upvotes, in view mode
| onUpVoteRemoved            | callback    | gets invoked after user removes upvote, in view mode
| onDownVoted                | callback    | gets invoked after user downvotes, in view mode
| onDownVoteRemoved          | callback    | gets invoked after user removes downvotes, in view mode
| onReplyTo                  | callback    | gets invoked after user clicks on the source comment, in view mode

<br />

[Back To Top ▲](#on-this-page)


<br />

## More Use-Cases

<br />

### Comment box with likes and dislikes

<img src="https://user-images.githubusercontent.com/108924653/186589022-c0d205d8-2239-4682-a600-396b80b4635b.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                mode="view"
                showLikes={true}
                showDisLikes={true}
                iHaveLiked={true}
                likes={5}
                disLikes={10}
                callbackInfo={{id: 22}}
                preFill={{id: 10, text: 'Hello how are you doing? Hoping that things are going good at your end. Lets catchup soon, have something to discuss!'}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
                onLiked={(result) => {console.log('liked result', result);}}
                onLikeRemoved={(result) => {console.log('like removed result', result);}}
                onDisLiked={(result) => {console.log('liked result', result);}}
                onDisLikeRemoved={(result) => {console.log('dislike removed result', result);}}
                onReplied={(result) => {console.log('reply result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

<br />

### Comment box with voting

<img src="https://user-images.githubusercontent.com/108924653/186589574-39d604c3-5d2a-4aab-8eba-bc5887560b5e.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                mode="view"
                showVotes={true}
                iHaveUpVoted={true}
                upVotes={25}
                downVotes={10}
                callbackInfo={{id: 22}}
                preFill={{id: 10, text: 'Hello how are you doing? Hoping that things are going good at your end. Lets catchup soon, have something to discuss!'}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
                onUpVoted={(result) => {console.log('upvoted result', result);}}
                onUpVoteRemoved={(result) => {console.log('upvote removed result', result);}}
                onDownVoted={(result) => {console.log('downvoted result', result);}}
                onDownVoteRemoved={(result) => {console.log('downvote removed result', result);}}
                onReplied={(result) => {console.log('reply result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```


<br />

### Editable comment box

<img src="https://user-images.githubusercontent.com/108924653/186590200-bef0a6ad-6a38-465b-98f9-16a79785c9ae.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                bucket="your_bucket"
                awsRegion="your_aws_region"
                awsKey="your_aws_key"
                awsSecret="your_aws_secret"
                awsMediaConvertEndPoint="https://<endpoint_prefix>.mediaconvert.<region>.amazonaws.com"
                mediaConvertRole="mediaconvert_role"
                cdnPrefix="your_cdn_prefix"
                mode="view"
                showEdit={true}
                showDelete={true}
                showCancel={true}
                showVotes={true}
                iHaveUpVoted={true}
                upVotes={25}
                downVotes={10}
                callbackInfo={{id: 22}}
                preFill={{id: 10, text: 'Hello how are you doing? Hoping that things are going good at your end. Lets catchup soon, have something to discuss!'}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
                onSubmit={(result) => {console.log('submit result', result);}}
                onDelete={(result) => {console.log('delete result', result);}}
                onReplied={(result) => {console.log('reply result', result);}}
                onShared={(result) => {console.log('share result', result);}}
                onUpVoted={(result) => {console.log('upvoted result', result);}}
                onUpVoteRemoved={(result) => {console.log('upvote removed result', result);}}
                onDownVoted={(result) => {console.log('downvoted result', result);}}
                onDownVoteRemoved={(result) => {console.log('downvote removed result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

<br />

### Comment box with replied to section

<img src="https://user-images.githubusercontent.com/108924653/186633738-29d64a27-954e-45d1-9edd-276ebde7269c.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                bucket="your_bucket"
                awsRegion="your_aws_region"
                awsKey="your_aws_key"
                awsSecret="your_aws_secret"
                awsMediaConvertEndPoint="https://<endpoint_prefix>.mediaconvert.<region>.amazonaws.com"
                mediaConvertRole="mediaconvert_role"
                cdnPrefix="your_cdn_prefix"
                mode="view"
                showEdit={true}
                showDelete={true}
                showVotes={true}
                iHaveUpVoted={true}
                upVotes={25}
                downVotes={10}
                replyTo={{userName: "Sneha G", text: "Hey buddy!"}}
                preFill={{id: 10, text: 'Hello how are you doing? Hoping that things are going good at your end. Lets catchup soon, have something to discuss!'}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
                onSubmit={(result) => {console.log('submit result', result);}}
                onDelete={(result) => {console.log('delete result', result);}}
                onReplied={(result) => {console.log('reply result', result);}}
                onShared={(result) => {console.log('share result', result);}}
                onUpVoted={(result) => {console.log('upvoted result', result);}}
                onUpVoteRemoved={(result) => {console.log('upvote removed result', result);}}
                onDownVoted={(result) => {console.log('downvoted result', result);}}
                onDownVoteRemoved={(result) => {console.log('downvote removed result', result);}}
                onReplyTo={(result) => {console.log('reply to result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

<br />

### Comment editor with replied to section

<img src="https://user-images.githubusercontent.com/108924653/186635243-6a7f33e4-bdc1-4fce-a721-4c2f83e9b9c6.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                bucket="your_bucket"
                awsRegion="your_aws_region"
                awsKey="your_aws_key"
                awsSecret="your_aws_secret"
                awsMediaConvertEndPoint="https://<endpoint_prefix>.mediaconvert.<region>.amazonaws.com"
                mediaConvertRole="mediaconvert_role"
                cdnPrefix="your_cdn_prefix"
                mode="edit"
                showEdit={true}
                showDelete={true}
                showVotes={true}
                iHaveUpVoted={true}
                upVotes={25}
                downVotes={10}
                replyTo={{userName: "Sneha G", text: "Hey buddy!"}}
                preFill={{id: 10, text: 'Hello how are you doing? Hoping that things are going good at your end. Lets catchup soon, have something to discuss!'}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
                onSubmit={(result) => {console.log('submit result', result);}}
                onDelete={(result) => {console.log('delete result', result);}}
                onReplied={(result) => {console.log('reply result', result);}}
                onShared={(result) => {console.log('share result', result);}}
                onUpVoted={(result) => {console.log('upvoted result', result);}}
                onUpVoteRemoved={(result) => {console.log('upvote removed result', result);}}
                onDownVoted={(result) => {console.log('downvoted result', result);}}
                onDownVoteRemoved={(result) => {console.log('downvote removed result', result);}}
                onReplyTo={(result) => {console.log('reply to result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

[Back To Top ▲](#on-this-page)

<br />

## Customization

Appearance customization can be done using the theme object that is passed as a prop. Customizable properties of this component are listed below.

- commentViewBorderColor
- commentViewBackgroundColor
- commentViewUserColor
- commentViewReplyToBackgroundColor
- commentViewReplyToTitleColor
- commentViewColor
- commentViewDecorationColor
- commentViewDecorationHighlightColor
- theme.uploadToS3BackgroundColor

Before passing the theme object as prop to the component, you can change these colors as you wish so that component blends in perfectly in your user interface.

### Night mode colors

This example demonstrates how the theme object can be utilized to change the color scheme to night mode.

<br />
<img src="https://user-images.githubusercontent.com/108924653/186827414-607e3c41-fd24-4315-b2ad-27fdfa4143b0.png" width="450" />
<br />

```jsx
import React from 'react'

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview'
import Themes from 'react-ui-themes-superflows'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const theme = Themes.getTheme("Default");
  theme.commentViewBorderColor = '#dddddd'
  theme.commentViewBackgroundColor = '#000000'
  theme.commentViewUserColor = '#ffffff'
  theme.commentViewColor = '#dddddd'
  theme.commentViewReplyToBackgroundColor = '#222222';
  theme.commentViewReplyToTitleColor = '#cccccc';
  theme.commentViewDecorationColor = '#ff0000';
  theme.commentViewDecorationHighlightColor = '#00ff00';
  theme.uploadToS3BackgroundColor = '#efefef'

  return (

    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={12} xs={12} md={6} xxl={6} >
            <CommentView 
                bucket="your_bucket"
                awsRegion="your_aws_region"
                awsKey="your_aws_key"
                awsSecret="your_aws_secret"
                awsMediaConvertEndPoint="https://<endpoint_prefix>.mediaconvert.<region>.amazonaws.com"
                mediaConvertRole="mediaconvert_role"
                cdnPrefix="your_cdn_prefix"
                mode="view"
                showEdit={true}
                showDelete={true}
                showVotes={true}
                iHaveUpVoted={true}
                upVotes={25}
                downVotes={10}
                replyTo={{userName: "Sneha G", text: "Hey buddy!"}}
                preFill={{id: 10, text: 'Hello how are you doing? Hoping that things are going good at your end. Lets catchup soon, have something to discuss!'}}
                user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
                theme={theme}
                onSubmit={(result) => {console.log('submit result', result);}}
                onDelete={(result) => {console.log('delete result', result);}}
                onReplied={(result) => {console.log('reply result', result);}}
                onShared={(result) => {console.log('share result', result);}}
                onUpVoted={(result) => {console.log('upvoted result', result);}}
                onUpVoteRemoved={(result) => {console.log('upvote removed result', result);}}
                onDownVoted={(result) => {console.log('downvoted result', result);}}
                onDownVoteRemoved={(result) => {console.log('downvote removed result', result);}}
                onReplyTo={(result) => {console.log('reply to result', result);}}
            />
        </Col>
      </Row>
    </Container>

  );
  
}

export default App
```

[Back To Top ▲](#on-this-page)

<br />

## AWS Configuration

### AWS S3

- Create an S3 bucket via the AWS admin console, say name of the bucket is **myuploads**
- Set the bucket policy as follows
```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicListGet",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:List*",
                "s3:Get*"
            ],
            "Resource": [
                "arn:aws:s3:::myuploads",
                "arn:aws:s3:::myuploads/*"
            ]
        }
    ]
}
```
- Set the cors policy as follows
```bash
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

### AWS IAM

#### SDK User

- Create an SDK user via the AWS console so that you get access to aws region, aws access key and aws secret, i.e. aws credentials.
- Ensure that you preserve these credentials in a secure manner.
- It is especially important that these credentials be stored in the environment files and should never be pushed to a source repository such as git.
- For this SDK user, give create, add, edit, delete permissions to your S3 bucket via the AWS console. I usually give full access restricted to a particular bucket, like the one which we created in the S3 section above.

```bash

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "s3-object-lambda:*"
            ],
            "Resource": "arn:aws:s3:::myuploads"
        }
    ]
}

```

- For this SDK user, then give the user access to AWS mediaconvert via the AWS console. I have used AWSElementalMediaConvertFullAccess, which is a pre-created AWS policy for this. To find and attach this policy - Select your IAM user > Click add permissions on the user summary screen > Click attach existing policies directly > Search mediaconvert > Apply the AWSElementalMediaConvertFullAccess policy


#### MediaConvert Role

- Goto IAM > Roles
- Select AWS Service as the trusted entity type
- Choose MediaConvert from the services dropdown
- Click next on add permissions
- Name the role as per your choice. I have named it **mediaconvert_role**. (Remember that this role name has to be given as a prop to the upload-to-s3 component, refer to the Usage section)

### AWS MediaConvert

AWS mediaconvert is required for video processing. The clip selection happens at the client end, whereas the actual clipping is done by an AWS mediaconvert job. This requires a region specific endpoint and can be easily obtained from the aws cli (aws commandline).

```bash
aws mediaconvert describe-endpoints --region <region>
```

Remember that this region specific endpoint also has to be provided as a prop to the upload-to-s3 component. (Refer to the Usage Section)

Once you are through with installing the dependencies and the AWS configuration, using the component becomes fairly simple. Please refer to the Usage below.

<br />


## Tests

PASS src/index.test.js (77.093s)
- ✓ CommentView: Render of blank edit mode (1068ms)
- ✓ CommentView: Render of prefilled edit mode without attachment (1015ms)
- ✓ CommentView: Render of prefilled edit mode with attachment (1029ms)
- ✓ CommentView: Render of prefilled view mode without attachment, edit and delete (1013ms)
- ✓ CommentView: Render of prefilled view mode with attachment and without edit and delete (1021ms)
- ✓ CommentView: Render of prefilled view mode with attachment and with edit and delete (1023ms)
- ✓ CommentView: Render of Uploader (12074ms)
- ✓ CommentView: Render of Emoji picker (6454ms)
- ✓ CommentView: Switching from View Mode To Edit Mode (4052ms)
- ✓ CommentView: Render Likes (11075ms)
- ✓ CommentView: Render Votes (11077ms)
- ✓ CommentView: Text input interaction submit button (3108ms)
- ✓ CommentView: Text input interaction enter key (3030ms)
- ✓ CommentView: Text input interaction enter key clearOnSubmit (3030ms)
- ✓ CommentView: Edit mode to view mode switch (3019ms)
- ✓ CommentView: Edit mode to view mode switch with prefilled text revert (4022ms)
- ✓ CommentView: Render of prefilled view mode with attachment and with edit and delete (6040ms)

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |    78.27 |    66.91 |    76.67 |    78.32 |                   |
 CommentView.js |    78.89 |    67.65 |    75.86 |    78.95 |... 62,724,774,809 |
 Constants.js   |      100 |      100 |      100 |      100 |                   |
 Util.js        |    69.57 |    41.67 |      100 |    69.57 |... 33,37,44,45,49 |
 index.js       |        0 |        0 |        0 |        0 |                   |
----------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        78.601s
Ran all test suites.

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
