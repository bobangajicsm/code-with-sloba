"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "../../../new-post/page.module.scss";
import { CodeEditor } from "@/app/admin/components/code-editor";
import QuillEditor from "@/app/admin/components/quill-editor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Difficulty, Post } from "@/app/types/shared";
import SandboxTemplate from "@/app/utils/sandbox-template-enum";

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  difficulty: "easy" | "medium" | "hard";
  published: boolean;
  sandboxUrl?: string;
  sandboxTemplate?: SandboxTemplate;
  images: string[];
  code: Array<{
    title: string;
    language: string;
    code: string;
  }>;
  quiz: {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const languages = [
  { lang: "javascript" },
  { lang: "typescript" },
  { lang: "html" },
  { lang: "scss" },
  { lang: "css" },
  { lang: "less" },
  { lang: "markdown" },
  { lang: "mdx" },
  { lang: "powershell" },
  { lang: "xml" },
];

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

      // Upload new carousel images
      const uploadedImages = await Promise.all(
        carouselImages.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) throw new Error("Failed to upload image");
          const { url } = await response.json();
          return url;
        })
      );

      // Combine existing and new images
      const allImages = [...existingImages, ...uploadedImages];

      // Update the post
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images: allImages,
        }),
      });

      if (!response.ok) throw new Error("Failed to update post");

      toast.success("Post updated successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setCarouselImages((prev) => [...prev, ...Array.from(files)]);
  };

  const removeImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch both resources in parallel
        const [categoriesResponse, postResponse] = await Promise.all([
          fetch("/api/categories"),
          fetch(`/api/posts/${params.id}`),
        ]);

        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");
        if (!postResponse.ok) throw new Error("Failed to fetch post");

        const [categoriesData, postData] = await Promise.all([
          categoriesResponse.json(),
          postResponse.json(),
        ]);

        setCategories(categoriesData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PostFormData>();

  // Set initial form data when post is fetched
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        content: post.content,
        categoryId: post.categoryId,
        difficulty: post.difficulty?.toLowerCase() as Difficulty,
        published: post.published,
        sandboxUrl: post.sandboxUrl || "",
        sandboxTemplate: post.sandboxTemplate,
        quiz: post.quiz || {
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
        },
      });
      setExistingImages(post.images || []);
    }
  }, [post, reset]);

  // ... (keeping all the existing handlers)

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Blog Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Existing fields (title, slug, category, difficulty) remain the same */}
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className={styles.input}
            placeholder="Post title"
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Slug</label>
          <input
            {...register("slug", { required: "Slug is required" })}
            className={styles.input}
            placeholder="post-url-slug"
          />
          {errors.slug && (
            <span className={styles.error}>{errors.slug.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            {...register("categoryId", { required: "Category is required" })}
            className={styles.select}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <span className={styles.error}>{errors.categoryId.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Difficulty</label>
          <select {...register("difficulty")} className={styles.select}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* New fields for sandbox */}
        <div className={styles.formGroup}>
          <label>Sandbox URL (optional)</label>
          <input
            {...register("sandboxUrl")}
            className={styles.input}
            placeholder="CodeSandbox URL"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Sandbox Template (optional)</label>
          <select {...register("sandboxTemplate")} className={styles.select}>
            {Object.values(SandboxTemplate).map((template) => (
              <option key={template} value={template}>
                {template.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Existing Images */}
        <div className={styles.formGroup}>
          <label>Existing Images</label>
          <div className={styles.imagePreview}>
            {existingImages.map((imageUrl, index) => (
              <div key={index} className={styles.previewItem}>
                <Image
                  width={400}
                  height={400}
                  src={imageUrl}
                  alt={`Existing ${index}`}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* New Images Upload */}
        <div className={styles.formGroup}>
          <label>Add New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.fileInput}
          />
          <div className={styles.imagePreview}>
            {carouselImages.map((image, index) => (
              <div key={index} className={styles.previewItem}>
                <Image
                  width={400}
                  height={400}
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className={styles.formGroup}>
          <label>Content</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "Content is required" }}
            render={({ field: { onChange, value = "" } }) => (
              <QuillEditor value={value} onChange={onChange} />
            )}
          />
          {errors.content && (
            <span className={styles.error}>{errors.content.message}</span>
          )}
        </div>

        {/* Quiz Section */}
        <div className={styles.formGroup}>
          <h3>Quiz</h3>
          <input
            {...register("quiz.question", { required: "Question is required" })}
            placeholder="Question"
            className={styles.input}
          />
          {errors.quiz?.question && (
            <span className={styles.error}>{errors.quiz.question.message}</span>
          )}

          <input
            {...register("quiz.optionA", { required: "Option A is required" })}
            placeholder="Option A"
            className={styles.input}
          />
          <input
            {...register("quiz.optionB", { required: "Option B is required" })}
            placeholder="Option B"
            className={styles.input}
          />
          <input
            {...register("quiz.optionC", { required: "Option C is required" })}
            placeholder="Option C"
            className={styles.input}
          />
          <input
            {...register("quiz.optionD", { required: "Option D is required" })}
            placeholder="Option D"
            className={styles.input}
          />

          <select
            {...register("quiz.correctAnswer", {
              required: "Correct answer is required",
            })}
            className={styles.select}
          >
            <option value="">Select correct answer</option>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
            <option value="optionC">Option C</option>
            <option value="optionD">Option D</option>
          </select>
        </div>

        {/* Published Status */}
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              {...register("published")}
              className={styles.checkbox}
            />
            Published
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
