import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { CustomerGroup } from 'src/customer/entities/customer-group.entity';
import { Store } from 'src/store/entities/store.entity';

@Schema({
  timestamps: true,
  collection: 'users',
  toJSON: {
    virtuals: true,
    transform: (_, ret:{ _id?: any; __v?: number; id?: string; password?: string; }) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password; // Optionnel : pour ne jamais exposer le mot de passe en JSON
      return ret;
    },
  },
})
export class User extends Document {
 
  @Prop({ required: false, index: true })
  first_name?: string;

  @Prop({ required: false, index: true })
  last_name?: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;  // <-- ajout obligatoire !
  
  @Prop({ required: false, index: true })
  phone?: string;

  @Prop({ type: String, default: 'user', index: true })
  role: string;

  @Prop({ type: Types.ObjectId, ref: 'CustomerGroup' })
  customerGroup?: CustomerGroup | Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Store' })
  store: Store;

  @Prop({ type: String, required: false })
  authIdentity?: string;

  @Prop({ type: Date, default: null })
  deleted_at?: Date;

  createdAt?: Date;
  updatedAt?: Date;




}

export const UserSchema = SchemaFactory.createForClass(User);
