/**
 * Google Drive API Service
 * Handles file listing, searching, uploading, folder creation, and deleting
 * for Sandhya Enterprises Commercial LPG documents repository.
 */

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
  description?: string;
  parents?: string[];
}

export interface DriveStorageInfo {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
  userName?: string;
  userEmail?: string;
  userPhoto?: string;
}

/**
 * Fetch storage info and user details from Google Drive API
 */
export async function getDriveStorageQuota(accessToken: string): Promise<DriveStorageInfo> {
  const url = 'https://www.googleapis.com/drive/v3/about?fields=storageQuota,user';
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to get Drive storage info:', errorText);
    throw new Error(`Drive API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    limit: data.storageQuota?.limit,
    usage: data.storageQuota?.usage,
    usageInDrive: data.storageQuota?.usageInDrive,
    usageInDriveTrash: data.storageQuota?.usageInDriveTrash,
    userName: data.user?.displayName,
    userEmail: data.user?.emailAddress,
    userPhoto: data.user?.photoLink
  };
}

/**
 * List files from Google Drive
 * Supports filtering by folderId, search text, and mimeTypes
 */
export async function listDriveFiles(
  accessToken: string,
  options?: {
    folderId?: string;
    searchQuery?: string;
    mimeTypeFilter?: 'all' | 'pdf' | 'spreadsheet' | 'document' | 'image' | 'folder' | 'form';
    pageSize?: number;
    pageToken?: string;
  }
): Promise<{ files: DriveFile[]; nextPageToken?: string }> {
  const queryParts: string[] = ['trashed = false'];

  if (options?.folderId) {
    queryParts.push(`'${options.folderId}' in parents`);
  }

  if (options?.searchQuery && options.searchQuery.trim().length > 0) {
    const escaped = options.searchQuery.replace(/'/g, "\\'");
    queryParts.push(`name contains '${escaped}'`);
  }

  if (options?.mimeTypeFilter && options.mimeTypeFilter !== 'all') {
    switch (options.mimeTypeFilter) {
      case 'pdf':
        queryParts.push("mimeType = 'application/pdf'");
        break;
      case 'spreadsheet':
        queryParts.push("(mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType contains 'spreadsheet' or mimeType contains 'excel')");
        break;
      case 'document':
        queryParts.push("(mimeType = 'application/vnd.google-apps.document' or mimeType contains 'word' or mimeType = 'text/plain')");
        break;
      case 'image':
        queryParts.push("mimeType contains 'image/'");
        break;
      case 'folder':
        queryParts.push("mimeType = 'application/vnd.google-apps.folder'");
        break;
      case 'form':
        queryParts.push("mimeType = 'application/vnd.google-apps.form'");
        break;
    }
  }

  const q = encodeURIComponent(queryParts.join(' and '));
  const fields = encodeURIComponent(
    'nextPageToken,files(id,name,mimeType,size,modifiedTime,webViewLink,webContentLink,iconLink,thumbnailLink,description,parents)'
  );
  const pageSize = options?.pageSize || 30;
  let url = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&pageSize=${pageSize}&orderBy=folder,modifiedTime desc`;

  if (options?.pageToken) {
    url += `&pageToken=${encodeURIComponent(options.pageToken)}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to list files from Drive:', errorText);
    throw new Error(`Google Drive API error: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    files: data.files || [],
    nextPageToken: data.nextPageToken
  };
}

/**
 * Upload a file to Google Drive using multipart upload
 */
export async function uploadDriveFile(
  accessToken: string,
  file: File,
  folderId?: string,
  customDescription?: string
): Promise<DriveFile> {
  const metadata: Record<string, any> = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    description: customDescription || `Uploaded from Sandhya Enterprises Commercial LPG Hub on ${new Date().toLocaleDateString()}`
  };

  if (folderId) {
    metadata.parents = [folderId];
  }

  const boundary = '-------SandhyaEnterprisesDriveMultipartBoundary' + Math.random().toString(36).substring(2);
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileDataPromise = new Promise<ArrayBuffer>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

  const fileData = await fileDataPromise;

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}`;
  const mediaPartHeader = `${delimiter}Content-Type: ${file.type || 'application/octet-stream'}\r\nContent-Transfer-Encoding: base64\r\n\r\n`;

  // Convert ArrayBuffer to binary string / base64
  let binary = '';
  const bytes = new Uint8Array(fileData);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64Data = window.btoa(binary);

  const multipartBody = metadataPart + mediaPartHeader + base64Data + closeDelimiter;

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,modifiedTime,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartBody
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to upload file to Google Drive:', errorText);
    throw new Error(`Google Drive Upload error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Create a new folder in Google Drive
 */
export async function createDriveFolder(
  accessToken: string,
  folderName: string,
  parentId?: string
): Promise<DriveFile> {
  const metadata: Record<string, any> = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder'
  };

  if (parentId) {
    metadata.parents = [parentId];
  }

  const response = await fetch('https://www.googleapis.com/drive/v3/files?fields=id,name,mimeType,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(metadata)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to create folder in Google Drive:', errorText);
    throw new Error(`Google Drive Create Folder error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Delete a file or folder from Google Drive
 * CAUTION: Destructive operation - require user confirmation before calling!
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<boolean> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok && response.status !== 204) {
    const errorText = await response.text();
    console.error('Failed to delete file from Google Drive:', errorText);
    throw new Error(`Google Drive Delete error: ${response.statusText}`);
  }

  return true;
}
