import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { genDiff } from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

test('genDiff with 2 json files', async () => {
  const expected = readFile(getFixturePath('expected.txt'));
  const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  // fs.writeFileSync(getFixturePath('expected.txt'), diff, 'utf-8');
  expect(diff).toEqual(expected);
});
