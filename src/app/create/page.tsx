"use client";

import styles from "@/app/create/createPage.module.css";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { Category } from "@/types/category";
import { getAllCategories } from "@/actions/category";
import toast from "react-hot-toast";
import { FORM_DATA_FILES } from "@/actions/util";
import { createPost } from "@/actions/post";
import { CreatePost } from "@/types/post";
import { useRouter } from "next/navigation";

function CreatePage() {
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [imgFormData, setImgFormData] = useState<FormData | null>(null);
  const [post, setPost] = useState<CreatePost>({
    title: "",
    categorySlug: "",
    description: "",
  });

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories(data.categories);
      // and set first category slug for the post
      setPost({ ...post, categorySlug: data.categories[0].slug });
    });
  }, []);

  const handlePublish = async () => {
    const response = await createPost(post, imgFormData);
    if (response.status === "error") {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);

    // clean
    setImgFormData(null);
    setPost({
      title: "",
      categorySlug: "",
      description: "",
    });

    router.push("/");
  };

  const handleImgUpload = async (files: FileList | null) => {
    if (files === null || files[0] === null) {
      toast.error("Error when selecting file!");
      return;
    }

    const formData = new FormData();
    formData.append(FORM_DATA_FILES, files[0]);

    setImgFormData(formData);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <div className={styles.middle}>
        <div className={styles.selects}>
          <span className={styles.category}>Select Category</span>
          <select
            className={styles.select}
            onChange={(e) => setPost({ ...post, categorySlug: e.target.value })}
          >
            {categories.map((category, index) => (
              <option value={category.slug} key={index}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.publish} onClick={handlePublish}>
          Publish Post
        </button>
      </div>
      <div className={styles.editor}>
        <input
          type="file"
          id="imgFile"
          accept="image/*"
          onChange={(e) => handleImgUpload(e.target.files)}
          className={styles.fileBrowser}
        />
        <label htmlFor="imgFile">
          <div className={styles.button}>
            <Image src="/image.png" alt="plus" width={20} height={20} />
          </div>
        </label>

        {/* description string will be sanitized on the server side before insert to db */}
        <ReactQuill
          theme="bubble"
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e })}
          placeholder="Tell your story..."
          className={styles.textArea}
        />
      </div>
    </div>
  );
}

export default CreatePage;
