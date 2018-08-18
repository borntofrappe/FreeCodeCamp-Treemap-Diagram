// select the container in which to include the data visualization and begin by appending a title and a description
const container = d3.select("div.container");

container
  .append("h1")
  .attr("id", "title")
  .text("Movie Sales");

container
  .append("h3")
  .attr("id", "description")
  .text("Highest Grossing Movies, by Genre");

// include a div for the tooltip
// text is included in the two paragraphs appended to the container
const tooltip = container
  .append("div")
  .attr("id", "tooltip");

// for the SVG, define an object with the margins, used to nest the SVG content safe inside the SVG boundaries
// as there is no need for axis, the margin is used to safely draw the legend and the overall visualization
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}
// define and append an SVG element
const width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

const svgContainer = container
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

// define the group element nested inside the SVG, in which to actually plot the map
const svgCanvas = svgContainer
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

