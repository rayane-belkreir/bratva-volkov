import mongoose, { Schema, Document } from 'mongoose';
import { Contract } from '@/lib/types';

export interface ContractDocument extends Omit<Contract, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const RewardSchema = new Schema({
  money: { type: Number, required: true },
  reputation: { type: Number, required: true },
  items: { type: [String], default: [] },
}, { _id: false });

const TeamRequestSchema = new Schema({
  username: { type: String, required: true },
  requestedBy: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, { _id: false });

const ContractSchema = new Schema<ContractDocument>({
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  reward: { type: RewardSchema, required: true },
  status: {
    type: String,
    enum: ['available', 'in_progress', 'completed', 'refused'],
    default: 'available',
  },
  deadline: { type: String, required: true },
  teamMembers: { type: [String], default: [] },
  teamRequests: { type: [TeamRequestSchema], default: [] },
  lockedBy: { type: String },
});

export default mongoose.models.Contract || mongoose.model<ContractDocument>('Contract', ContractSchema);

