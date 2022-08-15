# react-commentview

> A responsive & reusable react component that transforms a simple text area into a sophisticated comment box or comment input.

[![NPM](https://img.shields.io/npm/v/react-commentview.svg)](https://www.npmjs.com/package/react-commentview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- **Reusable** - It can be integrated easily into your react application, in any place, where a comment input is required
- **Responsive** - UI is designed in bootstrap and is fully responsive
- **View Mode & Edit Mode** - This component can be rendered in two modes - view & edit
- **Image Upload** - Along with text input, it also supports image attachments (preview & cropping integrated)
- **PDF Upload** - Along with text input, it also supports pdf attachments (preview integrated)
- **Video Upload** - Along with text input, it also supports video attachments (preview, thumbnail generation & clipping integrated)
- **Emoji** - More than 1100 standard emojis are available to choose from

## Modes

### View Mode

View mode looks like the image below.

<img src="https://user-images.githubusercontent.com/108924653/184130496-df814e26-708b-4014-959c-c31d4b9a58ea.png" width="300"/></a>

### Edit Mode

Edit mode looks like the image below.

<img src="https://user-images.githubusercontent.com/108924653/184131257-08819de2-ebac-41e4-90b2-50fb239111a8.png" width="300"/></a>


## Demos

### Emoji integration

<a href="https://youtu.be/l5KTLUQpnP8"><img src="https://user-images.githubusercontent.com/108924653/184135974-68401ada-dd34-4c1e-9ad5-4d4c23ae9dd9.png" width="300"/></a>

### Image uploader integration

<a href="https://youtu.be/MZM0oy5-Kkw"><img src="https://user-images.githubusercontent.com/108924653/184136018-c5830075-4fb1-4c1a-83d2-0f5730e00906.png" width="300"/></a>

### Video uploader integration

<a href="https://youtu.be/eevHmGbphV8"><img src="https://user-images.githubusercontent.com/108924653/184136167-02ce05a2-4dab-4306-ac61-42d83e36b943.png" width="300"/></a>

### PDF uploader integration

<a href="https://youtu.be/UAW6q85YtHs"><img src="https://user-images.githubusercontent.com/108924653/184136123-f1f7267c-9124-466f-9861-2a27ab5aa3d3.png" width="300"/></a>


## Install

```bash
npm install --save react-commentview
```

## Dependencies

```bash
npm install --save aws-sdk
npm install --save bootstrap
npm install --save react-bootstrap
npm install --save react-bootstrap-icons
npm install --save react-ui-components-superflows
npm install --save react-ui-themes-superflows
npm install --save react-upload-to-s3
```

## Configuration

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

## Usage

[![Demo](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/react-ts-fbmjp8?file=App.tsx)

### Props

- bucket: Name of the S3 bucket
- awsRegion: Region where the bucket exists
- awsKey: AWS Access Key (should come from environment variables)
- awsSecret: AWS Secret (should come from environment variables)
- awsMediaConvertEndPoint: AWS region specific mediaconvert endpoint
- mediaConvertRole: Media convert role
- showEdit: Flag, which sets the visility of the edit button (edit button changes the mode from view to edit) (optional)
- showDelete: Flag, which sets the visibility of the delete button (optional)
- showCancel: Flag, which sets the visibility of the cancel button (cancel button changes the mode from edit to view) (optional)
- cdnPrefix: If you bucket is behind a cdn, then explicitly provide a prefix, (optional)
- onSubmit: Submit callback
- onDelete: Delete callback
- user: User information to be showed in the comment view
- prefill: Data to prefill, set attachment to null if only text needs to be prefilled (optional)
- theme: UI Theme (optional)

```jsx
import React from 'react';

import { Col, Row, Container } from 'react-bootstrap';
import { CommentView } from 'react-commentview';
import Themes from 'react-ui-themes-superflows';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const theme = Themes.getTheme('Default');

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={12} xs={12} md={6} xxl={6}>
          <CommentView
            bucket="awsBucket"
            awsRegion="awsRegion"
            awsKey="awsAccessKey"
            awsSecret="awsSecret"
            awsMediaConvertEndPoint="https://********.mediaconvert.<awsRegion>.amazonaws.com"
            mode="edit"
            showEdit={true}
            showDelete={true}
            showCancel={true}
            mediaConvertRole="mediaconvert_role"
            user={{id: 2, name: "Hrushi M", picture: "https://image.shutterstock.com/mosaic_250/2780032/1714666150/stock-photo-head-shot-portrait-close-up-smiling-confident-businessman-wearing-glasses-looking-at-camera-1714666150.jpg", timestamp: "1660215594"}}
            cdnPrefix="https://<prefix url>"
            onSubmit={(result) => {console.log('submit result', result);}}
            onDelete={(result) => {console.log('delete result', result);}}
            theme={theme}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

```


## Tests

PASS src/index.test.js (18.193s)
✓ CommentView: Render of blank edit mode (33ms)
✓ CommentView: Render of prefilled edit mode without attachment (10ms)
✓ CommentView: Render of prefilled edit mode with attachment (10ms)
✓ CommentView: Render of prefilled view mode without attachment, edit and delete (1050ms)
✓ CommentView: Render of prefilled view mode with attachment and without edit and delete (1032ms)
✓ CommentView: Render of prefilled view mode with attachment and with edit and delete (1030ms)
✓ CommentView: Render of Uploader (6038ms)
✓ CommentView: Render of Emoji picker (5151ms)
✓ CommentView: Switching from View Mode To Edit Mode (2057ms)

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |     65.6 |    65.33 |    59.46 |    65.85 |                   |
 CommentView.js |    64.36 |    67.39 |    55.88 |    64.65 |... 54,267,291,303 |
 Constants.js   |      100 |      100 |      100 |      100 |                   |
 Util.js        |    69.57 |    41.67 |      100 |    69.57 |... 33,37,44,45,49 |
 index.js       |        0 |        0 |        0 |        0 |                   |
----------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        18.874s
Ran all test suites.

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
