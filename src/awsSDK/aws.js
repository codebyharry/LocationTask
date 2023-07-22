import AWS from 'aws-sdk';

//removed the keys for security purposes

const AWS_ACCESS_KEY = 'Access Key';
const AWS_SECRET_KEY = 'Secret Key';
const AWS_S3_BUCKET_NAME = 'Bucket Name';
const AWS_S3_BUCKET_REGION = 'Bucket Region';

AWS.config.update({
  region: AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export {AWS_S3_BUCKET_NAME};
