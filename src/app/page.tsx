// pages/index.tsx or any page
'use client';

import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUpload = (result: any) => {
    if (result.event === 'success' && result.info?.secure_url) {
      setImageUrl(result.info.secure_url); // Update with the Cloudinary URL
      console.log('Uploaded Image URL:', result.info.secure_url);
    } else {
      console.log('Upload failed');
    }
  };

  // This function handles the file upload manually
  const handleFileUpload = (file: File) => {
    // Trigger Cloudinary upload widget manually
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: 'your_unsigned_preset',  // Replace with your unsigned preset
        sources: ['local'],  // You can specify 'local' if you want to restrict to file upload
        resourceType: 'auto',  // auto will support different media types (images, videos)
        folder: 'test-uploads', // Optional: Set a folder where the image will be uploaded
      },
      (error: any, result: any) => {
        handleUpload(result);
      }
    );
    widget.open();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Upload Local Image to Cloudinary</h1>

      {/* File input to select image */}
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            // Upload the file selected by the user
            handleFileUpload(file);
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
