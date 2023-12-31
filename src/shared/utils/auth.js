const setTokens = (loginPayload) => {
  localStorage.setItem('CLIENT', loginPayload.client);
  localStorage.setItem('UID', loginPayload.uid);
  localStorage.setItem('ACCESS-TOKEN', loginPayload.accessToken);
  localStorage.setItem('isAuthenticated', true);
};

const removeTokens = () => {
  localStorage.removeItem('CLIENT');
  localStorage.removeItem('UID');
  localStorage.removeItem('ACCESS-TOKEN');
  localStorage.removeItem('isAuthenticated');
};

const getTokens = () => {
  const CLIENT = localStorage.getItem('CLIENT');
  const UID = localStorage.getItem('UID');
  const ACCESS_TOKEN = localStorage.getItem('ACCESS-TOKEN');

  return {
    uid: UID,
    client: CLIENT,
    accessToken: ACCESS_TOKEN,
  };
};

const isAuthenticated = () => Boolean(localStorage.getItem('isAuthenticated'));

export default {
  setTokens,
  removeTokens,
  getTokens,
  isAuthenticated,
};
