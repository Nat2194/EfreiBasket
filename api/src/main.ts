import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(
		cors({
			origin: 'http://localhost:5173', // Remplacez cette URL par celle de votre application Vue.js
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées
			credentials: true, // Activez l'envoi des cookies ou des informations d'identification
		}),
	);

	await app.listen(3000);
}
bootstrap();
