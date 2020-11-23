import {setYearDaysCount} from "../set_values";


export const addDayOtherMonth = (state, payload) => {
  let start = new Date(payload.year, payload.month, 0);
  let calenderData = state.calenderData;
  calenderData.addDiv.start = start.getDay();
  calenderData.addDiv.end = 42 - (calenderData.yearDaysCount[payload.month] + start.getDay());
};


export const goToNextMonth = (state) => {

  let data = state.calenderData;
  data.date.month++;
  if (data.date.month > 11) {
    data.date.month = 0;
    data.date.year++;
    data.yearDaysCount = setYearDaysCount(data.date.year);

  }
  let params_from = data.date.year + '-' + data.date.month + '-' + data.date.day;
  let params_to = data.date.year + '-' + data.date.month + '-' + data.yearDaysCount[data.date.month]
  let payload = {'from': params_from, 'to': params_to}

  this.addDayOtherMonth(state, {year: data.date.year, month: data.date.month});
};

export const goToPrevMonth = (state) => {
  let data = state.calenderData;
  data.date.month--;
  if (data.date.month < 0) {
    data.date.month = 11;
    data.date.year--;
    data.yearDaysCount = setYearDaysCount(data.date.year);
  }
  this.addDayOtherMonth(state, {year: data.date.year, month: data.date.month});
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


