import axios from "axios"
import {router} from "../router"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const initAuth = ({commit, dispatch}) => {
  let token = localStorage.getItem('token');
  if (token) {

    let expirationDate = localStorage.getItem("expirationDate");
    let time = new Date().getTime();

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

export const saveEvent = ({state, commit}, payload) => {
  commit('SAVE_EVENT', payload)

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
    debugger;
    commit('SET_TOKEN', response.data.idToken);
    localStorage.setItem("token", response.data.idToken);
    //localStorage.setItem("expirationDate", new Date().getTime() + +response.data.expiresIn * 1000);
    localStorage.setItem("expirationDate", new Date().getTime() + 5000);
    //dispatch('setTimeoutTimer', +response.data.expiresIn);
    dispatch('setTimeoutTimer', 5000);
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
    debugger;
    commit('SET_TOKEN', response.data.idToken);
    localStorage.setItem("token", response.data.idToken);
    //localStorage.setItem("expirationDate", new Date().getTime() + +response.data.expiresIn * 1000);
    localStorage.setItem("expirationDate", new Date().getTime() + 5000);
    //dispatch('setTimeoutTimer', +response.data.expiresIn);
    dispatch('setTimeoutTimer', 5000);
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

