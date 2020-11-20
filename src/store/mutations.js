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

export const SAVE_EVENT = (state, payload) => {
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


