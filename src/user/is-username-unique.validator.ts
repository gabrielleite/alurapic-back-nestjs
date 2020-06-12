import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {

    constructor(private userDao: UserDao) {}
    
    async validate(username: string, args: ValidationArguments) {
        return typeof username == 'string'
                    ? !!!(await this.userDao.findByUsername(username)).length
                    : false;
    }

}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUsernameUniqueConstraint
        });
   };
}