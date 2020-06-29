import { SubsystemResponse } from './subsystem-response';
import { CreateAppointDto } from '../appoints/dto/create-appoint.dto';
import dummyResponse from './dummies/has-errors.json';
import { BadRequestException } from '@nestjs/common';
import { doTypesOverlap } from 'graphql';

describe('SubsystemResponse', () => {
  const dto = new CreateAppointDto();
  dto.date = 'aabkdd';
  dto.timeFrom = 'aalssk';
  const subsystemResponse = new SubsystemResponse(dto, dummyResponse);

  it('validationErrorCreate', async () => {
    const validationError = subsystemResponse.validationErrorCreate(
      'aadddd',
      'name',
    );
    console.log(validationError);
    expect('').toBe('');
  });

  it('validate', async () => {
    expect(() => {
      subsystemResponse.validate();
    }).toThrowError(BadRequestException);
  });
});
