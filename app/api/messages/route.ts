import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

// GET /api/messages - Récupérer les messages (filtrés par channelId)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    let query: any = {};
    if (channelId) {
      query.channelId = parseInt(channelId);
    }

    const messages: any[] = await Message.find(query).sort({ _id: 1 }).lean();
    const formattedMessages = messages.map((message: any) => ({
      ...message,
      id: message._id.toString(),
    }));
    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
  }
}

// POST /api/messages - Créer un nouveau message
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { channelId, author, content, encrypted } = body;

    const newMessage = new Message({
      channelId,
      author,
      content,
      encrypted: encrypted || false,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    });

    await newMessage.save();

    const messageObj = newMessage.toObject();
    return NextResponse.json({ ...messageObj, id: messageObj._id.toString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Error creating message' }, { status: 500 });
  }
}

