import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";
import { Container } from "../components";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        console.log(posts);
        const newPosts = posts.documents;
        setPosts(newPosts);
      }
    });
  }, []);
  console.log(posts);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard
                  $id={post.$id}
                  title={post.title}
                  featuredImage={post.featuredImage}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
