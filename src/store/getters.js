export const getCalenderData = (state) => {
  return state.calenderData
};

export const getSelectedDate = (state) => {
  return state.calenderData.selectedDate
};

export const getEvents = (state) => {
  return state.events
};

export const isAuthenticated = (state) => {
  return state.auths.token !== ""

}

