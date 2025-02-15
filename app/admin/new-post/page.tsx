"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./page.module.scss";
import { CodeEditor } from "@/app/admin/components/code-editor";
import QuillEditor from "@/app/admin/components/quill-editor";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  difficulty: "easy" | "medium" | "hard";
  published: boolean;
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
export default function NewPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSnippets, setCodeSnippets] = useState([
    {
      title: "",
      language: "javascript",
      code: "",
    },
  ]);
  const [carouselImages, setCarouselImages] = useState<File[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

      // Upload carousel images
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

      // Create the post with all data
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images: uploadedImages,
          code: codeSnippets,
        }),
      });

      if (!response.ok) throw new Error("Failed to create post");

      router.push("/admin");
    } catch (error) {
      console.error("Error creating post:", error);
      // You could add a toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setCarouselImages((prev) => [...prev, ...Array.from(files)]);
  };

  const addCodeSnippet = () => {
    setCodeSnippets((prev) => [
      ...prev,
      { title: "", language: "javascript", code: "" },
    ]);
  };

  const removeCodeSnippet = (index: number) => {
    setCodeSnippets((prev) => prev.filter((_, i) => i !== index));
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
          <label>Code Snippets</label>
          {codeSnippets.map((snippet, index) => (
            <div key={index} className={styles.codeSnippet}>
              <input
                placeholder="Snippet title"
                value={snippet.title}
                onChange={(e) => {
                  const newSnippets = [...codeSnippets];
                  newSnippets[index].title = e.target.value;
                  setCodeSnippets(newSnippets);
                }}
                className={styles.input}
              />
              <select
                value={snippet.language}
                onChange={(e) => {
                  const newSnippets = [...codeSnippets];
                  newSnippets[index].language = e.target.value;
                  setCodeSnippets(newSnippets);
                }}
                className={styles.select}
              >
                {languages.map((language) => (
                  <option key={language.lang} value={language.lang}>
                    {language.lang}
                  </option>
                ))}
              </select>
              <CodeEditor
                value={snippet.code}
                onChange={(value) => {
                  const newSnippets = [...codeSnippets];
                  newSnippets[index].code = value || "";
                  setCodeSnippets(newSnippets);
                }}
                language={snippet.language}
              />
              <button
                type="button"
                onClick={() => removeCodeSnippet(index)}
                className={styles.removeButton}
              >
                Remove Snippet
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCodeSnippet}
            className={styles.addButton}
          >
            Add Code Snippet
          </button>
        </div>

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
