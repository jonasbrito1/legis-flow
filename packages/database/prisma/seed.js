const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'camara-demo' },
    update: {},
    create: {
      name: 'Camara Municipal Demo',
      slug: 'camara-demo',
      city: 'Cidade Demo',
      state: 'SP',
    },
  });

  const passwordHash = await bcrypt.hash('Admin@123456', 12);

  await prisma.user.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: 'admin@legisflow.local' } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'admin@legisflow.local',
      name: 'Administrador LegisFlow',
      passwordHash,
      role: Role.ADMIN,
    },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});

