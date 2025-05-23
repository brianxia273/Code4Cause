# **StudySession**

_Last Updated:4/5/25_

## **Overview**
StudySession is a web-based application designed to help users eliminate hidden distractions from their educational experience. The platform allows users to focus through adaptive applications for study needs, from study music to research queries and break sessions. 

The application integrates **React and Express through NextJS** to provide a seamless and insightful user experience.


---

## **Tech Stack**
StudySession is built with a modern **full-stack architecture**, leveraging **React and Express** to deliver a robust and scalable platform.

### **Frontend**
- **Framework:** React with TypeScript
- **State Management:** React hooks, Context API
- **UI Library:** ShadCN/UI (based on Radix UI) for components
- **Networking:** TanStack React Query for efficient data fetching and caching
- **Markdown Rendering:** `react-markdown` with `remark-gfm` for AI responses
- **Styling:** Tailwind CSS
- **Routing:** React Router

### **Backend**
- **Framework:** ExpressJS


---

## **Core Features**
### **1. __________**
---

## **How It Works**
1. 

---

## **Why _______?**
- 

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
uv venv
source .venv/bin/activate  # On Windows: .\venv\Scripts\activate
uv pip install -r pyproject.toml
python manage.py migrate
python manage.py runserver
```

# **API Specification**

---

## **User Authentication & Management**

### **1. Register User**
**POST /api/users/register/**  
Registers a new user.

#### **Authentication:** Not required  
#### **Request Body (JSON)**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "SecurePassword123"
}
```
#### **Response (201 Created)**
```json
{
  "message": "User registered successfully.",
  "user": {
    "id": 1,
    "username": "newuser",
    "email": "newuser@example.com"
  },
  "token": "abc123token"
}
```
#### **Possible Errors**
- **400 Bad Request**: Invalid data format or missing fields.
- **409 Conflict**: Email or username already exists.

---

