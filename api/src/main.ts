import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './shared/configs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//Security
	app.use(cookieParser(config.get<string>('cookie.secret')));

	app.enableCors({
		origin: config.get('websiteUrl'),
		credentials: true,
	});

	await app.listen(3000);
}
bootstrap();
