"use client";

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
} from "@/components/ui/sortable";
import { cn } from "@/lib/utils";
import {
  CircleX,
  CloudUpload,
  GripVertical,
  ImageIcon,
  TriangleAlert,
  XIcon
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface ImageFile {
  id: string;
  file: File;
  preview: string; // This is the object URL
  progress: number;
  status: "uploading" | "completed" | "error";
  error?: string;

  // New Fields
  key?: string;
}

type SortableImage = {
  id: string;
  src: string;
  alt: string;
  type: "default" | "uploaded";
};

interface ImageUploadProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  className?: string;
  onImagesChange?: (images: ImageFile[]) => void;
  onUploadComplete?: (images: ImageFile[]) => void;
}

export default function SortableImageUpload({
  maxFiles = 5, // Changed to 5 as per UI reference
  maxSize = 10 * 1024 * 1024, // 10MB as per UI reference
  accept = "image/*",
  className,
  onImagesChange,
  onUploadComplete,
  value,
  onChange
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<SortableImage[]>([]);

  // Helper function to create SortableImage from ImageFile
  const createSortableImage = useCallback(
    (imageFile: ImageFile): SortableImage => ({
      id: imageFile.id,
      src: imageFile.preview,
      alt: imageFile.file.name,
      type: "uploaded",
    }),
    []
  );

  // Ensure arrays never contain undefined items
  useEffect(() => {
    setAllImages((prev) => prev.filter((item) => item && item.id));
    setImages((prev) => prev.filter((item) => item && item.id));
  }, []);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "File must be an image";
    }
    if (file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(
        1
      )}MB`;
    }
    if (images.length >= maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }
    return null;
  };

  const addImages = useCallback(
    (files: FileList | File[]) => {
      const newImages: ImageFile[] = [];
      const newErrors: string[] = [];

      Array.from(files).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(`${file.name}: ${error}`);
          return;
        }

        const imageFile: ImageFile = {
          id: uuidv4(),
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
          status: "uploading",
        };

        newImages.push(imageFile);
      });

      if (newErrors.length > 0) {
        setErrors((prev) => [...prev, ...newErrors]);
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange?.(updatedImages);

        // Add new images to allImages for sorting
        const newSortableImages = newImages.map(createSortableImage);
        setAllImages((prev) => [...prev, ...newSortableImages]);

        newImages.forEach((imageFile) => {
          uploadFile(imageFile.file)
        });
      }
    },
    [images, maxSize, maxFiles, onImagesChange, createSortableImage]
  );

  const uploadFile = async (imageFile: File) => {
    setImages((prev) =>
      prev.map((f) =>
        f.file === imageFile ? { ...f, status: "uploading" } : f
      )
    )

    try {
      const preSignedUrlResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: imageFile.name,
          contentType: imageFile.type,
          size: imageFile.size
        })
      })

      if (!preSignedUrlResponse.ok) {
        setErrors((prev) => [...prev, "Failed to upload file"]);

        setImages((prev) =>
          prev.map((f) =>
            f.file === imageFile ? { ...f, status: "error", error: "Failed to upload file", progress: 0 } : f
          )
        )

        return;
      }

      const { preSignedUrl, key } = await preSignedUrlResponse.json()

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percentageCompleted = (e.loaded / e.total) * 100

            setImages((prev) =>
              prev.map((f) =>
                f.file === imageFile ? { ...f, progress: percentageCompleted, key, status: "uploading" } : f
              )
            )
          }
        }

        xhr.onload = () => {
          if (xhr.status == 200 || xhr.status == 204) {
            setImages((prev) =>
              prev.map((f) =>
                f.file === imageFile ? { ...f, progress: 100, status: "completed", error: undefined } : f
              )
            )

            onChange?.([...(value || []), key])

            resolve()
          } else {
            reject(new Error(`Failed to upload file: ${xhr.status}`))
          }
        }

        xhr.onerror = () => {
          reject(new Error("Failed to upload file"))
        }

        xhr.open("PUT", preSignedUrl)

        xhr.setRequestHeader('Content-Type', imageFile.type)

        xhr.send(imageFile)
      })
    } catch {
      setErrors((prev) => [...prev, "Failed to upload file"])

      setImages((prev) =>
        prev.map((f) =>
          f.file === imageFile ? { ...f, status: "error", error: "Failed to upload file", progress: 0 } : f
        )
      )
    }
  };

  // async function deleteFile(fileId: string) {
  //   try {
  //     const fileToRemove = images.find((f) => f.id === fileId)
  //   } catch {

  //   }
  // }

  const removeImage = useCallback(
    async (id: string) => {
      try {
        // Remove from allImages
        setAllImages((prev) => prev.filter((img) => img.id !== id));

        // If it's an uploaded image, also remove from images array and revoke URL
        const uploadedImage = images.find((img) => img.id === id);
        if (uploadedImage) {
          if (uploadedImage.preview) {
            URL.revokeObjectURL(uploadedImage.preview);
          }

          setImages((prev) => prev.filter((img) => img.id !== id));

          const deleteFileResponse = await fetch("/api/s3/delete", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: uploadedImage.key
            })
          })

          if (!deleteFileResponse.ok) {
            setErrors((prev) => [...prev, "Failed to delete file"])

            setImages((prev) =>
              prev.map((f) =>
                f.id === id ? { ...f, status: "error", error: "Failed to delete file" } : f
              )
            )
            return;
          }
        }
      }
      catch {
        setErrors((prev) => [...prev, "Failed to delete file"])

        setImages((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, status: "error", error: "Failed to delete file" } : f
          )
        )
      }

    },
    [images]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        addImages(files);
      }
    },
    [addImages]
  );

  const openFileDialog = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = accept;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        addImages(target.files);
      }
    };
    input.click();
  }, [accept, addImages]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / k ** i).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full max-w-4xl", className)}>
      {/* Instructions */}
      <div className="mb-4 text-center">
        <p className="text-sm text-muted-foreground">
          Upload up to {maxFiles} images (JPG, PNG, GIF, WebP, max{" "}
          {formatBytes(maxSize)} each). <br />
          Drag and drop images to reorder.
          {images.length > 0 && ` ${images.length}/${maxFiles} uploaded.`}
        </p>
      </div>

      {/* Image Grid with Sortable */}
      <div className="mb-6">
        {/* Combined Images Sortable */}
        <Sortable
          value={allImages.map((item) => item.id)}
          onValueChange={(newItemIds) => {
            // Reconstruct the allImages array based on the new order
            const newAllImages = newItemIds
              .map((itemId) => {
                // First try to find in allImages (default images)
                const existingImage = allImages.find(
                  (img) => img.id === itemId
                );
                if (existingImage) return existingImage;

                // If not found, it's a newly uploaded image
                const uploadedImage = images.find((img) => img.id === itemId);
                if (uploadedImage) {
                  return createSortableImage(uploadedImage);
                }
                return null;
              })
              .filter((item): item is SortableImage => item !== null);

            setAllImages(newAllImages);

            toast.success("Images reordered successfully!", {
              description: `Images rearranged across both sections`,
              duration: 3000,
            });
          }}
          getItemValue={(item) => item}
          strategy="grid"
          className="grid grid-cols-5 gap-2.5 auto-rows-fr"
          onDragStart={(event) => setActiveId(event.active.id as string)}
          onDragEnd={() => setActiveId(null)}
        >
          {allImages.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div className="flex items-center justify-center rounded-md bg-accent/50 shadow-none shrink-0 relative group border border-border hover:z-10 data-[dragging=true]:z-50 transition-all duration-200 hover:bg-accent/70">
                <Image
                  src={item.src}
                  width={120}
                  height={120}
                  className="object-cover w-full h-full pointer-events-none rounded-md"
                  alt={item.alt}
                />

                {/* Drag Handle */}
                <SortableItemHandle className="absolute opacity-0 top-2 start-2 group-hover:opacity-100 cursor-grab active:cursor-grabbing">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full size-6"
                  >
                    <GripVertical className="size-3.5" />
                  </Button>
                </SortableItemHandle>

                {/* Remove Button Overlay */}
                <Button
                  onClick={() => removeImage(item.id)}
                  variant="outline"
                  size="icon"
                  className="absolute rounded-full opacity-0 shadow-sm top-2 end-2 size-6 group-hover:opacity-100"
                >
                  <XIcon className="size-3.5" />
                </Button>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>

      {/* Upload Area */}
      <Card
        className={cn(
          "border-dashed shadow-none rounded-md transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="text-center">
          <div className="flex items-center justify-center size-[32px] rounded-full border border-border mx-auto mb-3">
            <CloudUpload className="size-4" />
          </div>
          <h3 className="text-2sm text-foreground font-semibold mb-0.5">
            Choose a file or drag & drop here.
          </h3>
          <span className="block mb-3 text-xs font-normal text-secondary-foreground">
            JPEG, PNG, up to {formatBytes(maxSize)}.
          </span>
          <Button size="sm" type="button" variant="mono" onClick={openFileDialog}>
            Browse File
          </Button>
        </CardContent>
      </Card>

      {/* Upload Progress Cards */}
      {images.length > 0 && (
        <div className="mt-6 space-y-3">
          {images.map((imageFile) => (
            <Card key={imageFile.id} className="shadow-none rounded-md">
              <CardContent className="flex items-center p-3 gap-2">
                <div className="flex items-center justify-center size-[32px] rounded-md border border-border shrink-0">
                  <ImageIcon className="size-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center justify-between gap-2.5 -mt-2 w-full">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-medium leading-none text-foreground">
                        {imageFile.file.name}
                      </span>
                      <span className="text-xs font-normal leading-none text-muted-foreground">
                        {formatBytes(imageFile.file.size)}
                      </span>
                      {imageFile.status === "uploading" && (
                        <p className="text-xs text-muted-foreground">
                          Uploading... {Math.round(imageFile.progress)}%
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={() => removeImage(imageFile.id)}
                      variant="ghost"
                      size="icon"
                      className="size-6"
                    >
                      <CircleX className="size-3.5" />
                    </Button>
                  </div>

                  <Progress
                    value={imageFile.progress}
                    className={cn(
                      "h-1 transition-all duration-300",
                      "[&>div]:bg-zinc-950 dark:[&>div]:bg-zinc-50"
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" appearance="light" className="mt-5">
          <AlertIcon>
            <TriangleAlert />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>File upload error(s)</AlertTitle>
            <AlertDescription>
              {errors.map((error, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <p key={index} className="last:mb-0">
                  {error}
                </p>
              ))}
            </AlertDescription>
          </AlertContent>
        </Alert>
      )}
    </div>
  );
}
