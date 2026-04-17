import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class FilesService {
  private readonly s3 = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION ?? 'us-east-1',
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY ?? '',
      secretAccessKey: process.env.S3_SECRET_KEY ?? '',
    },
  });

  constructor(private readonly prisma: PrismaService) {}

  list(tenantId: string) {
    return this.prisma.fileObject.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  async upload(
    tenantId: string,
    ownerId: string,
    file: Express.Multer.File,
    links: { documentId?: string; processId?: string; esicId?: string },
  ) {
    const latest = await this.prisma.fileObject.findFirst({
      where: { tenantId, filename: file.originalname },
      orderBy: { version: 'desc' },
    });
    const version = latest ? latest.version + 1 : 1;
    const storageKey = `${tenantId}/${Date.now()}-${version}-${file.originalname}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: storageKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    return this.prisma.fileObject.create({
      data: {
        tenantId,
        ownerId,
        filename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        storageKey,
        version,
        ...links,
      },
    });
  }
}

