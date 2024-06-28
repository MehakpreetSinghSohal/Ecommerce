# E-commerce Project

## Setup Instructions

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js installed
- MongoDB installed and running
- Visual Studio Code (VS Code) installed

### Cloning the Repository

1. Clone the GitHub repository to your local machine:
   ```bash
   git clone <repository-url>
 2. Open the cloned repository in VS Code.
 3. Setting Up the Frontend
4. Navigate  to the frontend directory:
    cd frontend
5. Install the necessary dependencies:
    npm install
6. Setting Up the Backend
7. Navigate to the backend directory:
    cd backend
   
8. Initialize the backend:
    npm init
9.Install the necessary dependencies:
    npm install

10. Configuring Environment Variables
11. In the backend directory, create a .env file:
    touch .env
12. Open the .env file and add the following environment variables:
    MONGO_URL=<your-mongodb-url>
    SECRET_KEY=<your-secret-key>
13. Adding Products to MongoDB
14. Ensure MongoDB is running on your local machine.
15. Add the provided ecom.products data to your MongoDB database.

16. Running the Application
17. Start the frontend:
    cd frontend
    npm start
18. Start the backend:
    cd backend
    nodemon index.js
