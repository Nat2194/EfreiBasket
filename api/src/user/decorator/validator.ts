import { registerDecorator, ValidationOptions } from 'class-validator';
import { NotAcceptableException } from '@nestjs/common';

// Custom Packages
import { Role } from 'src/role/role.entity';

export function IsRoles(validationOptions?: ValidationOptions) {
	return (object: any, propertyName: string) => {
		registerDecorator({
			name: 'IsRoles',
			target: object.constructor,
			propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any) {
					let verif = true;
					if (!(value instanceof Role)) {
						verif = false;
						throw new NotAcceptableException('Not a Role object');
						return false;
					}
					if (verif) {
						return true;
					}
				},
			},
		});
	};
}
