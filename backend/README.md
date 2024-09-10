# bench-notifications
The Notifications Service is responsible for managing the creation, storage, and delivery of notifications within the Bench AI system. This service will allow other services and modules to send notifications to users, ensuring they are informed of important events, updates, or actions required on their part.

#### **Overview:**
The Notifications Service is responsible for managing the creation, storage, and delivery of notifications within the Bench AI system. This service will allow other services and modules to send notifications to users, ensuring they are informed of important events, updates, or actions required on their part.

The service will be built using FastAPI, with PostgreSQL as the database, and will follow the microservices architecture. The service will include basic CRUD operations, integration with the database, and will be designed to be scalable and easy to maintain.

---

### **Detailed Task List for Vaibhav**

#### **1. Initial Setup**
   - **Task 1.1:** **Project Initialization**
     - Create a new directory structure for the Notifications Service.
     - Add remote to the https://github.com/Gem-AI-Studio/bench-notifications/ 
     - Create a virtual environment and set up basic project dependencies.
     - Install FastAPI, Uvicorn, SQLAlchemy, and other essential packages.
   - **Task 1.2:** **Basic FastAPI Application Setup**
     - Create the main FastAPI application file (`main.py`).
     - Set up the project structure, including folders for `app`, `models`, `schemas`, `routes`, `utils`, and `tests`.
     - Set up a basic FastAPI server with a single health check route (`/health`).

#### **2. Database Integration**
>Warning: Think critically about model parameters types.
   - **Task 2.1:** **Database Configuration**
     - Set up a PostgreSQL database locally
     - Create a configuration file to handle database connection settings using SQLAlchemy.
   - **Task 2.2:** **Define Database Models**
     - Create a `Notification` model in `models.py` representing the notifications table.
     - The `Notification` model should include fields such as `id`, `from_service` (name of the function the notification was created from) , `user_id`, `title`, `message`, `created_at`, `read`, `read_at` and `notification_type`.
   - **Task 2.3:** **Database Migrations**
     - Set up Alembic for managing database migrations.
     - Create the initial migration script to generate the `notifications` tables.
     - Apply the migration to create the table in the PostgreSQL database.

#### **3. API Development**
>Warning: Think critically about database operations, is it necessary to create ReadLogs for notifications that are too old?
   - **Task 3.1:** **Create Pydantic Schemas**
     - Define Pydantic schemas (`NotificationCreate`, `NotificationReadLogCreate`, `NotificationUpdate`) to validate request and response data.
   - **Task 3.2:** **CRUD Operations - API Endpoints**
     - **Create:** Implement an endpoint to create new notifications (`POST /notifications`). This should accept data validated by the `NotificationCreate` schema.
     - **Read:** Implement an endpoint to retrieve notifications (`GET /notifications`). Allow filtering by `user_id` and pagination.
     - **Update:** Implement an endpoint to update a notification's `read_status` (`PUT /notifications/{id}`). Use the `NotificationUpdate` schema for validation.
     - **Delete:** Implement an endpoint to delete a notification (`DELETE /notifications/{id}`).

#### **4. Utility Functions**
   - **Task 4.1:** **Database Utilities**
     - Create utility functions for common database operations, such as connecting to the database, committing transactions, and handling session context.
   - **Task 4.2:** **Notification Delivery**
     - Develop a utility function to simulate notification delivery (e.g., logging or printing to the console). This function can be extended later to include real delivery mechanisms like email or push notifications.

#### **5. Testing**
   - **Task 5.1:** **Set Up Testing Framework**
     - Set up pytest for testing the application.
     - Write unit tests for the database models to ensure they behave as expected.
   - **Task 5.2:** **Test API Endpoints**
     - Write tests for each API endpoint, ensuring they handle various cases (e.g., creating a valid notification, handling missing fields, retrieving notifications, etc.).
   - **Task 5.3:** **Database Test Setup**
     - Configure a separate testing database.
     - Use fixtures to set up and tear down database states for tests.

#### **6. Documentation**
   - **Task 6.1:** **API Documentation with Swagger/OpenAPI**
     - Ensure that all API endpoints are well-documented using FastAPI’s automatic generation of Swagger documentation.
   - **Task 6.2:** **README File**
     - Write a README file detailing the setup instructions, how to run the service, and how to run tests.
       
---
>Warning ### NOT FOR NOW
#### **7. Advanced Features (Optional)**
   - **Task 7.1:** **Notification Types and Templates**
     - Implement support for different types of notifications (e.g., email, SMS, in-app) using templates.
   - **Task 7.2:** **Asynchronous Delivery**
     - Modify the service to send notifications asynchronously using Celery and Redis.
   - **Task 7.3:** **WebSocket Integration**
     - Add support for real-time notifications using WebSockets to push updates to connected clients.

#### **8. Deployment Preparation**
   - **Task 8.1:** **Dockerize the Service**
     - Write a `Dockerfile` to containerize the service.
     - Create a `docker-compose.yml` file to manage the service’s deployment with its database.
   - **Task 8.2:** **CI/CD Integration**
     - Set up a CI/CD pipeline using GitHub Actions or Jenkins to automatically test and deploy the service.
---

### **Deliverables:**
- A fully functional Notifications Service that can be integrated into the Bench AI platform.
- Complete codebase in a Git repository.
- Proper documentation for understanding and running the service.
- A set of tests ensuring the service works correctly and is maintainable.

This project should provide Vaibhav with a comprehensive introduction to FastAPI, database integration, API development, and essential software engineering practices.
