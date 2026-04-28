# Userscript Template

A template for building modern userscripts with [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).

> Even though I made this template for use with Tampermonkey, It should work fine with other userscript managers like [Violentmonkey](https://violentmonkey.github.io/), that follow the similar metadata structure as Tampermonkey. However, make sure to cross check the documentations to prevent any potential issues.

This setup lets you write userscripts using **TypeScript** and **npm packages**, then bundle everything into a **single userscript file** that runs directly in the browser.

With this template, you can use libraries such as `zod`, `three.js` and other npm modules designed to work in the browser, without needing to import scripts from external URLs or manually inject `<script>` tags.

# How to use?
- Clone this repository
- Open terminal, cd into repository root
- Install dependencies:
    - With the default node package manager: 
      ```
        npm i
      ```
    - Or using [pnpm](https://pnpm.io/) 
      ```
        pnpm i
      ```
- Open [src/main.ts](./src/main.ts) and start editing your userscript!
- The metadata block is auto-added to the generated userscript from [metadata.json](./metadata.json) with the keys and values representing metadata keys and values respectively.
- The `version` key in the metadata block is auto added at build time and is set as the date and time at which the build command was called. eg. `Tue, 28 Apr 2026 16:25:51 GMT`. This can be disabled by commenting out the relevant line in [builder/finalize.js](./builder/finalize.js).
- The build command generates the built userscript to a folder named `dist`:
    - ```
      npm run build
      ```