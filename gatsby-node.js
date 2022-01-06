exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /@mapbox|mapbox-gl/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
  }