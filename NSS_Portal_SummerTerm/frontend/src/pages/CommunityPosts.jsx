// import React, { useState, useEffect } from 'react';
// import axios from '../services/http.service';
// import authService from '../services/auth.service';
// import { FaPlus } from 'react-icons/fa';

// const CommunityPosts = () => {
//     const [posts, setPosts] = useState([]);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         content: '',
//         category: 'suggestion',
//     });
//     const [error, setError] = useState('');
//     const [view, setView] = useState('view');
//     const [user, setUser] = useState(null);
//     const [filter, setFilter] = useState('all');

//     useEffect(() => {
//         fetchPosts();
//         const token = authService.getJwt();
//         if (token) {
//             try {
//                 const user = authService.getCurrentUser();
//                 setUser(user);
//             } catch (error) {
//                 console.error("Error getting current user:", error);
//                 // Handle the error appropriately, e.g., redirect to login
//             }
//         }
//     }, [filter]);

//     const fetchPosts = async () => {
//         try {
//             const res = await axios.get('/posts/all');
//             setPosts(res.data);
//         } catch (error) {
//             setError('Failed to fetch posts');
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const postData = {
//                 ...formData,
//                 user: user ? user.email : null,
//             };
//             if (view === 'add') {
//                 await axios.post('/posts/add', postData);
//             } else if (view === 'update') {
//                 await axios.put(`/posts/update/${selectedPost._id}`, postData);
//             }
//             fetchPosts();
//             setView('view');
//             setFormData({
//                 title: '',
//                 content: '',
//                 category: 'suggestion',
//             });
//         } catch (error) {
//             setError('Failed to submit post');
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`/posts/delete/${id}`);
//             fetchPosts();
//         } catch (error) {
//             setError('Failed to delete post');
//         }
//     };

//     const handleEdit = (post) => {
//         setSelectedPost(post);
//         setFormData({
//             title: post.title,
//             content: post.content,
//             category: post.category,
//         });
//         setView('update');
//     };

//     const handleCancel = () => {
//         setView('view');
//         setFormData({
//             title: '',
//             content: '',
//             category: 'suggestion',
//         });
//     };

//     const handleFilterChange = (e) => {
//         setFilter(e.target.value);
//     };

//     const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.category === filter);
//     const reversedPosts = [...filteredPosts].reverse(); // Reverse the order of posts

//     return (
//         <div className="p-8 max-w-3xl mx-auto">
//             <header className="bg-gray-800 text-white py-4 px-6 rounded-t-lg mb-4">
//                 <h1 className="text-2xl font-bold">NSS COMMUNITY</h1>
              
//             </header>
//             {error && <div className="mb-4 text-red-500">{error}</div>}
//             {view === 'view' && (
//                 <div>
//                     <div className="mb-4 flex items-center space-x-4">
//                     <button
//                     onClick={() => setView('add')}
//                     className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600"
//                 >
//                     Add A Post
//                 </button>
//                         <select
//                             value={filter}
//                             onChange={handleFilterChange}
//                             className="border rounded-md p-2"
//                         >
//                             <option value="all">All Categories</option>
//                             <option value="suggestion">Suggestion</option>
//                             <option value="complain">Complain</option>
//                             <option value="idea">Idea</option>
//                         </select>
//                         <button
//                             onClick={() => setFilter('all')}
//                             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//                         >
//                             Clear Filters
//                         </button>
//                     </div>
//                     <ul>
//                         {reversedPosts.map((post) => (
//                             <li key={post._id} className="mb-4">
//                                 <div className="p-4 bg-white border rounded-md shadow-md">
//                                     <h4 className="text-lg font-bold">{post.title}</h4>
//                                     <p className="mt-2">{post.content}</p>
//                                     <p className="italic mt-2">Category: {post.category}</p>
//                                     <p className="text-sm text-gray-500 mt-1">Posted by: {post.user}</p>
//                                     {user && user.email === post.user && (
//                                         <div className="mt-4 flex space-x-2">
//                                             <button onClick={() => handleEdit(post)} className="btn btn-primary">Edit</button>
//                                             <button onClick={() => handleDelete(post._id)} className="btn btn-danger">Delete</button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     <button
//                         onClick={() => setView('add')}
//                         className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
//                     >
//                         <FaPlus size={24} />
//                     </button>
//                 </div>
//             )}
//             {(view === 'add' || view === 'update') && (
//                 <div className="bg-white p-6 rounded-md shadow-md">
//                     <h3 className="mb-4 text-lg font-semibold">{view === 'add' ? 'Add Post' : 'Update Post'}</h3>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Title</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Content</label>
//                             <textarea
//                                 name="content"
//                                 value={formData.content}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Category</label>
//                             <select
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleChange}
//                                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                 required
//                             >
//                                 <option value="suggestion">Suggestion</option>
//                                 <option value="complain">Complain</option>
//                                 <option value="idea">Idea</option>
//                             </select>
//                         </div>
//                         <div className="flex space-x-4">
//                             <button
//                                 type="submit"
//                                 className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//                             >
//                                 {view === 'add' ? 'Add Post' : 'Update Post'}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleCancel}
//                                 className="w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CommunityPosts;
import React, { useState, useEffect } from 'react';
import axios from '../services/http.service';
import authService from '../services/auth.service';
import { FaPlus, FaComment } from 'react-icons/fa';
import moment from 'moment';

