import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Dynamic import to avoid build-time issues
    const ytdl = (await import('@distube/ytdl-core')).default;

    const { url, format = 'mp3', quality = 'high' } = await request.json();

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      );
    }

    // Get video info
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s-]/gi, '').trim();
    
    let downloadStream;
    let mimeType;
    let fileExtension;
    let contentType;

    if (format === 'mp3' || format === 'audio') {
      // Audio only download
      const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
      const bestAudio = ytdl.chooseFormat(audioFormats, { quality: 'highestaudio' });

      if (!bestAudio) {
        throw new Error('No audio format available');
      }

      downloadStream = ytdl(url, {
        quality: 'highestaudio',
        filter: 'audioonly',
      });

      mimeType = bestAudio.mimeType || 'audio/webm';
      fileExtension = mimeType.includes('mp4') ? 'm4a' : 'webm';
      contentType = mimeType;

    } else if (format === 'mp4' || format === 'video') {
      // Video download with audio
      let videoQuality;
      
      switch (quality) {
        case 'high':
          videoQuality = 'highest';
          break;
        case 'medium':
          videoQuality = 'highestvideo';
          break;
        case 'low':
          videoQuality = 'lowestvideo';
          break;
        default:
          videoQuality = 'highest';
      }

      // Try to get video with audio first
      const videoWithAudio = ytdl.filterFormats(info.formats, format => 
        format.hasVideo && format.hasAudio
      );

      if (videoWithAudio.length > 0) {
        // Use video with audio
        downloadStream = ytdl(url, {
          quality: videoQuality,
          filter: format => format.hasVideo && format.hasAudio,
        });
      } else {
        // Fallback to video only if no combined format available
        downloadStream = ytdl(url, {
          quality: videoQuality,
          filter: 'videoonly',
        });
      }

      fileExtension = 'mp4';
      contentType = 'video/mp4';
    } else {
      throw new Error('Invalid format specified');
    }

    // Collect the stream data
    const chunks: Buffer[] = [];
    
    return new Promise<NextResponse>((resolve, reject) => {
      downloadStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        
        if (buffer.length === 0) {
          reject(new Error('Download resulted in empty file'));
          return;
        }

        const response = new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${title || 'download'}.${fileExtension}"`,
            'Content-Length': buffer.length.toString(),
          },
        });
        resolve(response);
      });

      downloadStream.on('error', (error) => {
        console.error('Stream error:', error);
        reject(error);
      });

      // Add timeout to prevent hanging
      setTimeout(() => {
        reject(new Error('Download timeout'));
      }, 120000); // 2 minutes timeout
    });

  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: `Download failed: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}