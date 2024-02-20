
# File Management API - Description

This is a simple Node.js API for managing files. It allows users to perform the following operations:

- **Upload**: Upload files to the server.
- **List**: List all uploaded files.
- **Delete**: Delete uploaded files.
- **Download**: Download uploaded files.

The API uses [multer](https://www.npmjs.com/package/multer) for file uploads and [morgan](https://www.npmjs.com/package/morgan) for logging HTTP requests.

## Getting Started

1. Clone the repository to your local machine:.
   ```bash
   git clone https://github.com/rushikeshhirve/File-Management-API
2. Install dependencies.
   ```bash
   npm install

3. Run the application with `npm start`. Visit http://localhost:3000 in your browser.


## Usage of the API

### Upload
- **Method**: `POST`
- **URL**: `/upload`
- **Description**: Upload a file to the server.
- **Request Parameters**:
  - `myFile`: The file to be uploaded.
- **Response**:
  - Status Code: `200 OK`
  - Body: `{ message: "File is uploaded successfully" }`
- **Error Handling**:
  - Status Code: `400 Bad Request`
  - Body: `{ error: "Error message" }` (If multer encounters an error)
  - Status Code: `500 Internal Server Error`
  - Body: `{ error: "An error occurred while uploading the file" }` (If an unexpected error occurs)

### List
- **Method**: `GET`
- **URL**: `/files`
- **Description**: List all uploaded files.
- **Response**:
  - Status Code: `200 OK`
  - Body: `{ FileName: ["file1.txt", "file2.png"], FileCount: 2 }`
- **Error Handling**:
  - Status Code: `500 Internal Server Error`
  - Body: `"Unable to read the file names"`

### Delete
- **Method**: `DELETE`
- **URL**: `/deletefile/:filename`
- **Description**: Delete an uploaded file by filename.
- **URL Parameters**:
  - `filename`: The name of the file to delete.
- **Response**:
  - Status Code: `200 OK`
  - Body: `{ Message: "file.txt file deleted successfully." }`
- **Error Handling**:
  - Status Code: `404 Not Found`
  - Body: `{ error: "File not found" }`
  - Status Code: `500 Internal Server Error`
  - Body: `{ error: "Unable to check file status" }`

### Download
- **Method**: `GET`
- **URL**: `/downloadfile/:filename`
- **Description**: Download an uploaded file by filename.
- **URL Parameters**:
  - `filename`: The name of the file to download.
- **Response**:
  - If the file exists, it will be downloaded.
  - If the file does not exist, returns:
    - Status Code: `400 Bad Request`
    - Body: `{ Message: "File is not exist, unable to download the file. Check the file name on /files" }`

## Logging
- HTTP requests are logged using morgan middleware.
- The access log is stored in `access.log`.

### Log Format
- **Format**: `:date[iso] - :method :url :status :res[content-length] - :response-time ms`

## Dependencies
- [Express](https://www.npmjs.com/package/express): Web framework for Node.js.
- [multer](https://www.npmjs.com/package/multer): Middleware for handling multipart/form-data, used for file uploads.
- [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware.
- [fs](https://nodejs.org/api/fs.html): File system module in Node.js.
- [path](https://nodejs.org/api/path.html): Utilities for working with file and directory paths.



