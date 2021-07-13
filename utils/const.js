const settingCors = {
  origin: [
    'http://localhost:3000',
    'http://khrompus-diploma-api.nomoredomains.club',
    'http://khrompus-diploma-frontend.nomoredomains.club',
    'https://localhost:3000',
    'https://khrompus-diploma-api.nomoredomains.club',
    'https://khrompus-diploma-frontend.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  settingCors,
};
