import { SecretManagerServiceClient } from '@google-cloud/secret-manager';


async function accessSecretVersion(projectId, secretId, versionId) {
    const client = new SecretManagerServiceClient();
  
    // Build the resource name of the secret version.
    const name = `projects/${process.env.GCLOUD_PROJECT}/secrets/${process.env.GOOGLE_APPLICATION_CREDENTIALS}/versions/latest`;
  
    // Access the secret version.
    const [response] = await client.accessSecretVersion({ name: name });
  
    // Return the secret data.
    return response.payload.data.toString();
  }