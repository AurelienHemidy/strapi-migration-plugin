#!/usr/bin/env zx

/**
 * This script prepares the dist folder for npm release
 *
 * It will update scripts to build the project appropriately
 */

const fs = require('fs');

async function setupPackage() {
  const source = fs.readFileSync('dist/package.json');

  const packageJSON = JSON.parse(source);

  const buildScripts = {
    scripts: {
      build: 'tsc -p ../tsconfig.json',
    },
  };

  fs.writeFile(
    'dist/package.json',
    JSON.stringify(
      {
        ...packageJSON,
        ...buildScripts,
      },
      null,
      2
    ),
    err => {
      if (err) throw err;
    }
  );

  //Copy README.md
  fs.copyFile('README.md', 'dist/README.md', () => {});
}

setupPackage();
