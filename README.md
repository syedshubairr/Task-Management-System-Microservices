# Task Management System (Microservices)

## Overview

The **Task Management System** is a microservices-based application designed to streamline task creation, submission, and management. Built using **Java 17** for the backend microservices and **ReactJS** for the frontend, this project leverages a modern architecture with service discovery and API gateway patterns to ensure scalability and maintainability.

### Key Features
- **User Features**:
    - Submit tasks with deadlines.
    - View submitted tasks along with their deadlines.
- **Admin Features**:
    - Create tasks for users.
    - Edit existing tasks.
    - Accept or decline task submissions.
- **Architecture**:
    - Utilizes **Eureka Server** for service discovery.
    - Implements a **Gateway Server** as a unified endpoint for all microservices.

## Project Structure

The repository is organized into the following microservices and components:

- **Eureka-Server**: Service discovery server for registering and managing microservices.
- **TMS-Gateway**: API Gateway for routing requests to appropriate microservices.
- **Task-Service**: Handles task creation, editing, and management.
- **Submission-Service**: Manages task submissions by users.
- **User-Service**: Manages user-related operations.
- **TMS-Frontend**: The ReactJS frontend for user and admin interaction.
- **.idea**: IntelliJ IDEA configuration for running Java microservices.
- **.gitignore**: Git ignore file for excluding unnecessary files.

## Technologies Used

- **Backend**: Java 17, Spring Boot (Microservices)
- **Frontend**: ReactJS
- **Service Discovery**: Eureka Server
- **API Gateway**: Spring Cloud Gateway
- **IDE**: IntelliJ IDEA (for backend development)
- **Package Manager**: npm (for frontend)

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Java 17**: For running the backend microservices.
- **Node.js and npm**: For running the ReactJS frontend.
- **IntelliJ IDEA**: For running the Java microservices with pre-configured settings.
- **Git**: To clone the repository.

## Setup Instructions

### 1. Clone the Repository
Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/<your-username>/Task-Management-System-Microservices.git
cd Task-Management-System-Microservices
```
## Setup Instructions

### 2. Backend Microservices Setup

The backend microservices are pre-configured in the `.idea` folder for IntelliJ IDEA.

#### Steps:
1. Open the project in **IntelliJ IDEA**.
2. Ensure that Java 17 is set as the SDK for the project.
3. The microservices (Eureka-Server, TMS-Gateway, Task-Service, Submission-Service, User-Service) are already configured with run configurations.
4. Start the microservices in the following order:
    - **Eureka-Server**: Run first to enable service discovery.
    - **TMS-Gateway**: Run second to set up the API gateway.
    - **Task-Service**, **Submission-Service**, **User-Service**: Run these in any order after the above two.
5. To run each microservice, simply click the **Run** button next to its configuration in IntelliJ IDEA.

Each microservice will register itself with the Eureka Server, and the Gateway will route requests to the appropriate service.

### 3. Frontend Setup

The frontend is built with ReactJS and is located in the `TMS-Frontend` directory.

#### Steps:
1. Navigate to the frontend directory:
   ```bash
   cd TMS-Frontend
   ```
2. Install the required dependencies:
    ```bash
   npm install
   ```
3. Start the React development server:
    ```bash
   npm run dev
   ```
4. The frontend will be accessible at http://localhost:5173

## Future Improvements
- **Authentication**: Add user authentication with JWT or OAuth2.
- **Testing**: Add unit and integration tests for microservices.
- **Deployment**: Deploy the application using Docker and Kubernetes for better scalability.