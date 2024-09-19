/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";

type Props = {};

export default function DemoPage({}: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);  // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true);  // Set to true once the component is mounted
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  if (!isMounted) {
    return null;  // Return null during SSR to prevent hydration mismatch
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Image Upload Demo" />

      {/* Image Upload Section */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {image && (
        <div className="flex flex-col gap-2">
          <img
            src={image}
            alt="Uploaded"
            className="w-64 h-64 object-cover rounded-lg"
          />
          <button
            onClick={removeImage}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}
