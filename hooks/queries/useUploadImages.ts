import { uploadImages } from '@/api/images';
import { useMutation } from '@tanstack/react-query';

function useUploadImages() {
  return useMutation({
    mutationFn: uploadImages,
  });
}

export default useUploadImages;
