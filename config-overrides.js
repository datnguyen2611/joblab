const { override } = require('customize-cra');

const appBuildPathFile = () => config => {
  if (config.mode === 'production') {
    console.log('evn is production...')
    //console.log(paths.appIndexJs);
    config.devtool = false
    //config.devtool = 'source-map';
    //config.mode = 'development';
    
    
    /*config.entry = config.entry.map(entry => {
      if (entry.slice(-8) === 'index.js') {
        {
          //entry=entry.replace('index.js','indexAdmin.js');
          console.log(entry);
          return entry
        }
          
      }
  
      return entry;
    });*/
    //console.log(JSON.stringify(config));
  }
  return config
}

//remove console.*
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          console.log("Disable console log.");
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}


module.exports = {
  webpack: override(
    appBuildPathFile(),
    dropConsole(),
  )
}