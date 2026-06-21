export interface UploadModalProps {
  onClose: () => void;
}

export interface UploadImageState {
  file: File | null;
}

export interface TempChecksState {
  tempChecks: string[];
}
