import mongoose, { Schema, Document } from 'mongoose';
import { ForumMessage } from '@/lib/types';

export interface MessageDocument extends Omit<ForumMessage, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const MessageSchema = new Schema<MessageDocument>({
  channelId: { type: Number, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true },
  encrypted: { type: Boolean, default: false },
});

export default mongoose.models.Message || mongoose.model<MessageDocument>('Message', MessageSchema);

