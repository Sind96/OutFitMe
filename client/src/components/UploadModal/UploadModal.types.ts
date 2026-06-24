export interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

export interface UploadImageState {
  file: File | null;
}

export interface TempChecksState {
  tempChecks: string[];
}
