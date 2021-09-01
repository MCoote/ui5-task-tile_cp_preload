const log = require("@ui5/logger").getLogger(
    "builder:customtask:ui5-task-flatten-library"
  );
 
  module.exports = async function ({ workspace, options }) {
    // "workspace" is a DuplexCollection that represents the projects source directory (e.g. /webapp)
    // When calling the standard APIs "byGlob" and "byPath" it will also return resources that have
    //  just been created by other tasks.
    // The uglify task intents to only process those resources present in the project source directory
    //  therefore it calls the API "byGlobSource".

    const resources = await workspace.byGlob("**/Component*.js")
    const preload = await workspace.byPath(`/resources/${options.configuration.path}/Component-preload.js`) // Collect all resources that shall be uglified. The caller provides the necessary GLOB pattern.
    log.info(`Found ${preload.getPath()}`)
    const newPath = `${preload.getPath().substring(0, preload.getPath().lastIndexOf("/"))}/${options.configuration.path}${preload.getPath().substring(preload.getPath().lastIndexOf("/"),preload.getPath().length)}`
    preload.setPath(newPath)
    log.info(`Copied preload file to path ${newPath}`)
    return workspace.write(preload)
  };