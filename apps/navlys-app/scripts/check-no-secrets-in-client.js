// scripts/check-no-secrets-in-client.js
// Circuit-breaker : échoue le build si SERVICE_ROLE_KEY apparaît dans du code client.
// Reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §2 (G1 sécurité).
const { execSync } = require('child_process');
try {
  execSync('grep -r "SERVICE_ROLE" app/ components/ --include="*.tsx" --include="*.ts" | grep -v "_actions" | grep -v "lib/supabase/server"');
  console.error('❌ SERVICE_ROLE_KEY referenced in client code. Aborting build.');
  process.exit(1);
} catch (e) {
  // grep failed = no match = ok
  console.log('✅ No service role key in client code.');
}
