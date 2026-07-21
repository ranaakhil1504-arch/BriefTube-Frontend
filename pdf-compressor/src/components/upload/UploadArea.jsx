
import Card from '../ui/Card';
import DropZone from './DropZone';
import FilePreview from './FilePreview';
import UploadError from './UploadError';

export default function UploadArea({
  selectedFile,
  error,
  onFileSelect,
  onRemove,
}) {
  return (
    <div className="mx-auto mt-16 max-w-5xl px-4">
      <Card>
        {!selectedFile ? (
          <DropZone
            accept=".pdf"
            onFileSelect={onFileSelect}
          />
        ) : (
          <>
            <FilePreview
              file={selectedFile}
              onRemove={onRemove}
            />
            <UploadError message={error} />
          </>
        )}
      </Card>
    </div>
  );
}