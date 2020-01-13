import Vue from 'vue'
import db from '../../db-temp.json'

const App = new Vue({
  el: '#projects-app',
  data() {
    return {
      projectList: db.projectList,
      project: db.projectList[0],
      slider: {
        trackMaxLength: 4
      },
      trackItemClass: 'projects-slider__item',
      trackItemClassAcrive: 'projects-slider__item_active',
    }
  },
  methods: {
    setProject(itemId) {
      this.projectList.forEach(element => {
        if (element.id !== itemId) { return }
        this.project = element
      });
    },
    /**
     * Change project in slider to next item
     * @returns void
     */
    next() {
      let index = 0
      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectList[i].id !== this.project.id) { continue }
        if (i < this.projectList.length - 1) {
          index = i + 1
        }
        this.project = this.projectList[index]
        break
      }
    },
    /**
     * Change project in slider to prev item
     * @returns void
     */
    prev() {
      let index = this.projectList.length - 1
      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectList[i].id !== this.project.id) { continue }
        if (i !== 0) {
          index = i - 1
        }
        this.project = this.projectList[index]
        break
      }
    }
  }
})