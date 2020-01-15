import Vue from 'vue'
import db from '../../db-temp.json'

const start = 0
const end = 1
const prev = 'prev'
const next = 'next'

const App = new Vue({
  el: '#reviews-app',
  data() {
    return {
      reviewList: db.reviewList,
      reviewNumberOnSlide: 2,
      trackReviewList: [],
      trackRange: [],
      disabledBtnClass: 'reviews-btn_disabled'
    }
  },
  mounted() {
    this.setTrackRange([0, this.reviewNumberOnSlide])
    this.setTrackReviewList()
    this.setArrowsState()
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
    setTrackReviewList() {
      this.trackReviewList = this.reviewList.slice(
        this.trackRange[start], this.trackRange[end]
      )
    },
    /**
     * @returns void
     */
    setArrowsState() {
      this.disableBtn(prev)
      if (this.canBeIncreased()) { return }
      this.disableBtn(next)
    },
    /**
     * Set to track next items
     * @returns void
     */
    next() {
      if (!this.canBeIncreased()) { return }
      this.enableBothBtn()
      this.increaseRange()
      this.setTrackReviewList()
      if (this.canBeIncreased()) { return }
      this.disableBtn(next)
    },
    /**
     * Set to track prev items
     * @returns void
     */
    prev() {
      if (!this.canBeReduced()) { return }
      this.enableBothBtn()
      this.reduceRange()
      this.setTrackReviewList()
      if (this.canBeReduced()) { return }
      this.disableBtn(prev)
    },
    /**
     * @returns void
     */
    increaseRange() {
      this.trackRange[start] = this.trackRange[start] + this.reviewNumberOnSlide
      this.trackRange[end] = this.trackRange[end] + this.reviewNumberOnSlide
    },
    /**
     * @returns void
     */
    reduceRange() {
      this.trackRange[start] = this.trackRange[start] - this.reviewNumberOnSlide
      this.trackRange[end] = this.trackRange[end] - this.reviewNumberOnSlide
    },
    /**
     * Is range can be increased
     * @returns {boolean}
     */
    canBeIncreased() {
      return this.trackRange[start] + this.reviewNumberOnSlide < this.reviewList.length
    },
    /**
     * Is range can be reduced
     * @returns {boolean}
     */
    canBeReduced() {
      return this.trackRange[start] - this.reviewNumberOnSlide >= 0
    },
    /**
     * @returns void
     */
    enableBothBtn() {
      this.enableBtn(prev)
      this.enableBtn(next)
    },
    /**
     * @param {string} ref Reference name
     * @returns void
     */
    disableBtn(ref) {
      this.$refs[ref].classList.add(this.disabledBtnClass)
    },
    /**
     * @param {string} ref Reference name
     * @returns void
     */
    enableBtn(ref) {
      this.$refs[ref].classList.remove(this.disabledBtnClass)
    }
  }
})