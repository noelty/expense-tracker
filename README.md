# Expense Tracker

A full-stack web application designed to help you capture and track your expenses seamlessly. It allows you to manually input expense details or capture receipts using your device's camera.

## Features

- **Expense Entry:** Capture expense name, type, and amount.
- **Categorization:** Built-in categories like Food & Dining, Transportation, Shopping, Entertainment, etc.
- **Receipt Capture:** Upload or take photos of receipts directly from the app.
- **AI Integration (WIP):** Backend integration with Google Gemini AI for smart receipt processing.

## Tech Stack

### Frontend
- **React (Vite)**: Fast, modern frontend framework.
- **CSS**: Custom styling for a clean, responsive UI.

### Backend
- **Node.js & Express**: API server handling expense submissions.
- **Multer**: Middleware for handling multipart/form-data (image uploads).
- **Google GenAI API**: Used for AI capabilities.
- **Cors**: Cross-origin resource sharing support.

## Project Structure

```text
├── backend/              # Express API server
│   ├── app.js            # Main application entry point
│   ├── llm.js            # Google GenAI integration (WIP)
│   ├── package.json      # Backend dependencies
│   └── uploads/          # Directory for storing receipt images
└── frontend/             # React Front-end
    ├── src/
    │   ├── App.jsx       # Main expense capture component
    │   ├── App.css       # Styles for the app
    │   └── main.jsx      # React entry point
    ├── index.html        # HTML template
    ├── vite.config.js    # Vite configuration
    └── package.json      # Frontend dependencies
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- A Google Gemini API key if you plan to use the AI features.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your Gemini API key (if applicable):
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the backend server:
   ```bash
   node app.js
   ```
   The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173` (or as specified by Vite).

## Usage

1. Open the frontend URL in your browser or mobile device.
2. Fill in the expense details (Name, Type, Amount).
3. (Optional) Click "Capture Receipt" to upload an image or take a photo.
4. Click "Save Expense" to submit the data to the backend.

## License

ISC License
