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


// retrieve the JSON format and pass it in a function responsible to draw the diagram itself
const URL = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json";

fetch(URL)
  .then((response) => response.json())
  .then((json) => drawDiagram(json));

function drawDiagram(data) {
  // log the JSON file
  // console.log(data);

  /* 
  d3.treemap() cannot use the JSON format directly
  it is first necessary to include a root node and values for all the branches, outlining the relative weight of each division
  d3.hierarchy includes the node
  node.sum allows to include the value for each data point and branch
  */

  // include a root node
  let hierarchy = d3.hierarchy(data);

  // compute the value for each branch, dividing the nodes on the basis of the nodes' values
  hierarchy.sum((d) => d.value);

  // create a treemap layout
  let treemap = d3.treemap();
  
  // display the data, as modified per the treemap layout 
  console.log(treemap(hierarchy));

}