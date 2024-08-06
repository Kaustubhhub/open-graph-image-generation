import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { Post } from '@/models/Post';

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db();
        const posts: Post[] = await db.collection('posts').find({}).toArray();
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.error();
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('file') as File | null;

        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        
        const post: Post = { title, description, file: file ? file.name : undefined };
        const result = await db.collection('posts').insertOne(post);

        return NextResponse.json({ ...post, _id: result.insertedId.toString() });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.error();
    }
}
