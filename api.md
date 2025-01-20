# ALL POSSIBLE API END-POINTS

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/changePassword

## connectionRequestRouter

- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejectd/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - It gets you profile of all the other users on the platform

Status - ignored,accepted,intrested,rejected

