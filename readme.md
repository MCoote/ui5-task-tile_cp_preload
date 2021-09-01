# UI5-Tooling Custom task for custom tiles

When building and deploying custom tiles, the component-preload file is in the root of the dist folder and because of the nature of how custom tiles are addressed, it's not picked up by the launchpad.

This extension copies the Component-preload file into the correct folder.

Use in combination with the ui5-task-string-replacer to have the right names inside the component-preload file.

```
  - name: ui5-task-tile_cp_preload
    afterTask: generateComponentPreload
    configuration:
      path: <app id with / > - ie: com/example/customtile
```
