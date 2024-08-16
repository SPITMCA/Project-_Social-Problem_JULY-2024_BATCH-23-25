Project Installation Steps

1. Download the repository
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. Backend setup:
   - Go to backend folder
     cd backend

   - Install dependencies
     npm install

   - Create .env file and add relevant keys
     echo "MONGODB_URI=your_mongodb_connection_string" > .env
     echo "OTHER_KEY=other_value" >> .env

   - Start the backend server
     npm run start

3. Frontend setup:
   - Go to frontend folder
     cd ../frontend

   - Install dependencies
     npm install

   - Start the frontend development server
     npm run start
