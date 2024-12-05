import { SecretManagerServiceClient } from '@google-cloud/secret-manager';


const client = new SecretManagerServiceClient();

export async function getServiceAccountKey() {
  const [version] = await client.accessSecretVersion({
    name: `projects/${process.env.GCLOUD_PROJECT}/secrets/GOOGLE_APPLICATION_CREDENTIALS/versions/latest`,
  });

  const payload = version.payload.data.toString('utf8');
  return JSON.parse(payload); 
}
