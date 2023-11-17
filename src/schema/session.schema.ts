import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SessionToken extends Document  {
    @Prop()
    token: string;
  
    @Prop()
    status: string;
  }

  export const SessionSchema = SchemaFactory.createForClass(SessionToken);