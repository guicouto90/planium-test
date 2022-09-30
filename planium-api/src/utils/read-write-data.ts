import * as fs from 'fs';
import { join } from 'path';

export class ReadWriteData {
  static writeFile = (data: any, name: string): void => {
    fs.writeFileSync(
      join(__dirname, '../../', 'src/data/', `${name}.json`),
      data,
      { flag: 'w' },
    );
  };

  static readFile = (name: string): any => {
    return fs.readFileSync(
      join(__dirname, '../../', 'src/data/', `${name}.json`),
      'utf8',
    );
  };

  static deleteData = (name: string): void => {
    fs.unlinkSync(join(__dirname, '../../', 'src/data/', `${name}.json`));
  };
}
