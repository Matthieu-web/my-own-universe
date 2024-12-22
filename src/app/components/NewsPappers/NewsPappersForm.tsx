"use client";
import { getUserPosts } from "@/actions";
import { Post } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function NewsPappersForm() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(0)

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  let formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user-posts");
      const dataJson = await response.json();

      setIsLoading(false);
      if (dataJson.posts){
        setPosts(dataJson.posts);
        setUserId(dataJson.userId);
      }
      
    };
    fetchData();
  }, []);
  if (isLoading) return <div>Is loading</div>;

  async function handleSubmit(e: any){
    e.preventDefault();
    if (content != ""){
      const response = await fetch("api/user-posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          content,
          userId

        })        
      })
      setContent("");
    }
  }
  return (
    <div className="relative mt-2 border-y-2 py-2">
      <button className="btn-with-arrow-down rounded-lg px-4 py-2 bg-white text-black">
        Cher Journal...
        <span></span>
      </button>
      <div>
        <ReactQuill
          id="my-editor"
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />

        <button
          onClick={handleSubmit}
        >
          Poster
        </button>
        <div id="posts-section">
          <div className="container-posts">
            {Array.from(posts).map((post: Post) => (
              <div className="border-2 border-white px-4 py-2 relative">
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
