# Event Ticketing System API

A Node.js REST API for managing event registrations and ticket bookings.

##  Deployed Link


##  Features
- **Auth:** JWT-based registration and login.
- **Roles:** User and Admin permissions.
- **Events:** CRUD operations (Admin only) and public viewing/filtering.
- **Bookings:** Real-time seat availability validation.

##  Local Setup
1. Clone the repo: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`.
4. Start the server: `npm run dev`

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Events
- `GET /api/events` - Get all events (Filters: `category`, `date`)
- `GET /api/events/:id` - Get single event details
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Bookings
- `POST /api/bookings` - Book a ticket (User)
- `GET /api/bookings` - View my bookings (User)