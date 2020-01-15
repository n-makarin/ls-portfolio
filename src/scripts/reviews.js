import Vue from 'vue'
import db from '../../db-temp.json'

const start = 0
const end = 1

const App = new Vue({
  el: '#reviews-app',
  data() {
    return {
      reviewList: db.reviewList,
      reviewNumberOnSlide: 2,
      trackReviewList: [],
      trackRange: []
    }
  },
  mounted() {
    this.setTrackRange([0, this.reviewNumberOnSlide])
    this.setTrackReviewList()
  },
  methods: {
    setTrackRange(range) {
      this.trackRange = range
    },
    setTrackReviewList() {
      this.trackReviewList = this.reviewList.slice(
        this.trackRange[start], this.trackRange[end]
      )
    }
  }
})