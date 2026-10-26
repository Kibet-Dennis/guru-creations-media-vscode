import 'dotenv/config';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import express, { type Request, type Response } from 'express';
import { createServer as createViteServer } from 'vite';

const adminPassword = process.env.ADMIN_PASSWORD;
if (!adminPassword || adminPassword.length < 16) {
  throw new Error('Set ADMIN_PASSWORD in .env to a unique password of at least 16 characters.');
}

const port = Number(process.env.PORT ?? 3000);
const isDevelopment = process.argv.includes('--dev');
const isProduction = !isDevelopment && existsSync(resolve('dist/index.html'));
const sessionDurationMs = 8 * 60 * 60 * 1000;
const loginWindowMs = 15 * 60 * 1000;
const maxLoginAttempts = 5;
const sessions = new Map<string, number>();
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const app = express();
app.disable('x-powered-by');

const hashedAdminPassword = createHash('sha256').update(adminPassword).digest();
const passwordMatches = (providedPassword: string) => {
  const providedHash = createHash('sha256').update(providedPassword).digest();
  return timingSafeEqual(hashedAdminPassword, providedHash);
};

const getSessionId = (request: Request) => {
  const cookie = request.headers.cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith('admin_session='));
  return cookie?.slice('admin_session='.length);
};

const hasValidSession = (request: Request) => {
  const sessionId = getSessionId(request);
  if (!sessionId) return false;
  const expiresAt = sessions.get(sessionId);
  if (!expiresAt) return false;
  if (expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
};

app.use('/api', (_request, response, next) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(express.json({ limit: '2kb' }));

app.get('/api/admin/session', (request, response) => {
  response.sendStatus(hasValidSession(request) ? 204 : 401);
});

app.post('/api/admin/login', (request, response) => {
  const clientId = request.ip ?? request.socket.remoteAddress ?? 'unknown';
  const now = Date.now();
  const attempts = loginAttempts.get(clientId);
  if (attempts && attempts.resetAt > now && attempts.count >= maxLoginAttempts) {
    response.sendStatus(429);
    return;
  }

  const password = request.body?.password;
  if (typeof password !== 'string' || !passwordMatches(password)) {
    if (!attempts || attempts.resetAt <= now) {
      loginAttempts.set(clientId, { count: 1, resetAt: now + loginWindowMs });
    } else {
      attempts.count += 1;
    }
    response.sendStatus(401);
    return;
  }

  loginAttempts.delete(clientId);
  const sessionId = randomBytes(32).toString('hex');
  sessions.set(sessionId, now + sessionDurationMs);
  const secureCookie = request.secure ? '; Secure' : '';
  response.setHeader(
    'Set-Cookie',
    `admin_session=${sessionId}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${sessionDurationMs / 1000}${secureCookie}`
  );
  response.sendStatus(204);
});

app.post('/api/admin/logout', (request, response) => {
  const sessionId = getSessionId(request);
  if (sessionId) sessions.delete(sessionId);
  const secureCookie = request.secure ? '; Secure' : '';
  response.setHeader(
    'Set-Cookie',
    `admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secureCookie}`
  );
  response.sendStatus(204);
});

if (isDevelopment) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else if (isProduction) {
  app.use(express.static(resolve('dist'), { index: false }));
  app.get('*', (_request: Request, response: Response) => {
    response.sendFile(resolve('dist/index.html'));
  });
} else {
  throw new Error('Production build not found. Run npm run build before npm start.');
}

app.listen(port, '127.0.0.1', () => {
  console.log(`Guru Creations is running locally at http://127.0.0.1:${port}`);
});
