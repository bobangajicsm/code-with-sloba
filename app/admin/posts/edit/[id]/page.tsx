"use client";

import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import styles from "../../../new-post/page.module.scss";
import { CodeEditor } from "@/app/admin/components/code-editor";
import QuillEditor from "@/app/admin/components/quill-editor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Difficulty, Post, Quiz as SharedQuiz } from "@/app/types/shared";
import SandboxTemplate from "@/app/utils/sandbox-template-enum";

interface QuizQuestion {
  id?: string; // Optional for new quizzes
  question: string;
  optionA: string;
  optionB: string;
  optionC?: string;
  optionD?: string;
  correctAnswer: string;
}

interface Quiz {
  id?: string; // Optional for new quizzes
  order: number;
  postId?: string; // Optional for new quizzes
  quiz: QuizQuestion;
}

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  description: string;
  tags: string[];
  categoryId: string;
  difficulty: "easy" | "medium" | "hard";
  published: boolean;
  sandboxUrl?: string;
  sandboxTemplate?: SandboxTemplate;
  images: string[];
  quizzes: QuizQuestion[]; // Store only the question data in the form
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function EditPost({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
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
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quizzes",
  });

  // Handle tag addition
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const currentTags = getValues("tags") || [];
      const newTag = tagInput.trim().toLowerCase();
      if (!currentTags.includes(newTag)) {
        setValue("tags", [...currentTags, newTag]);
      }
      setTagInput("");
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = getValues("tags");
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
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
        toast.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

      const transformedQuizzes: Quiz[] = data.quizzes.map(
        (quizQuestion, index) => ({
          order: index,
          postId: params.id,
          quiz: {
            id: quizQuestion.id,
            ...quizQuestion,
          },
        })
      );

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

      const allImages = [...existingImages, ...uploadedImages];

      // Cast the transformed quizzes to unknown first, then to SharedQuiz[]
      const apiQuizzes = transformedQuizzes as unknown as SharedQuiz[];

      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images: allImages,
          quizzes: apiQuizzes,
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
  // Set initial form data when post is fetched
  useEffect(() => {
    if (post) {
      // First cast to unknown, then to our local Quiz type
      const postQuizzes = post.quizzes as unknown as Quiz[];

      const transformedQuizzes: QuizQuestion[] = postQuizzes?.map(
        (quizItem) => ({
          id: quizItem.quiz.id,
          question: quizItem.quiz.question,
          optionA: quizItem.quiz.optionA,
          optionB: quizItem.quiz.optionB,
          optionC: quizItem.quiz.optionC,
          optionD: quizItem.quiz.optionD,
          correctAnswer: quizItem.quiz.correctAnswer,
        })
      ) || [
        {
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
        },
      ];

      reset({
        title: post.title,
        slug: post.slug,
        content: post.content,
        description: post.description || "",
        tags: post.tags || [],
        categoryId: post.categoryId,
        difficulty: post.difficulty?.toLowerCase() as Difficulty,
        published: post.published,
        sandboxUrl: post.sandboxUrl || "",
        sandboxTemplate: post.sandboxTemplate,
        quizzes: transformedQuizzes,
      });
      setExistingImages(post.images || []);
    }
  }, [post, reset]);

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

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description cannot exceed 500 characters",
              },
            })}
            className={styles.textarea}
            placeholder="Enter a brief description of your post"
            rows={3}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Tags</label>
          <div className={styles.tagInput}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              className={styles.input}
              placeholder="Enter tags and press Enter"
            />
          </div>
          <div className={styles.tagList}>
            {watch("tags")?.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className={styles.removeTag}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
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
          <label>Carousel Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.fileInput}
          />
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

        <div className={`${styles.formGroup} ${styles.quillCont}`}>
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
