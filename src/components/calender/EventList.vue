<template>
  <div class="event-list-parent">
    <div class="header">
      <i @click="goToEventCreate" class="go-back fa fa-plus-circle" aria-hidden="true"></i>

      <span class="text-center">{{ selectedDate.format }}</span>
      <i @click="exitDetail" class=" exit-button fa fa-times-circle"></i>
    </div>

    <div class="filter">
      <div class="title">

      </div>
      <div class="priority">
        <div v-for="tag in tags"
             :class="{'bg-yellow' : tag === 1,'bg-green': tag === 2,'bg-blue' : tag === 3,'bg-red' : tag === 4, 'colors' : filter.choose !== tag ,'colors_select' : filter.choose === tag}"

             @click="selectTag(tag)"
        ></div>
      </div>

    </div>

    <div class="event-list">
      <ul>
        <li v-for="i in events">
          <div><a><p @click="selectEvent(i)" class="title">{{ i.title }}</p>  <span
            class="time">{{ i.date.hour|addZero }}:{{ i.date.minute|addZero }}</span> </a> <i
            @click="destroyEvent(i.uuid)"
            class="delete-icon fa fa-minus"></i>
          </div>
        </li>
      </ul>

    </div>
    <div class="create-event">
      <p style="text-align: center">
        <btn @click="goToEventCreate" class="create-event-button" size="sm">Create</btn>
      </p>
    </div>

  </div>

</template>


<script>

import {mapGetters} from "vuex";
import {Btn, MultiSelect, TimePicker} from 'uiv'
import {getSelectedDate} from "../../store/getters";

export default {
  components: {
    Btn
  },
  data() {
    return {
      events: [],
      tags: [1, 2, 3, 4],
      filter: {
        status: false,
        choose: '',
      },
    }
  },
  methods: {
    goToEventCreate() {
      this.$emit("goToEventCreate", '{true}');
    },
    exitDetail() {
      let detail = document.getElementById("detail");
      detail.style.display = 'none';
      this.$store.state.calenderData.detailStatus = false;
    },
    selectEvent(event) {
      this.$store.commit('SET_SELECTED_EVENT', event);
      this.$emit("goToEventCreate", '{true}');

    },
    destroyEvent(uuid) {
      this.$store.dispatch('destroyEvent', uuid);
      this.$store.commit('EVENT_DESTROY', uuid);
    },
    initFilter() {
      this.filter = {
        status: false,
        choose: '',
      }
    },
    selectTag(tag) {
      if (!this.filter.status) {
        this.filter = {
          status: true,
          choose: tag,
        }
        this.events = this.events.filter(event => +event.flag === tag)
      } else if (this.filter.status && this.filter.choose !== tag) {
        this.getEventList(this.selectedDate);
        this.events = this.events.filter(event => +event.flag === tag)
        this.filter = {
          status: true,
          choose: tag,
        }
      } else {
        this.getEventList(this.selectedDate);
        this.initFilter();
      }
    },
    getEventList(selectedDate) {
      let events = [];
      this.getEvents.forEach(function (i) {
        if (selectedDate.day === i.date.day && selectedDate.month === i.date.month && i.date.year === selectedDate.year) {
          events.push(i);
        }
      });
      this.events = events;
    }
  },
  computed: {
    ...mapGetters({
      selectedDate: 'getSelectedDate',
      getEvents: 'getEvents',
    }),
  },
  watch: {
    '$store.state.calenderData.selectedDate.day': function () {
      this.getEventList(this.selectedDate);
      this.initFilter();
    }
  },
  mounted() {
    this.getEventList(this.selectedDate);
  }


}
</script>


<style scoped>
.event-list-parent {
  width: 400px;
  height: 250px;
}

.header {
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 20fr 1fr;
  color: #222831;
  background-color: #FFCE00;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  font-size: 16px;
  width: 398px;
  border-radius: 5px;
  border-bottom: #313131 1px solid;


}

.header .exit-button {
  justify-content: end;
  cursor: pointer;

}

.header .exit-button:hover {
  color: #646464;

}

.header .go-back {
  justify-content: start;
  margin-left: 4px;
  cursor: pointer;
}

.header .go-back:hover {
  color: #646464;
}

.filter {
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.filter .title {
  margin: 6px 5px;
  font-family: "sans-serif";
  font-size: 14px;

}

.filter .priority {
  margin-right: 5px;
}

.filter .priority .colors {
  height: 14px;
  width: 14px;
  margin: 8px 2px;
  border-radius: 50%;
  grid-auto-flow: column;
  float: right;
  border: 1px solid #313131;
}

.filter .priority .colors_select {
  height: 14px;
  width: 14px;
  margin: 8px 2px;
  border-radius: 50%;
  grid-auto-flow: column;
  float: right;
  border: 2px solid #313131;
  cursor: pointer;
}


.filter .priority .colors:hover {
  border: 2px solid #313131;
  cursor: pointer;

}


.event-list {
  height: 160px;
}

.create-event-button {
  margin-top: 10px;
  width: 150px;
  color: #393e46;
  background-color: #FFCE00;
  border: 1px solid #393e46;

}

.create-event-button:hover {
  background-color: #393e46;
  color: #f7f7f7;
}


.event-list {
  margin: 0px 30px;
}

.event-list ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 150px;
  overflow-y: auto;

}

.event-list li {
  font: 200 16px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;

}

.event-list li div {
  display: flex;
  width: 330px;
}


.event-list li:last-child {
  border: none;
}

.event-list li a {
  text-decoration: none;
  color: #000;
  -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
  -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
  -o-transition: font-size 0.3s ease, background-color 0.3s ease;
  -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
  transition: font-size 0.3s ease, background-color 0.3s ease;
  display: flex;
}


.event-list ul::-webkit-scrollbar {
  display: none;
}

.event-list li a:hover {
  font-size: 20px;
  background: #f6f6f6;
  cursor: pointer;
}

.event-list li div .title {
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 216px;

}

.event-list li div .time {
  width: 50px;
  margin: 0 10px 0 20px;
}

.event-list li div .delete-icon {
  margin: 6px 0 0 30px;
  justify-content: end;
  cursor: pointer;
  color: #000;


}


.bg-red {
  background-color: #f38181;
}

.bg-blue {
  background-color: #00b7c2;
}

.bg-yellow {
  background-color: #fce38a;
}

.bg-green {
  background-color: #519872;
}


</style>
