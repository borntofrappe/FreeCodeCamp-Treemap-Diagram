Link to the working pen right [here](https://codepen.io/borntofrappe/full/RYbaOo/).

## Preface

For the fifth and final project to earn the data viz certification @freeCodeCamp, the task looks a tad more approachable than the choropleth map, but provides its own set of challenges: visualize arbitrary data with a treemap diagram.

Such a diagram is used to efficiently display **hierarchical data**, that is data structured on the basis of a hierarchy. Starting from a common point, shared by the entire data set, information is refined with increasing specificity, branching off from the parent node. You could think of a tree, with a trunk and several branches, which are responsible for the individual data points.

If this short description sounds convoluted, the following pseudo-code might help clear some doubts:

```code
main
  branch
    sub-branch
    sub-branch
    sub-branch
  branch
    sub-branch
    sub-branch
    sub-branch
```

In practice, and this is visible in the [URL](https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json) soon to be discussed for the project, the hierarchy is made evident by the `children` property of every node. This is an array included for the first, second and up to the last branch, to detail nested data.

This is how a hierarchical data is structured. In practice, and for a treemap diagram specifically, the relationship is then visualized through rectangles. Different rectangles are included with a different colors, describing the main sub-division, and the same rectangles are then tiled, in order to detail the nested branches.

## Development

To complete the project at hand, D3.js provides the `d3.treemap()` function, which seems to function much alike `d3.pie()`. This function is used to take as input the JSON file describing the data and return as output a set of values, of coordinates which the library as a whole can render swiftly, with HTML or SVG elements. Think of the `pie()` function, and how its inclusion made it so easy to consider the input data (single data points) and output the coordinates necessary to create the slices of the graph (startAngle and endAngle).

### User Stories

@freeCodeCamp describes a set of user stories the project must fulfill to complete the task. For the projet at hand, these are:

- [x] there exist a title with `id="title"`;

- [x] there exist a description with `id="description"`;

- [x] there exist `rect` element with `class="tile"`;

- [x] the tiles should at least have 2 different fill colors;

- [x] each tile has the following data attributes: `data-name`, `data-category`, and `data-value`. These should contain the information found under the labels bearing the same name in the JSON file;

- [x] the area of each tile should match the `data-value`, with increasing values matched by bigger areas;

- [x] there exist a legend with `id="legend"`;

- [x] the legend needs `rect` elements with `class="legend-item"`;

- [x] the legend should at least make use of 2 different fill colors;

- [x] when hovering on each area, a tooltip with `id="tooltip"` is to be displayed with detailed information;

- [x] the tooltip should have a `data-value` property matching the attribute of the rectangle elements.

This while benefiting from one of three datasets, from which I picked the following describing [Movie Sales](https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json):

```code
https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json
```

### Data

In the referenced JSON file, it is possible to find an object with two main properties:

- `name`, describing the dataset
- `children`, describing the data points falling under the name itself (falling under the label of 'Movies').

`children` is itself an array nesting objects. One object for each movie category included in the dataset. Each object has a `name` describing the category and a `children` property, which functions like the previous instance. Instead of nesting an object of movie's categories, this one includes one object for each movie falling in the prescribed category. This object includes a `name` for the movie itself, as well as the `category` which matches the branch and a `value` presumably describing the sales' metric.

In pseudo code, and considering a small subset of the JSON format, you can visualize the data as follows:

```code
{
  moviesObj
    moviesCategory
      moviesName
        movieData
        movieData
        movieData
        movieData

      moviesName
        movieData
        movieData
        movieData
        movieData

      moviesName
        movieData
        movieData
        movieData
        movieData

      moviesName
        movieData
        movieData
        movieData
        movieData

    // structure repeated for each category
    moviesCategory
      moviesName
      moviesName
      moviesName
      moviesName
}
```

The key values seem to be under:

- JSON.children[i].name, for the movie category;

- JSON.children[i].children[i].name for the name of the movie;

- JSON.children[i].children[i].value for the sales metric.

That being said, the JSON format might be subject to changes, once the mentioned `d3.treemap()` function is included.

### D3

Considering how the mentioned `d3.treemap()` function could work similarly to `d3.pie()`, a quick test is done by displaying the output of the function, when including the JSON format as parameter.

As this comparison proved to be wrong, and I struggled a little more to include the treemap layout, I'll try to explain the process as clearly as possible for posterity's sake.

**Fetch API**

Starting with a bit of set up, the JSON object is retrieved with a call through _fetch_ API. THe object is then passed as argument to a function responsible for the data visualization itself.

```JS
// retrieve the JSON format and pass it in a function responsible to draw the diagram itself
const URL = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json";


fetch(URL)
  .then((response) => response.json())
  .then((json) => drawDiagram(json));

function drawDiagram(data) {
  // log the JSON file
  console.log(data);
}
```

**d3.treemap()**

With the available JSON format, and as mentioned earlier, passing the data in the mapping function proves to be wrong: 

```JS
function drawDiagram(data) {
  // log the JSON file
  // console.log(data);

  let treemap = d3.treemap();
  console.log(treemap(data));
}
```

> Uncaught (in promise) TypeError: t.eachBefore is not a function

Beside the cryptic error message, is the [documentation](https://github.com/d3/d3-hierarchy/blob/master/README.md#treemap) of the library itself which comes to help:

> You must call root.sum before passing the hierarchy to the treemap layout

With a bit of research, on the newly pronounced hierarchy and root.sum, this is what I managed to reason: 

- the `d3.treemap()` function provides the values used in the SVG to draw the rectangle elements. These values specify the left, top, right, bottom edges of the rectangle elements, in `node.x0`, `node.y0`, `node.x1`, `node.y1`;

- the values for the edges are based on a value, which is itself based on the values of the data points for the single objects and the values of the cumulative data points for the branches. These values are computed with the `sum()` function, as follows:

  ```JS
  root.sum((d) => d.value); // where d.value holds the value making up the branches
  ```

- the `sum()` function is called on a root element. This element is obtained through the `d3.hierarchy()` function, which accepts as argument the JSON file itself.

  ```JS
  let hierarchy = d3.hierarchy(json);
  hierarchy.sum((d) => d.value);
  ```

While understandable, this first rough version of the code is certainly a lesson in thoroughly reading the documentation.

```JS
  let hierarchy = d3.hierarchy(data);
  
  hierarchy.sum((d) => d.value);

  const treemap = d3.treemap();
  
  // display the data, as modified per the treemap layout 
  console.log(treemap(hierarchy));
```

**Tiles**

The data, modified as per the treemap layout, provides a series of nodes, with the following attributes:

- `value`, computed from the individual data points;

- `data`, with information related to the name, category, sales metric;

- `node.x0`, `node.y0`, `node.x1`, and `node.y1`, detailing the position of the edges of each tile. 

These last four attributes are used in the visualization, describing the horizontal and vertical coordinates, as well as the width and height of each rectangle element.

First, it is necessary to include one rectangle element for each movie. 

```JS
let movies = [];
for(let i = 0; i < treemapLayout.children.length; i++) {
  // loop through the movies names
  for(let j = 0; j < treemapLayout.children[i].children.length; j++) {
    // include each movie in the prescribed array
    movies.push(treemapLayout.children[i].children[j]);
  }
}
```

Then, the values are included in the mentioned properties. The x and y values represent all a fraction of 1 unit. Together, they indeed total to 1. As the values and their cumulative measure range in the [0-1] range, it is necessary to normalize the interval to the [0, width] and [0, height] ranges.

```JS
.attr("width", (d, i) => (d.x1 - d.x0) * width)
.attr("height", (d, i) => (d.y1 - d.y0) * height)
.attr("x", (d, i) => d.x0 * width)
.attr("y", (d, i) => d.y0 * height)
```

**Color Scales**

A color scale is included to attach to each movie category a different color. For such a mapping, an ordinal scale detailing a discrete input domain and a discrete output range is necessary.

For the domain, this is represented by an array, nesting the different movie categories. This can be included with an hard-coded values or simply retrieved from the dataset, mapping through the data to keep track of each one of them.

```JS
const moviesCategories = ["Action", "Drama", "Adventure", "Family", "Animation", "Comedy", "Biography"];
```

For the range, this is handily provided by a preset, included directly in the `.scaleOrdinal()` function declaration. D3 indeed provides a series of [color sets]() which can be thusly and easily included in an ordinal scale.

```JS
const colorScale = d3
  .scaleOrdinal(d3.schemeSet2);
```

With the given domain, the scale will map each discrete value to a different color.

```JS
colorScale("Action"); // a color from the set
```

**Legend**

In the previous projects using D3.js, I have always included the legend _before_ the call to the external data and the rendering of the individual data point. This has the benefit of including a legend _while_ the data is fetched, but has the crucial drawback of being a fixed, hard-coded solution. Indeed, legend values are included separately from the data itself, and if this last one changes, the legend does not adapt.

With this project the legend is included, always in a section of the SVG which is separate from the data visaulization, but in the same function detailing the diagram.

The only minor complication is retrieving an array of unique categories, achieved roughly by mapping through the arrays of movies and filtering out duplicate values:

```JS
let categoriesArr = movies.map((movie) => movie.data.category);
// remove duplicates 
let categories = categoriesArr.filter((category, i) => {
  if (categoriesArr.slice(0, i).indexOf(category) === -1) {
    return category;
  }
});
```