window.onload = () => {
  fillCharts()
}

const selector = {
  chart: '.skills-item__chart',
  round: '.skills-item__round'
}
const attr = {
  radius: 'r',
  percent: 'percent'
}
const strokeParams = {
  a: 0,
  b: '999'
}

/**
 * Fill charts 'stroke-asharray' attribute by it's percentage
 * @returns void
 */
function fillCharts() {
  const chartList = document.querySelectorAll(selector.chart)
  chartList.forEach((element) => {
    calculateStrokePercent(element)
    setStrokeDasharray(element)
  })
}

/**
 * @param {object} svgContainer 
 * @returns void
 */
function calculateStrokePercent(svgContainer) {
  const round = svgContainer.querySelector(selector.round)
  const radius = round.getAttribute(attr.radius)
  const percent = svgContainer.getAttribute(attr.percent)
  const circum = 2 * radius * Math.PI
  strokeParams.a = percent * circum / 100;
}
/**
 * @param {object} svgContainer
 * @returns void
 */
function setStrokeDasharray(svgContainer) {
  const round = svgContainer.querySelector(selector.round)
  round.style.strokeDasharray = `${strokeParams.a} ${strokeParams.b}`
}