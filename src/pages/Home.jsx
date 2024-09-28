import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux'; // Add this import for accessing auth state

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Get the authentication status from Redux store
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchPosts = async () => {
            // Check if user is authenticated before fetching posts
            if (!authStatus) {
                setError("Please log in to view posts.");
                setLoading(false);
                return; // Exit early if not authenticated
            }

            try {
                const response = await appwriteService.getPosts();
                if (response) {
                    setPosts(response.documents);
                }
            } catch (err) {
                console.error("Error fetching posts:", err);
                if (err.response?.status === 401) {
                    setError("You are not authorized to view these posts. Please log in.");
                } else {
                    setError("Failed to load posts. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authStatus]); // Include authStatus in the dependency array

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-xl font-bold">Loading posts...</h1>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-xl font-bold text-red-600">{error}</h1>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No posts available. Login to read posts.
                    </h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
