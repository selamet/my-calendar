import {setYearDaysCount} from "../set_values";


export const addDayOtherMonth = (state, payload) => {
  let start = new Date(payload.year, payload.month, 0);
  let calenderData = state.calenderData;
  calenderData.addDiv.start = start.getDay();
  calenderData.addDiv.end = 42 - (calenderData.yearDaysCount[payload.month] + start.getDay());
};



export const EVENT_CREATE = (state, payload) => {
  state.events.push(payload);
};

export const SET_TOKEN = (state, token) => {
  state.auths.token = token;
}

export const CLEAR_TOKEN = (state) => {
  state.auths.token = "";
}

export const GET_EVENTS = (state, payload) => {
  state.events = payload;
}


