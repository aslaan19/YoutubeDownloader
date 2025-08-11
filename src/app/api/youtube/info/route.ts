import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Dynamic import to avoid build-time issues
    const ytdl = (await import('@distube/ytdl-core')).default;
    
    const { url } = await request.json();

    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    const info = await ytdl.getInfo(url);
    const videoDetails = {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0]?.url,
      duration: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
    };

    return NextResponse.json({ videoDetails });
  } catch (error) {
    console.error('Info fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch video info' },
      { status: 500 }
    );
  }
}