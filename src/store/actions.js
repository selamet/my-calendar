import axios from "axios"
import {router} from "../router"

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers = {'Content-Type': 'application/json',}

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

export const callEvents = ({commit, dispatch, state}, params) => {
  let link =  "/event"
  if (params) {
    link += `/?from=${params.from}&to=${params.to}`;
  }
  let config = {
    headers: {
      'Authorization': `Bearer ${state.auths.token}`
    }
  }

  return axios.get(
    link, config
  ).then(response => {
    commit('GET_EVENTS', response.data);
  })

}
export const createEvent = ({state, commit}, payload) => {
  let config = {
    headers: {
      'Authorization': `Bearer ${state.auths.token}`
    }
  }
  return axios.post(
    "/event/", payload, config
  ).then(response => {
    commit('EVENT_CREATE', response.data)

  })
}
export const updateEvent = ({state, commit}, payload) => {
  let config = {
    headers: {
      'Authorization': `Bearer ${state.auths.token}`
    }
  }
  return axios.patch(
    `/event/${payload.uuid}`, payload, config
  ).then(response => {
    commit('EVENT_UPDATE', response.data)
  })
}
export const destroyEvent = ({state, commit}, payload) => {
  let config = {
    headers: {
      'Authorization': `Bearer ${state.auths.token}`
    }
  }
  return axios.delete(
    `/event/${payload}`, config
  ).then( _  => {
    commit('EVENT_DESTROY', payload)
  })
}

export const login = ({commit, dispatch, state}, authData) => {
  let data = {
    username: authData.email,
    password: authData.password
  }
  return axios.post(
    "/user/token/",
    data,
  ).then(response => {
    commit('SET_TOKEN', response.data.access);
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("expirationDate", new Date().getTime() + 86400000);
    dispatch('setTimeoutTimer', 86400000);
  })

}
export const register = ({commit, dispatch, state}, authData) => {
  let data ={
    email: authData.email,
    password: authData.password
  }


  return axios.post(
    "/user/register/",data
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

