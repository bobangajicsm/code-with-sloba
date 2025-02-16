"use client";

import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styles from "./page.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SandboxTemplate from "@/app/utils/sandbox-template-enum";
import QuillEditor from "@/app/admin/components/quill-editor";

interface Quiz {
  question: string;
  optionA: string;
  optionB: string;
  optionC?: string; // Made optional
  optionD?: string; // Made optional
  correctAnswer: string;
}

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  difficulty: "easy" | "medium" | "hard";
  published: boolean;
  images: string[];
  sandboxUrl?: string;
  sandboxTemplate?: SandboxTemplate;
  quizzes: Quiz[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function NewPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      quizzes: [
        {
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quizzes",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

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

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images: uploadedImages,
        }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      router.push("/admin");
    } catch (error) {
      console.error("Error creating post:", error);
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
    setCarouselImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create New Blog Post</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
            disabled={isLoadingCategories}
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

        <div className={styles.formGroup}>
          <label>Carousel Images</label>
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
                  onClick={() => removeImage(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

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

        <div className={styles.formGroup}>
          <div className={styles.quizHeader}>
            <h3>Quizzes</h3>
            <button
              type="button"
              onClick={() =>
                append({
                  question: "",
                  optionA: "",
                  optionB: "",
                  optionC: "",
                  optionD: "",
                  correctAnswer: "",
                })
              }
              className={styles.addQuizButton}
            >
              Add New Quiz
            </button>
          </div>

          {fields.map((field, index) => {
            const questionPrefix = `quizzes.${index}` as const;
            // Watch the values of optionC and optionD to determine if they should be included in correctAnswer options
            const optionC = watch(`${questionPrefix}.optionC`);
            const optionD = watch(`${questionPrefix}.optionD`);

            return (
              <div key={field.id} className={styles.quizContainer}>
                <div className={styles.quizHeader}>
                  <h4>Quiz {index + 1}</h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className={styles.removeQuizButton}
                    >
                      Remove Quiz
                    </button>
                  )}
                </div>
                <div className={styles.quizInputs}>
                  <input
                    {...register(`${questionPrefix}.question`, {
                      required: "Question is required",
                    })}
                    placeholder="Question"
                    className={styles.input}
                  />
                  {errors.quizzes?.[index]?.question && (
                    <span className={styles.error}>
                      {errors.quizzes[index]?.question?.message}
                    </span>
                  )}

                  <input
                    {...register(`${questionPrefix}.optionA`, {
                      required: "Option A is required",
                    })}
                    placeholder="Option A (required)"
                    className={styles.input}
                  />
                  {errors.quizzes?.[index]?.optionA && (
                    <span className={styles.error}>
                      {errors.quizzes[index]?.optionA?.message}
                    </span>
                  )}

                  <input
                    {...register(`${questionPrefix}.optionB`, {
                      required: "Option B is required",
                    })}
                    placeholder="Option B (required)"
                    className={styles.input}
                  />
                  {errors.quizzes?.[index]?.optionB && (
                    <span className={styles.error}>
                      {errors.quizzes[index]?.optionB?.message}
                    </span>
                  )}

                  <input
                    {...register(`${questionPrefix}.optionC`)}
                    placeholder="Option C (optional)"
                    className={styles.input}
                  />

                  <input
                    {...register(`${questionPrefix}.optionD`)}
                    placeholder="Option D (optional)"
                    className={styles.input}
                  />

                  <select
                    {...register(`${questionPrefix}.correctAnswer`, {
                      required: "Correct answer is required",
                    })}
                    className={styles.select}
                  >
                    <option value="">Select correct answer</option>
                    <option value="optionA">Option A</option>
                    <option value="optionB">Option B</option>
                    {optionC && <option value="optionC">Option C</option>}
                    {optionD && <option value="optionD">Option D</option>}
                  </select>
                  {errors.quizzes?.[index]?.correctAnswer && (
                    <span className={styles.error}>
                      {errors.quizzes[index]?.correctAnswer?.message}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Keep the published checkbox and submit button */}
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              {...register("published")}
              className={styles.checkbox}
            />
            Publish immediately
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
