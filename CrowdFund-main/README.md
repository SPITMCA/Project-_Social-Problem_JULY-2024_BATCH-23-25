## IdeaLift - A Crowdfunding Platform

**IdeaLift** is a crowdfunding platform designed to help individuals create fundraisers for a variety of purposes.

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Contact](#contact)

## Introduction

**IdeaLift** is a versatile crowdfunding platform designed to empower individuals to create fundraisers for a wide range of purposes. Whether you're raising money for personal needs, community projects, creative endeavors, or charitable causes, IdeaLift provides a user-friendly interface and robust tools to help bring your fundraising goals to life. With its flexible campaign options and secure payment processing, IdeaLift makes it easy to connect with supporters and turn ideas into reality.

## Features

Here are some features of IdeaLift:

- **Create Fundraisers**: Easily create your own fundraiser. Upon admin approval, you can start receiving funds right away.
- **Support Great Ideas**: Contribute to meaningful causes by donating to fundraisers that resonate with you.
- **Full Control**: Edit or close your fundraiser at any time—IdeaLift gives you complete control over your campaigns.
- **Admin Approval**: An initial admin approval process ensures the quality and integrity of listed fundraisers.

## Prerequisites

- Ensure you have Node.js and npm installed.
- Set up your MongoDB server, either locally or using MongoDB Atlas.

## Installation

The root directory contains two subdirectories:

1. **Client Side**: `crowdfunding-frontend`
2. **Server Side**: `crowdfunding-backend`

Navigate to each directory and run the following command to install the dependencies:

```bash
# Run in both subdirectories
npm install
```

The following color palette is used in the project:

[https://coolors.co/palette/463f3a-8a817c-bcb8b1-f4f3ee-e0afa0](https://coolors.co/palette/463f3a-8a817c-bcb8b1-f4f3ee-e0afa0)

## Configuration

Set up the `.env` file in the `crowdfunding-backend` directory with the following variables:

```

MONGO_URI = Your_MongoDB_URI
PORT = Your_Desired_Port_Number
JWT_SECRET = Your_JWT_Secret

```

## Usage

To run the project:

```bash

# To start the front-end:
cd crowdfunding-frontend
npm start

# To start the server:
cd crowdfunding-backend
nodemon --env-file=.env index.js

```

## Contact

If you have questions, suggestions, or would like to collaborate, feel free to reach out:

- **Email**: [tiwari.vivekr7@gmail.com](mailto:tiwari.vivekr7@gmail.com)
