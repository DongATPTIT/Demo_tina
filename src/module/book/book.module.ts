import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "src/databases/entity/book.entity";
import { ScheduleModule } from "@nestjs/schedule";
import { ListHotbookService } from "./list-hotbook.service";
import { SearchService } from "../elastic-search/elastic-search.service";
import { SearchModule } from "../elastic-search/elastic-search.module";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        ScheduleModule.forRoot(),
        SearchModule,
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                node: configService.get('ELASTIC_URL') || 'http://localhost:9200',
                maxRetries: 10,
                requestTimeout: 60000,
                auth: {
                    username: configService.get('ELASTIC_USERNAME'),
                    password: configService.get('ELASTIC_PASSWORD')
                },
            }),
        })
    ],
    controllers: [BookController],
    providers: [BookService, ListHotbookService, SearchService]
})
export class BookModule { }