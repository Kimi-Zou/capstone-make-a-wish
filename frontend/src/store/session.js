import { csrfFetch } from './csrf.js';

// -------------------- Action Types --------------------
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// -------------------- POJO Actions ---------------------
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const removeUser = () => ({
  type: REMOVE_USER
});

// -------------------- Thunk Actions --------------------
export const login = ({ credential, password }) => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  dispatch(setUser(res.data.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, birthday } = user;
  const res = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      birthday
    })
  });

  dispatch(setUser(res.data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const res = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return res;
};

// -------------------- States ----------------------
const initialState = { user: null };

// -------------------- Reducer ----------------------
function sessionReducer (state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state, { user: action.payload });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
