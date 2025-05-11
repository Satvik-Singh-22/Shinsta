// pages/index.tsx or any page
'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUpload = (result: any) => {
    if (result.event === 'success' && result.info?.secure_url) {
      setImageUrl(result.info.secure_url);
      console.log('Uploaded Image URL:', result.info.secure_url);
    } else {
      console.log('Upload failed');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Upload Local Image to Cloudinary</h1>

      {/* File input */}
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            // Trigger Cloudinary upload widget manually
            const widget = (window as any).cloudinary.createUploadWidget(
              {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                uploadPreset: 'Shinsta',
                sources: ['local'],
                resourceType: 'auto',
                folder: 'test-uploads',
              },
              (error: any, result: any) => {
                handleUpload(result);
              }
            );
            widget.open();
          }
        }}
        className="mb-4"
      />

      {/* Display uploaded image */}
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="w-64" />
        </div>
      )}
    </div>
  );
}
