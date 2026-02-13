import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const R2_ACCOUNT_ID = import.meta.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = import.meta.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = import.meta.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = import.meta.env.R2_BUCKET_NAME || 'mindtrail-audio';

const VALID_SESSIONS = [
  'session-1',
  'session-2',
  'session-3',
  'session-4',
  'session-5',
  'session-6',
  'session-7',
  'bonus',
];

function getR2Client(): S3Client {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

export async function getSignedAudioUrl(sessionSlug: string): Promise<string | null> {
  if (!VALID_SESSIONS.includes(sessionSlug)) {
    return null;
  }

  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.error('R2 credentials not configured');
    return null;
  }

  try {
    const client = getR2Client();
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: `audio/${sessionSlug}.mp3`,
    });

    // Signed URL expires in 1 hour
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    return url;
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return null;
  }
}
