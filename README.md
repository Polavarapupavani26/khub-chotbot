# Flask Chat Application with Google Gemini AI

A simple Flask web application that provides a chat interface powered by Google's Gemini AI.

## Features

- Real-time chat with Google Gemini AI
- Chat history persistence
- Multiple chat sessions
- Modern web interface
- Session management

## Setup Instructions

### 1. Install Dependencies

bash
pip install -r requirements.txt


### 2. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 3. Configure Environment Variables

Edit the .env file and replace the placeholder with your actual API key:

env
GOOGLE_API_KEY=your_actual_api_key_here
FLASK_SECRET_KEY=your_secret_key_here


### 4. Run the Application

bash
python app.py


The application will be available at http://localhost:5000

## Project Structure


khub-task/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables (create this)
├── chat_history.json     # Chat history storage
├── static/               # Static files (CSS, JS)
└── templates/            # HTML templates


## Usage

1. Open your browser and go to http://localhost:5000
2. Start typing messages in the chat interface
3. The AI will respond using Google's Gemini model
4. Your chat history will be automatically saved

## API Endpoints

- GET / - Main chat interface
- POST /chat - Send a message to the AI
- POST /new_chat - Start a new chat session
- GET /get_chat_history_summary - Get list of chat sessions
- GET /get_chat_session/<chat_id> - Load a specific chat session
- DELETE /delete_chat_session/<chat_id> - Delete a chat session

## Troubleshooting

- *"GOOGLE_API_KEY not set"*: Make sure you've added your API key to the .env file
- *"Error connecting to AI"*: Check your internet connection and API key validity
- *Import errors*: Run pip install -r requirements.txt to install dependencies
