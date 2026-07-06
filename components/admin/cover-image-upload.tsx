"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface CoverImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function CoverImageUpload({ value, onChange }: CoverImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("Image is too large. Please choose a file under 8MB.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        // Resize down to keep stored size reasonable
        const maxWidth = 1400;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
        onChange(dataUrl);
        setLoading(false);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {value ? (
        <div className="relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover"
            className="w-full h-40 object-cover rounded-md border border-border"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-background/90 border border-border rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="w-full h-24 flex items-center justify-center gap-2 border border-dashed border-border rounded-md text-sm text-muted-foreground hover:bg-muted transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Processing...
            </>
          ) : (
            <>
              <ImagePlus size={14} /> Upload cover image
            </>
          )}
        </button>
      )}
    </div>
  );
}
