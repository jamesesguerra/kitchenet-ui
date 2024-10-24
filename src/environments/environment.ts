export const environment = {
  production: false,
  auth0: {
    domain: 'dev-qz3wlm2o81hgtfzp.us.auth0.com',
    clientId: '8y0CzWN4MoP7BAmqPrnvm8teIjQOUpwW',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200/callback',
    },
    errorPath: '/callback',
  },
};
