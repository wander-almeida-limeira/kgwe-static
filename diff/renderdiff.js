let diffinterface = {};

diffinterface.render = function(version) {
    document.getElementById('diff-result').innerHTML = Diff2Html.getPrettyHtml(version, {
      // the format of the input data: 'diff' or 'json', default is 'diff'
      inputFormat: 'diff',
      // the format of the output data: 'line-by-line' or 'side-by-side'
      outputFormat: 'line-by-line',
      // show a file list before the diff: true or false,
      showFiles: false,
      // 'lines' for matching lines, 'words' for matching lines and words
      matching: 'none',
      // similarity threshold for word matching, default is
      matchWordsThreshold: .25,
      // perform at most this much comparisons for line matching a block of changes
      matchingMaxComparisons: 2500,
      // maximum number os characters of the bigger line in a block to apply comparison
      maxLineSizeInBlockForComparison: 200,
      // only perform diff changes highlight if lines are smaller than this
      maxLineLengthHighlight: 10000,
      // object with previously compiled templates to replace parts of the html
      templates: {},
      // object with raw not compiled templates to replace parts of the html
      rawTemplates: {},
      // render nothing if the diff shows no change in its comparison
      renderNothingWhenEmpty: false
    });
}