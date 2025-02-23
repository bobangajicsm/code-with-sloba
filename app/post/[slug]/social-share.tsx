"use client";
import React, { useState } from "react";
import { Link, Share2 } from "lucide-react";
import CustomSelect from "@/app/components/custom-select/custom-select";
import { Post } from "@prisma/client";
import styles from "./social-share.module.scss";

type SocialOption = {
  value: string;
  label: string;
};

const socialMedia: SocialOption[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "x", label: "X" },
  { value: "facebook", label: "Facebook" },
];

const SocialShare = ({ post }: { post: Post }) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    return `${window.location.origin}/post/${post.slug}`;
  };

  const handleCopy = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: "linkedin" | "x" | "facebook") => {
    const url = encodeURIComponent(getShareUrl());
    const title = encodeURIComponent(post.title || "");

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer.php?u=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className={styles.socialsShare}>
      <button className={styles.socialsShareButton} onClick={handleCopy}>
        <Link size={16} /> {copied ? "Copied!" : "Copy Link"}
      </button>
      <CustomSelect
        options={socialMedia}
        hideChevron
        value=""
        onChange={(value: string) =>
          handleShare(value as "linkedin" | "x" | "facebook")
        }
        placeholder={
          <div className={styles.socialsSharePlaceholder}>
            <Share2 size={16} /> Share
          </div>
        }
      />
    </div>
  );
};

export default SocialShare;
