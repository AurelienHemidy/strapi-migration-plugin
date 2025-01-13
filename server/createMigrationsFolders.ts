const fse = require('fs-extra');
const path = require('path');

export async function createMigrationsFolderAndSubFolders() {
  const dirnames = [
    path.join('./migrations', 'scripts'),
    path.join('./migrations', 'deprecated-fields'),
  ];

  await Promise.all(
    dirnames.map(dirname => fse.mkdirs(`${dirname}`).catch(console.error))
  );

  fse.pathExists(
    path.join('./migrations', 'deprecated-fields', 'deprecated-fields.json'),
    (err, exists) => {
      if (!exists) {
        fse.outputFile(
          path.join(
            './migrations',
            'deprecated-fields',
            'deprecated-fields.json'
          ),
          `[]`,
          function (err) {
            if (err) throw err;
          }
        );
      }
    }
  );
}
