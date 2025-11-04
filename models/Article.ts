import mongoose, { Schema, Document } from 'mongoose';
import { Article } from '@/lib/types';

export interface ArticleDocument extends Omit<Article, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const ArticleSchema = new Schema<ArticleDocument>({
  title: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  locked: { type: Boolean, default: false },
  requiredRank: { type: String },
});

export default mongoose.models.Article || mongoose.model<ArticleDocument>('Article', ArticleSchema);

