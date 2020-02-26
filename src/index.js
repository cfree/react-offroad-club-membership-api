require('dotenv').config({ path: 'variables.env' });
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

// Daily Automation:::

// Automatically change Active Guest status to Limited if 3 runs attended
//   and send email

// Automatically change Active Full Member status to Past Due
//   if no dues received after 1/1 of each year
//   and send email

// Automatically change Past Due Full Member status to Delinquent
//   if no dues received after 3/31 of each year
//   and send email

// Automatically change Delinquent Full Member status to Inactive
//   if no dues received in the last year
//   and send email

// Transactional Emails: 
// - Event Reminders (if RSVP yes, 1 day in advance)
// - Post run: Run Report
// - Post run Review/Photos


// Decode the JWT to get user ID on each request
server.express.use(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
  }

  next();
});

// See info about the user if logged in
server.express.use(async (req, res, next) => {
  if (!req.userId) {
    return next();
  }
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, role, accountType, accountStatus, email, firstName, username }'
  );

  req.user = user;

  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  details => {
    console.log(`Server is now running on http://localhost:${details.port}`);
  }
);