### **2. Login User**
**POST /api/users/login/**  
Logs in an existing user.

#### **Authentication:** Not required  
#### **Request Body (JSON)**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePassword123"
}
```
#### **Response (200 OK)**
```json
{
  "message": "Login successful.",
  "user": {
    "id": 1,
    "username": "newuser",
    "email": "newuser@example.com"
  },
  "token": "abc123token"
}
```
#### **Possible Errors**
- **400 Bad Request**: Invalid email or password.

---

### **3. Logout User**
**POST /api/users/logout/**  
Logs out the authenticated user.

#### **Authentication:** Required (Token)
#### **Response (200 OK)**
```json
{
  "message": "Logout successful."
}
```
#### **Possible Errors**
- **401 Unauthorized**: User not authenticated.

---

### **4. Get User Profile**
**GET /api/users/profile/**  
Retrieves the authenticated user's profile.

#### **Authentication:** Required (Token)
#### **Response (200 OK)**
```json
{
  "id": 1,
  "username": "newuser",
  "email": "newuser@example.com"
}
```
#### **Possible Errors**
- **401 Unauthorized**: User not authenticated.

---

### **5. Update User Profile**
**PATCH /api/users/profile/**  
Updates the authenticated user's profile.

#### **Authentication:** Required (Token)
#### **Request Body (JSON)**
```json
{
  "username": "updatedUser"
}
```
#### **Response (200 OK)**
```json
{
  "id": 1,
  "username": "updatedUser",
  "email": "newuser@example.com"
}
```
#### **Possible Errors**
- **400 Bad Request**: Invalid fields.
- **401 Unauthorized**: User not authenticated.

---

### **6. Change Password**
**POST /api/users/change-password/**  
Allows an authenticated user to change their password.

#### **Authentication:** Required (Token)
#### **Request Body (JSON)**
```json
{
  "old_password": "SecurePassword123",
  "new_password": "NewSecurePassword456"
}
```
#### **Response (200 OK)**
```json
{
  "message": "Password updated successfully."
}
```
#### **Possible Errors**
- **400 Bad Request**: Old password is incorrect.
- **401 Unauthorized**: User not authenticated.

---

## **AI Chat & Drink Submission**

### **7. Submit Drink for AI Analysis**
**POST /api/ai/submit-drink/**  
Submits an image of a drink for analysis.

#### **Authentication:** Required (Token)
#### **Request Body (multipart/form-data)**
- `image` (file, required): The drink image.
- `beverage_size_ml` (integer, optional): Size in milliliters.
- `sugar_content_g` (integer, optional): Sugar content in grams.
- `calories_kcal` (integer, optional): Calories.
- `additional_notes` (string, optional): Additional user notes.

#### **Response (200 OK)**
```json
{
    "image_url": "https://r2.lucasdoell.dev/uploads/caffeine_drinks/monster_energy.jpeg",
    "analysis": {
        "raw_response": "```json\n{\n  \"beverage_name\": \"Monster Energy\",\n  \"serving_size\": \"16 fl oz (473ml)\",\n  \"calories\": 200,\n  \"total_fat_g\": 0,\n  \"sodium_mg\": 200,\n  \"total_carbohydrates_g\": 55,\n  \"sugars_g\": 54,\n  \"added_sugars_g\": 54,\n  \"protein_g\": 0,\n  \"caffeine_mg\": 160,\n  \"taurine_mg\": 1000,\n  \"b_vitamins\": {\n    \"vitamin_b3_mg\": 20,\n    \"vitamin_b6_mg\": 2,\n    \"vitamin_b12_mcg\": 6\n  },\n  \"other_ingredients\": {\n    \"carbonated_water\": true,\n    \"natural_flavors\": true,\n    \"sucralose\": false\n  },\n  \"other_notes\": \"Carbonated\"\n}\n```"
    }
}
```
#### **Possible Errors**
- **400 Bad Request**: Image missing or invalid.
- **500 Internal Server Error**: AI processing failure.

---

### **8. AI Chat**
**POST /api/ai/chat/**  
Provides AI-generated responses based on user input and caffeine logs.

#### **Authentication:** Required (Token)
#### **Request Body (JSON)**
```json
{
  "message": "How much caffeine have I consumed today?"
}
```
#### **Response (200 OK)**
```json
{
  "response": "Based on your logs, you have consumed 500mg of caffeine today."
}
```
#### **Possible Errors**
- **400 Bad Request**: Message field missing.
- **500 Internal Server Error**: AI processing failure.

---

## **Caffeine Log Management**

### **9. Create Caffeine Log**
**POST /api/caffeine/logs/**  
Creates a new caffeine log entry.

#### **Authentication:** Required (Token)
#### **Request Body (JSON)**
```json
{
  "beverage_name": "Espresso",
  "caffeine_mg": 75,
  "sugars_g": 0
}
```
#### **Response (201 Created)**
```json
{
  "id": 10,
  "beverage_name": "Espresso",
  "caffeine_mg": 75,
  "sugars_g": 0,
  "created_at": "2025-02-23T12:00:00Z"
}
```
#### **Possible Errors**
- **400 Bad Request**: Missing or invalid fields.

---

### **10. Get All Caffeine Logs**
**GET /api/caffeine/logs/**  
Retrieves all caffeine logs for the authenticated user.

#### **Authentication:** Required (Token)
#### **Response (200 OK)**
```json
[
  {
    "id": 5,
    "beverage_name": "Cappuccino",
    "caffeine_mg": 80,
    "sugars_g": 2,
    "created_at": "2025-02-21T09:30:00Z"
  },
  {
    "id": 6,
    "beverage_name": "Black Coffee",
    "caffeine_mg": 95,
    "sugars_g": 0,
    "created_at": "2025-02-22T07:45:00Z"
  }
]
```
#### **Possible Errors**
- **401 Unauthorized**: User not authenticated.

---

### **11. Get Caffeine Log by ID**
**GET /api/caffeine/logs/{log_id}/**  
Retrieves a single caffeine log entry.

#### **Authentication:** Required (Token)
#### **Response (200 OK)**
```json
{
  "id": 5,
  "beverage_name": "Cappuccino",
  "caffeine_mg": 80,
  "sugars_g": 2,
  "created_at": "2025-02-21T09:30:00Z"
}
```
#### **Possible Errors**
- **404 Not Found**: Log entry not found.

---

### **12. Get Caffeine Over Time**
**GET /api/caffeine/over-time/**  
Retrieves caffeine levels over time.

#### **Authentication:** Required (Token)
#### **Response (200 OK)**
```json
[
  {
    "date": "2025-02-21T09:30:00Z",
    "caffeine_remaining_mg": 40
  },
  {
    "date": "2025-02-22T07:45:00Z",
    "caffeine_remaining_mg": 20
  }
]
```
#### **Possible Errors**
- **401 Unauthorized**: User not authenticated.
- **200 OK (Empty List)**: No caffeine logs found.

---
