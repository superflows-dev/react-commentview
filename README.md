# react-commentview

> A responsive & reusable react component that transforms a simple text area into a sophisticated comment box or comment input.

[![NPM](https://img.shields.io/npm/v/react-commentview.svg)](https://www.npmjs.com/package/react-commentview) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- **Reusable** - It can be integrated easily into your react application, in any place, where a comment input is required
- **Responsive** - UI is designed in bootstrap and is fully responsive
- **Image Upload** - Along with text input, it also supports image attachments (preview & cropping integrated)
- **PDF Upload** - Along with text input, it also supports pdf attachments (preview integrated)
- **Video Upload** - Along with text input, it also supports video attachments (preview & clipping integrated)
- **Emoji** - More than 1100 standard emojis are available to choose from

## Demos

### Emoji integration

<a href="https://youtu.be/1LOhjp61PZo"><img src="https://user-images.githubusercontent.com/108924653/183871991-350371ec-80c9-4661-ab28-b7100de21907.png" width="300"/></a>

### Image uploader integration

<a href="https://youtu.be/gPTFRAGS8q4"><img src="https://user-images.githubusercontent.com/108924653/183872019-91f179d6-098f-4a76-a209-a83b7fadf9e3.png" width="300"/></a>

### Video uploader integration

<a href="https://youtu.be/EIipPc-9JTo"><img src="https://user-images.githubusercontent.com/108924653/183872118-ccdf4fc0-6622-4438-93e3-f2b5a53cf572.png" width="300"/></a>

### PDF uploader integration

<a href="https://youtu.be/4pKNNZbwCi8"><img src="https://user-images.githubusercontent.com/108924653/183872076-f1dbdde7-36aa-443a-a801-149f4cd771e6.png" width="300"/></a>


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
- onSubmit: Submit callback
- prefill: Data to prefill, set attachment to null if only text needs to be prefilled
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
            bucket="superflows-myuploads"
            awsRegion="awsRegion"
            awsKey="awsKey"
            awsSecret="awsSecret"
            awsMediaConvertEndPoint="awsEndpoint"
            type="video"
            mediaConvertRole="mediaconvert_role"
            onSubmit={(result) => {
              console.log('submit result', result);
            }}
            preFill={{text: 'Hello there!', attachment: {
              type: 'image', object: 'mybucket/filename.png'
            }}}
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

PASS src/index.test.js (14.775s)
  ✓ McqView: Render of Newtext Editor (42ms)
  ✓ McqView: Render of Uploader (6037ms)
  ✓ McqView: Render of Emoji picker (5149ms)

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |    62.69 |    56.32 |    62.96 |    63.08 |                   |
 CommentView.js |    63.33 |    57.65 |       64 |    63.79 |... 37,150,174,186 |
 Constants.js   |      100 |      100 |      100 |      100 |                   |
 Util.js        |       50 |        0 |       50 |       50 |             4,5,7 |
 index.js       |        0 |        0 |        0 |        0 |                   |
----------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        16.159s
Ran all test suites.

## License

MIT © [superflows-dev](https://github.com/superflows-dev)
