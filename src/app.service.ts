import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { msg: 'WHO ARE YOU, GET OUT NOW BEFORE I CALL A POLICE' };
  }
}
