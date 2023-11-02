import { ACTIONS } from '../../shared/enum/Actions';
import { IsArray, ArrayContains } from 'class-validator';

const actionsArray = Object.values(ACTIONS);

export class Permissions {
	@IsArray()
	@ArrayContains(actionsArray)
	photo: ACTIONS[];

	@IsArray()
	@ArrayContains(actionsArray)
	planning: ACTIONS[];

	@IsArray()
	@ArrayContains(actionsArray)
	role: ACTIONS[];

	@IsArray()
	@ArrayContains(actionsArray)
	self: ACTIONS[];

	@IsArray()
	@ArrayContains(actionsArray)
	user: ACTIONS[];
}
