import Vue from 'vue'
import db from '../../db-temp.json'

const App = new Vue({
  el: '#projects-app',
  data() {
    return {
      projectList: db.projectList,
      project: db.projectList[0]
    }
  }
})