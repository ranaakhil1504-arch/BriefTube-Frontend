
import apiFetch from './api';

export async function uploadPdf(file) {
  const formData = new FormData();
  formData.append('pdf', file);
  return apiFetch('/pdf/upload', {
    method: 'POST',
    body: formData,
  });
}

export async function compressPdf(file, level, targetSize = null) {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('level', level);
  
  // Send target size if provided
  if (targetSize) {
    formData.append('targetSize', targetSize.toString());
  }

  return apiFetch('/pdf/compress', {
    method: 'POST',
    body: formData,
  });
}

export async function downloadCompressedFile(fileId) {
  return apiFetch(`/pdf/download/${fileId}`, {
    method: 'GET',
  });
}