const CommunityPosts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'suggestion',
    });
    const [commentData, setCommentData] = useState({
        content: '',
    });
    const [error, setError] = useState('');
    const [view, setView] = useState('view');
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState('all');
    const [showComments, setShowComments] = useState({});

    useEffect(() => {
        fetchPosts();
        const token = authService.getJwt();
        if (token) {
            try {
                const user = authService.getCurrentUser();
                setUser(user);
            } catch (error) {
                console.error("Error getting current user:", error);
            }
        }
    }, [filter]);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('/posts/all');
            setPosts(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        } catch (error) {
            setError('Failed to fetch posts');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCommentChange = (e) => {
        setCommentData({
            ...commentData,
            content: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                ...formData,
                user: user ? user.email : null,
            };
            if (view === 'add') {
                await axios.post('/posts/add', postData);
            } else if (view === 'update') {
                await axios.put(`/posts/update/${selectedPost._id}`, postData);
            }
            fetchPosts();
            setView('view');
            setFormData({
                title: '',
                content: '',
                category: 'suggestion',
            });
        } catch (error) {
            setError('Failed to submit post');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/posts/delete/${id}`);
            fetchPosts();
        } catch (error) {
            setError('Failed to delete post');
        }
    };

    const handleEdit = (post) => {
        setSelectedPost(post);
        setFormData({
            title: post.title,
            content: post.content,
            category: post.category,
        });
        setView('update');
    };

    const handleCancel = () => {
        setView('view');
        setFormData({
            title: '',
            content: '',
            category: 'suggestion',
        });
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleAddComment = async (postId) => {
        try {
            await axios.post(`/posts/${postId}/comment`, commentData);
            setCommentData({ content: '' });
            fetchPosts();
        } catch (error) {
            setError('Failed to add comment');
        }
    };

    const toggleComments = (postId) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.category === filter);

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <header className="bg-gray-800 text-white py-4 px-6 rounded-t-lg mb-4">
                <h1 className="text-2xl font-bold">NSS COMMUNITY</h1>
            </header>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            {view === 'view' && (
                <div>
                    <div className="mb-4 flex items-center space-x-4">
                        <button
                            onClick={() => setView('add')}
                            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600"
                        >
                            Add A Post
                        </button>
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="border rounded-md p-2"
                        >
                            <option value="all">All Categories</option>
                            <option value="suggestion">Suggestion</option>
                            <option value="complain">Complain</option>
                            <option value="idea">Idea</option>
                        </select>
                        <button
                            onClick={() => setFilter('all')}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Clear Filters
                        </button>
                    </div>
                    <ul>
                        {filteredPosts.map((post) => (
                            <li key={post._id} className="mb-4">
                                <div className="p-4 bg-white border rounded-md shadow-md">
                                    <h4 className="text-lg font-bold">{post.title}</h4>
                                    <p className="mt-2">{post.content}</p>
                                    <p className="italic mt-2">Category: {post.category}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Posted by: {post.user} on {moment(post.date).format('MMMM D, YYYY [at] h:mm A')}
                                    </p>
                                    {user && user.email === post.user && (
                                        <div className="mt-4 flex space-x-2">
                                            <button onClick={() => handleEdit(post)} className="btn btn-primary">Edit</button>
                                            <button onClick={() => handleDelete(post._id)} className="btn btn-danger">Delete</button>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <button
                                            onClick={() => toggleComments(post._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                                        >
                                            {showComments[post._id] ? 'Hide Comments' : 'View Comments'}
                                        </button>
                                        {showComments[post._id] && (
                                            <div className="mt-4">
                                                <h5 className="font-bold">Comments:</h5>
                                                {post.comments.sort((a, b) => new Date(b.date) - new Date(a.date)).map((comment) => (
                                                    <div key={comment._id} className="bg-gray-100 p-2 rounded-md mt-2">
                                                        <p>{comment.content}</p>
                                                        <p className="text-xs text-gray-500">
                                                            By: {comment.user} on {moment(comment.date).format('MMMM D, YYYY [at] h:mm A')}
                                                        </p>
                                                    </div>
                                                ))}
                                                <div className="mt-4">
                                                    <textarea
                                                        value={commentData.content}
                                                        onChange={handleCommentChange}
                                                        className="w-full p-2 border rounded-md"
                                                        placeholder="Add a comment..."
                                                    />
                                                    <button
                                                        onClick={() => handleAddComment(post._id)}
                                                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                                    >
                                                        Add Comment
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setView('add')}
                        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
                    >
                        <FaPlus size={24} />
                    </button>
                </div>
            )}
            {(view === 'add' || view === 'update') && (
                <div className="bg-white p-6 rounded-md shadow-md">
                    <h3 className="mb-4 text-lg font-semibold">{view === 'add' ? 'Add Post' : 'Update Post'}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            >
                                <option value="suggestion">Suggestion</option>
                                <option value="complain">Complain</option>
                                <option value="idea">Idea</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            >
                                {view === 'add' ? 'Add Post' : 'Update Post'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CommunityPosts;