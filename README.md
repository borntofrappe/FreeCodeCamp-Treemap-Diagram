<!-- Link to the work-in-progress pen right [here](). -->

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

- [ ] there exist `rect` element with `class="tile"`;

- [ ] the tiles should at least have 2 different fill colors;

- [ ] each tile has the following data attributes: `data-name`, `data-category`, and `data-value`. These should contain the information found under the labels bearing the same name in the JSON file;

- [ ] the area of each tile should match the `data-value`, with increasing values matched by bigger areas;

- [ ] there exist a legend with `id="legend"`;

- [ ] the legend needs `rect` elements with `class="legend-item"`;

- [ ] the legend should at least make use of 2 different fill colors;

- [ ] when hovering on each area, a tooltip with `id="tooltip"` is to be displayed with detailed information;

- [ ] the tooltip should have a `data-value` property matching the attribute of the rectangle elements.

This while benefiting from one of three datasets, from which I picked the following describing [Movie Sales]():

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


