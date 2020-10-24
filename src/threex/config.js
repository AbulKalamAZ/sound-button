var THREE = require('three') // require peer dependency
var initializeDomEvents = require('threex.domevents')
var THREEx = {}

console.log(initializeDomEvents)
initializeDomEvents(THREE, THREEx)

export default THREEx;