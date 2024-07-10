# Health Insurance Plans Project

## Description

This is a full stack MERN project developed during my internship, focused on displaying various health insurance plans. The application includes features such as user authentication, plan browsing, and detailed plan information.

## Features

- User Authentication (Sign Up, Login, Logout)
- Browse Health Insurance Plans
- View Plan Details
- Responsive Navigation
- Secure and scalable backend

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js
- MongoDB
- npm or yarn

### Backend Setup

1. Clone the repository
    ```sh
    git clone https://github.com/eshanprabhat/nh_project.git
    ```
2. Install dependencies
    ```sh
    npm install
    ```
3. Create a `.env` file in the backend directory and add the following environment variables:
    ```env
    NODE_ENV=development
    PORT=8000
    USERNAME=your Username
    DATABASE_PASSWORD=Your Database Password
    DATABASE=Your Database String
    RAZORPAY_KEY_ID=Your Razorpay Key Id
    RAZORPAY_KEY_SECRET=Your Razorpay key secret
    AWS_BUCKET_NAME=Your AWS Bucket Name
    AWS_BUCKET_REGION=AWS region
    AWS_ACCESS_KEY=AWS Access key
    AWS_ACCESS_SECRET=AWS Access Secret
    ```
4. Start the backend server
    ```sh
    npm run server
    ```

### Frontend Setup

1. Install dependencies
    ```sh
    npm install
    ```
1. Start the frontend development server
    ```sh
    npm start
    ```

## Usage

Once both servers are running, you can access the application at `http://localhost:3000`.

- Sign up for a new account or log in with existing credentials.
- Browse through the available health insurance plans.
- Click on any plan to view detailed information.

## Technologies Used

- **Frontend:** React, Material UI, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Version Control:** Git, GitHub

## Contributors

- [Eshan Prabhat](https://github.com/eshanprabhat)

## License

Distributed under the MIT License. See `LICENSE` for more information.
