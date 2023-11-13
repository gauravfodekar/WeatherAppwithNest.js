import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://gvfodekar:Wp36zAHLkBzVKPfj@cluster0.rpp2q0z.mongodb.net/?retryWrites=true&w=majority')]
})
export class MongodBModule {}
