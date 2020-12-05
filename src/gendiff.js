import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const compareStrings = (a, b) => {
  if (a[0] < b[0]) { return -1; }
  if (a[0] > b[0]) { return 1; }
  return 0;
};

const isUndefined = (value) => value === undefined;

const loadJSON = (filename) => {
  const filepath = path.resolve(process.cwd(), filename);
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
};

export const genDiff = (filename1, filename2) => {
  const object1 = loadJSON(filename1);
  const object2 = loadJSON(filename2);

  const keys = _.uniq([].concat(Object.keys(object1), Object.keys(object2))).sort(compareStrings);

  const result = [];
  result.push('{');
  keys.forEach((key) => {
    if (object1[key] === object2[key]) {
      result.push(`    ${key}: ${object2[key]}`);
      return;
    }

    if (!isUndefined(object1[key]) && isUndefined(object2[key])) {
      result.push(`  - ${key}: ${object1[key]}`);
      return;
    }

    if (!isUndefined(object2[key]) && isUndefined(object1[key])) {
      result.push(`  + ${key}: ${object2[key]}`);
      return;
    }

    if (object1[key] !== object2[key]) {
      result.push(`  - ${key}: ${object1[key]}`);
      result.push(`  + ${key}: ${object2[key]}`);
    }
  });
  result.push('}');

  return result.join('\n');
};
