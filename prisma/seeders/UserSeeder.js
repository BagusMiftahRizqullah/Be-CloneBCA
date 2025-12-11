import bcrypt from 'bcryptjs';

export default async function run(prisma) {
  const users = [
    { email: 'admin@example.com', name: 'Admin', role: 'admin' },
    { email: 'editor1@example.com', name: 'Editor One', role: 'editor' },
    { email: 'editor2@example.com', name: 'Editor Two', role: 'editor' },
    { email: 'user1@example.com', name: 'User One', role: 'user' },
    { email: 'user2@example.com', name: 'User Two', role: 'user' },
    { email: 'user3@example.com', name: 'User Three', role: 'user' },
    { email: 'user4@example.com', name: 'User Four', role: 'user' },
    { email: 'user5@example.com', name: 'User Five', role: 'user' },
    { email: 'user6@example.com', name: 'User Six', role: 'user' },
    { email: 'user7@example.com', name: 'User Seven', role: 'user' },
  ];

  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);
  for (const u of users) {
    await prisma.user.create({ data: { email: u.email, name: u.name, role: u.role, passwordHash } });
  }
}

