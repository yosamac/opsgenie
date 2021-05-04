import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { MainModule } from './main.module';
import { ServiceLogger } from './logger/logger.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        logger: false,
    });

    const config = app.get<ConfigService>(ConfigService);

    app.useLogger(new ServiceLogger(config));

    const logger = await app.resolve<ServiceLogger>(ServiceLogger);

    const context = config.get<string>('api.context');

    if (context) {
        logger.info(`API context: ${context}`);
        app.setGlobalPrefix(context);
    }

    // Swagger
    const options = new DocumentBuilder()
        .setTitle('Opsgenie')
        .setDescription('Alert notification system')
        .addBearerAuth()
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${context ? context + '/' : ''}api`, app, document);

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: { retryAttempts: 5, retryDelay: 3000 },
    });

    await app.startAllMicroservicesAsync();
    await app.listen(config.get<number>('api.port'));
    logger.info(`Server listening on port: ${config.get<number>('api.port')}`);
}

bootstrap();
