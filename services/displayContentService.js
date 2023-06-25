const express = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { Sequelize, DataTypes } = require('sequelize');

// Khởi tạo AWS SDK và cấu hình
AWS.config.update({
  accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
  region: 'YOUR_AWS_REGION',
});

const s3 = new AWS.S3();

// Khởi tạo kết nối cơ sở dữ liệu (sử dụng Sequelize)
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Định nghĩa mô hình cho bảng tệp tin trong cơ sở dữ liệu (sử dụng Sequelize)
const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  s3Key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Khởi tạo ứng dụng Express
const app = express();

// Route handler để tải tệp tin lên S3 và lưu thông tin vào cơ sở dữ liệu
app.post('/upload', (req, res) => {
  const { filename, file } = req.body;

  // Tạo tên khóa cho tệp tin trên S3
  const s3Key = `uploads/${uuidv4()}`;

  // Tạo pre-signed URL để tải tệp tin lên S3
  const uploadParams = {
    Bucket: 'YOUR_S3_BUCKET_NAME',
    Key: s3Key,
    ContentType: file.type,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', uploadParams, (err, signedUrl) => {
    if (err) {
      console.error('Error generating pre-signed URL:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Lưu thông tin tệp tin vào cơ sở dữ liệu
    File.create({ filename, s3Key })
      .then(() => {
        res.json({ signedUrl });
      })
      .catch((error) => {
        console.error('Error saving file to database:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
});

// Khởi chạy server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
