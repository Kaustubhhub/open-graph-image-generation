"use client"
import { useEffect, useState } from "react"
import { PrimaryButton } from "./Button"
import { SearchBar } from "./SearchBar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Post {
    _id: string;
    title: string;
    description: string;
    file?: string; // URL or path to the image
}

const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/post');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return { posts, loading, error };
};

export default usePosts;


export const CreatePostBox = () => {
    const { posts, loading, error } = usePosts();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const handleTitleChange = (e: any) => setTitle(e.target.value);
    const handleDescriptionChange = (e: any) => setDescription(e.target.value);
    const handleSave = async () => {
        console.log('title', title);
        console.log('description', description);
        console.log('vfile', file);
        setIsOpen(false)
        try {
            // Create FormData to handle file uploads
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            if (file) {
                formData.append('file', file);
            }

            // Send POST request to your API endpoint
            console.log('formData', formData);
            const response = await fetch('/api/post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Response:', result);

            // Handle successful response (e.g., show a success message or redirect)
        } catch (er) {
            console.error('Error:', er);
        }
    }

    const handleFileChange = (e: any) => setFile(e.target.files[0]);
    if (loading) {
        return <p>Loading posts...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <>
            <div className="flex justify-center flex-col items-center w-11/12">

                <Dialog>
                    <DialogTrigger className="flex justify-center flex-col items-center w-11/12" onClick={() => (setIsOpen(true))}>
                        <div className="flex justify-center flex-col items-center w-11/12" onClick={() => (setIsOpen(true))}>
                            <div className="flex items-center justify-between p-4 border-t border-r border-l w-5/12 rounded-t-lg">
                                <div className="pl-2 w-2/12">
                                    <img
                                        className="rounded-full h-12 w-12 transition-transform duration-300 hover:scale-150"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
                                        alt="Magnifiable Image"
                                    />
                                </div>
                                <div className="w-11/12">
                                    <SearchBar placeholder="Begin Posting" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border-b border-r border-l rounded-b-lg w-5/12 border-t">
                                <div className="flex justify-center gap-4">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
                                    </span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                        </svg>

                                    </span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                        </svg>

                                    </span>
                                    <span>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#2F384C] dark:fill-[#CFCFCF]"><path d="M4 19C4 19.4167 4.14583 19.7708 4.4375 20.0625C4.72917 20.3542 5.08333 20.5 5.5 20.5L8.5 20.5C8.91667 20.5 9.27083 20.3542 9.5625 20.0625C9.85417 19.7708 10 19.4167 10 19C10 18.5833 9.85417 18.2292 9.5625 17.9375C9.27083 17.6458 8.91667 17.5 8.5 17.5L5.5 17.5C5.08333 17.5 4.72917 17.6458 4.4375 17.9375C4.14583 18.2292 4 18.5833 4 19ZM4 13C4 13.4167 4.14583 13.7708 4.4375 14.0625C4.72917 14.3542 5.08333 14.5 5.5 14.5L13.5 14.5C13.9167 14.5 14.2708 14.3542 14.5625 14.0625C14.8542 13.7708 15 13.4167 15 13C15 12.5833 14.8542 12.2292 14.5625 11.9375C14.2708 11.6458 13.9167 11.5 13.5 11.5L5.5 11.5C5.08333 11.5 4.72917 11.6458 4.4375 11.9375C4.14583 12.2292 4 12.5833 4 13ZM4 7C4 7.41667 4.14583 7.77083 4.4375 8.0625C4.72917 8.35417 5.08333 8.5 5.5 8.5L18.5 8.5C18.9167 8.5 19.2708 8.35417 19.5625 8.0625C19.8542 7.77083 20 7.41667 20 7C20 6.58333 19.8542 6.22917 19.5625 5.9375C19.2708 5.64583 18.9167 5.5 18.5 5.5L5.5 5.5C5.08333 5.5 4.72917 5.64583 4.4375 5.9375C4.14583 6.22917 4 6.58333 4 7Z"></path></svg>
                                    </span>
                                </div>
                                <div className="">
                                    <div className="bg-[#705C99] px-4 py-2 rounded-full">post</div>
                                </div>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                            <div className="text-lg font-semibold">
                                New post
                            </div>
                        </DialogTitle>
                        <div className="p-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title*</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="bg-gray-50 border block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Title"
                                    required
                                />
                            </div>
                            <div className="py-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description*</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
                                <input
                                    className="py-2 px-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="p-5">
                                <PrimaryButton onClick={() => { handleSave() }}>Post</PrimaryButton>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="w-4/12">
                {posts.map(post => (
                    <div className="pt-5">

                        <PostCard
                            key={post._id}
                            title={post.title}
                            description={post.description}
                            file={post.file}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

interface PostCardProps {
    title: string;
    description: string;
    file?: string; // Assuming file is a URL or path to the image
}

const PostCard: React.FC<PostCardProps> = ({ title, description, file }) => {
    return (
        <div className="border rounded-lg">
            <div className="p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <div className="pl-4 pr-4 pt-2">
                <p>{description}</p>
            </div>
            <div className="pl-4 pr-4 pt-2 pb-4">
                {file ? (
                    <img
                        src={file} // Display the image using the URL/path
                        alt="Post image"
                        className="w-full h-auto object-cover"
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div>
        </div>
    );
};