import mongoose, { Schema, Document } from 'mongoose';
import { User, MissionInvitation } from '@/lib/types';

export interface UserDocument extends Omit<User, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const MissionInvitationSchema = new Schema<MissionInvitation>({
  contractId: { type: Number, required: true },
  contractTitle: { type: String, required: true },
  invitedBy: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: String, required: true },
}, { _id: false });

const ApplicationDataSchema = new Schema({
  pseudo: { type: String, required: true },
  discord: { type: String, required: true },
  experience: { type: String, required: true },
  submittedAt: { type: String, required: true },
}, { _id: false });

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  discord: { type: String },
  role: {
    type: String,
    enum: ['Bratan', 'Soldat', 'Avtoritet', 'Vor', 'Sovetnik', 'Pervyi', 'Pakhan', 'Admin'],
    default: 'Bratan',
  },
  reputation: { type: Number, default: 0 },
  money: { type: Number, default: 0 },
  createdAt: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  applicationData: { type: ApplicationDataSchema },
  missionInvitations: { type: [MissionInvitationSchema], default: [] },
});

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

