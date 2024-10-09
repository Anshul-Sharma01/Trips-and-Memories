# 🌍📸 Trips & Memories 

Welcome to the **Trips & Memories** project! This application aims to help users document and share their travel experiences while allowing them to connect with friends and create collaborative trip journals.

## Features 🛠️

- **User Authentication** 🔐
  - Users can register and log in to access their accounts.
  - JWT (JSON Web Tokens) is used for secure access token generation and refresh tokens.

- **Create Time Capsules** ⏳
  - Users can create time capsules that include a title, description, memory image, and unlock date.
  - Time capsules are a way for users to store memories for a specified future date.

- **Automatic Unlocking of Time Capsules** 🔓
  - Time capsules unlock automatically when the specified date is reached using a scheduling feature with Node-Cron.

- **Bucket List** 📋
  - Users can create and manage their favorite trips and experiences under a Bucket List feature, allowing them to prioritize future travels.

- **Memories Management** 📝
  - Users can add memories with text, images, and descriptions.
  - Functionality for commenting and liking memories is included to enhance user interaction.

- **Tags and Categories** 🏷️
  - Users can tag and categorize their memories for easy organization and retrieval, making it simpler to search for specific experiences.

- **Trip Journals** 📖
  - Users can create trip journals to document their trips.
  - Multiple contributors can be invited to add entries, enriching the journal with various perspectives.
  - Users can generate AI-generated stories based on the trip journal title and description.

- **Friend Workflow** 👥
  - Users can create a friend list and accept friend requests from others.
  - Friends can be added as contributors to trip journals, facilitating collaboration on shared travel experiences.

## Project Status 🚧
- The backend development is currently completed, including user authentication, time capsule creation, memories management, bucket list management, trip journals, and AI-generated stories.
- The frontend development has not yet started.

## Technologies Used 💻
- **Database:** MongoDB for data storage.
- **Frameworks:** Express.js for building the server.
- **Frontend:** React.js (planned for future implementation).
- **Image Storage:** Cloudinary for storing images uploaded by users.
- **File Uploads:** Multer for handling file uploads in multipart/form-data.
- **Authentication:** JSON Web Tokens (JWT) for access and refresh tokens.
- **Email Service:** Nodemailer for sending emails, such as password reset links.
- **Task Scheduling:** Node-Cron for scheduling automatic unlocking of time capsules.
- **AI Integration:** Hugging Face API for generating AI-generated trip stories based on journal entries.
- **Others:** 
  - bcryptjs for hashing passwords.
  - cookie-parser for parsing cookies.
  - cors for enabling Cross-Origin Resource Sharing.
  - dotenv for environment variable management.
  - morgan for logging HTTP requests.
  - mongoose for MongoDB object modeling.

## Future Work 🔮
- Implement frontend development using React.js.
- Enhance user experience with additional features and improvements.
- Continue to refine and expand existing features based on user feedback.
