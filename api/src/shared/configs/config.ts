import { createProfiguration } from '@golevelup/profiguration';
import { Logger } from '@nestjs/common';
interface Config {
	api: {
		port: number;
		nodeEnv: string;
	};
	admin: {
		mail: string;
		password: string;
		firstname: string;
		lastname: string;
	};
	websiteUrl: string;
	jwt: {
		accessSecret: string;
		accessTokenExpirationTime: number;
		refreshSecret: string;
		refreshTokenExpirationTime: number;
	};
	cookie: {
		secret: string;
	};
}

const logger = new Logger('Configuration');

export const config = createProfiguration<Config>(
	{
		admin: {
			mail: {
				default: 'nathan.carlier@bds-efrei.fr',
				format: String,
				env: 'ADMIN_MAIL',
			},
			password: {
				default: 'root',
				format: String,
				env: 'ADMIN_PASSWORD',
			},
			firstname: {
				default: 'Nathan',
				format: String,
				env: 'ADMIN_FIRSTNAME',
			},
			lastname: {
				default: 'Carlier',
				format: String,
				env: 'ADMIN_LASTNAME',
			},
		},
		api: {
			port: {
				default: 3000,
				format: Number,
				env: 'API_PORT',
			},
			nodeEnv: {
				default: 'dev',
				env: 'NODE_ENV',
				format: String,
			},
		},
		websiteUrl: {
			default: 'http://localhost:3000',
			format: String,
			env: 'WEBSITE_URL',
		},
		cookie: {
			secret: {
				default:
					'very_very_very_very_very_very_very_very_very_very_very_very_long_secret_key',
				format: String,
				env: 'COOKIE_SECRET',
			},
		},
		jwt: {
			accessSecret: {
				default:
					'very_very_very_very_very_very_very_very_very_very_very_very_long_secret_key',
				format: String,
				env: 'JWT_ACCESS_SECRET',
			},
			accessTokenExpirationTime: {
				default: 3600,
				format: Number,
				env: 'JWT_ACCES_TOKEN_EXPIRATION_TIME',
			},
			refreshSecret: {
				default:
					'very_very_very_very_very_very_very_very_very_very_very_very_long_secret_key',
				format: String,
				env: 'JWT_REFRESH_SECRET',
			},
			refreshTokenExpirationTime: {
				default: 86400,
				format: Number,
				env: 'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
			},
		},
	},
	{
		strict: true,
		verbose: true,
		logger: (message: string) => {
			logger.log(message);
		},
		configureEnv: () => ({ files: '.env' }),
	},
);
