#!/usr/bin/env node
import program from 'commander';

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description(' Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
