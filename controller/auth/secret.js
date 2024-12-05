import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const projectName = process.env.GCLOUD_PROJECT;
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;
async function accessSecretVersion(projectName, credentials) {
    const client = new SecretManagerServiceClient();
  
    // Build the resource name of the secret version.
    const name = `projects/${projectName}/secrets/${credentials}/versions/latest`;
  
    // Access the secret version.
    const [response] = await client.accessSecretVersion({ name: name });
  
    // Return the secret data.
    return response.payload.data.toString();
  }