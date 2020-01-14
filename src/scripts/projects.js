import Vue from 'vue'
import db from '../../db-temp.json'

const start = 0
const end = 1

const App = new Vue({
  el: '#projects-app',
  data() {
    return {
      projectList: db.projectList,
      project: db.projectList[0],
      track: {
        itemClass: 'projects-slider__item',
        itemClassActive: 'projects-slider__item_active',
        maxLength: 4,
        projectList: []
      },
      trackActivePosition: 0,
      trackRange: [0, 0]
    }
  },
  mounted() {
    this.setTrackRange([0, this.track.maxLength])
    this.setTrackProjectList()
  },
  watch: {
    trackActivePosition(newValue) {
      this.project = this.projectList[newValue]
    }
  },
  methods: {
    /**
     * @param {array} range 
     * @returns void
     */
    setTrackRange(range) {
      this.trackRange = range
    },
    /**
     * @returns void
     */
    setTrackProjectList() {
      this.track.projectList = this.projectList.slice(
        this.trackRange[start], this.trackRange[end]
      )
    },
    /**
     * @param {number} itemId
     * @returns void
     */
    setProject(itemId) {
      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectList[i].id !== itemId) { continue }
        this.trackActivePosition = i
        break
      }
    },
    /**
     * @returns void
     */
    next() {
      this.shiftActivePositionForvard()
      if (this.needShiftRangeForvard()) {
        this.shiftTrackRangeForvard()
      }
      if (this.needShiftRangeToStart()) { 
        this.shiftTrackRangeToStart()
      }
      this.setTrackProjectList()
    },
    /**
     * @returns void
     */
    prev() {
      this.shiftActivePositionBack()
      if (this.needShiftRangeBack()) {
        this.shiftTrackRangeBack()
      }
      if (this.needShiftRangeToEnd()) {
        this.shiftTrackRangeToEnd()
      }
      this.setTrackProjectList()
    },
    /**
     * @returns void
     */
    shiftActivePositionForvard() {
      if (this.needSetActivePositionToStart()) {
        this.trackActivePosition = 0
      } else {
        this.trackActivePosition++
      }
    },
    /**
     * @returns void
     */
    shiftActivePositionBack() {
      if (this.needSetActivePositionToEnd()) {
        this.trackActivePosition = this.projectList.length - 1
      } else {
        this.trackActivePosition--
      }
    },
    /**
     * @returns void
     */
    shiftTrackRangeForvard() {
      this.trackRange[start]++
      this.trackRange[end]++
    },
    /**
     * @returns void
     */
    shiftTrackRangeToStart() {
      this.trackRange[start] = this.trackActivePosition
      this.trackRange[end] = this.trackActivePosition + this.track.maxLength
    },
    /**
     * @returns void
     */
    shiftTrackRangeBack() {
      this.trackRange[start]--
      this.trackRange[end]--
    },
    /**
     * @returns void
     */
    shiftTrackRangeToEnd() {
      this.trackRange[start] = this.trackActivePosition + 1 - this.track.maxLength
      this.trackRange[end] = this.trackActivePosition + 1
    },
    /**
     * @returns {boolean}
     */
    needShiftRangeForvard() {
      return this.trackActivePosition + 1 > this.trackRange[end]
    },
    /**
     * @returns {boolean}
     */
    needShiftRangeBack() {
      return this.trackActivePosition < this.trackRange[start]
    },
    /**
     * @returns {boolean}
     */
    needShiftRangeToEnd() {
      return this.trackActivePosition + 1 > this.trackRange[end]
    },
    /**
     * @returns {boolean}
     */
    needShiftRangeToStart() {
      return this.trackActivePosition < this.trackRange[start]
    },
    /**
     * @returns {boolean}
     */
    needSetActivePositionToStart() {
      return this.trackActivePosition + 1 > this.projectList.length - 1
    },
    /**
     * @returns {boolean}
     */
    needSetActivePositionToEnd() {
      return this.trackActivePosition - 1 < 0
    }
  }
})