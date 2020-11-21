import axios from "axios"
import {router} from "../router"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const initAuth = ({commit, dispatch}) => {
  let token = localStorage.getItem('token');
  if (token) {

    let expirationDate = localStorage.getItem("expirationDate");
    let time = new Date().getTime();
    console.log('time:', time, ' expirationDate: ', expirationDate);

    if (time > +expirationDate) {
      console.log('Token süresi geçmiş');
      dispatch('logout');
    } else {
      commit("SET_TOKEN", token);
      let timerSecond = +expirationDate - time
      dispatch('setTimeoutTimer', timerSecond);
      router.push('/');
    }

  } else {
    router.push('/login');
    return false
  }
}

export const createEvent = ({state, commit}, payload) => {
  let link = "http://localhost:8000/api/event/"
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.auths.token}`
    }
  }
  let data = payload;
  let date = data.date.getFullYear() + '-' + data.date.getMonth() + '-' + data.date.getDate() + ' ' + data.date.getHours() + ':' + data.date.getMinutes();
  data.date = date;
  data.flag = data.flag[0] ? data.flag[0] : 0;
  return axios.post(
    link, data, config
  ).then(response => {
    commit('EVENT_CREATE', response.data)

  })
}


export const login = ({commit, dispatch, state}, authData) => {
  let loginLink = "http://localhost:8000/api/user/token/"
  let config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return axios.post(
    loginLink,
    {username: authData.email, password: authData.password}, config
  ).then(response => {
    commit('SET_TOKEN', response.data.access);
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("expirationDate", new Date().getTime() + 86400000);
    dispatch('setTimeoutTimer', 86400000);
  })

}

export const register = ({commit, dispatch, state}, authData) => {
  let registerLink = "http://localhost:8000/api/user/register/"
  let config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  return axios.post(
    registerLink,
    {email: authData.email, password: authData.password}, config
  ).then(response => {
    commit('SET_TOKEN', response.data.access);
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("expirationDate", new Date().getTime() + 86400000);
    dispatch('setTimeoutTimer', 86400000);
  })

}

export const logout = ({commit}) => {
  commit('CLEAR_TOKEN');
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  router.push("login");

}

export const setTimeoutTimer = ({dispatch}, expiresIn) => {
  setTimeout(() => {
    dispatch("logout");
  }, expiresIn)
}


export const callEvents = ({commit, dispatch, state}, authData) => {
  let link = "http://localhost:8000/api/event"
  let config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${state.auths.token}`
    }
  }

  return axios.get(
    link, config
  ).then(response => {
    commit('GET_EVENTS', response.data);
  })

}

