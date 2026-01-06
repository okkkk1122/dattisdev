'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import Button from '@/components/common/Button';
import { usePostsStore } from '@/lib/stores/postsStore';
import { toast } from 'react-hot-toast';

export default function PostsPage() {
  const store = usePostsStore();
  const { posts, deletePost, addPost, updatePost } = store;
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: 'طراحی',
    content: '',
    status: 'پیش‌نویس',
    tags: '',
  });

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این مقاله را حذف کنید؟')) {
      try {
        deletePost(id);
        toast.success('مقاله با موفقیت حذف شد');
        // Force re-render
        setSearchTerm((prev) => prev + ' ');
        setTimeout(() => setSearchTerm((prev) => prev.trim()), 0);
      } catch (error) {
        console.error('Error deleting post:', error);
        toast.error('خطا در حذف مقاله');
      }
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      category: post.category,
      content: post.content || '',
      status: post.status,
      tags: post.tags.join(', '),
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      author: '',
      category: 'طراحی',
      content: '',
      status: 'پیش‌نویس',
      tags: '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        title: formData.title,
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category,
        content: formData.content,
        status: formData.status as 'منتشر شده' | 'پیش‌نویس',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        image: '/images/blog1.jpg',
        date: editingPost ? editingPost.date : new Date().toISOString().split('T')[0],
      };

      if (editingPost) {
        updatePost(editingPost.id, postData);
        toast.success('مقاله با موفقیت به‌روزرسانی شد');
      } else {
        addPost(postData);
        toast.success('مقاله جدید با موفقیت اضافه شد');
      }

      setShowModal(false);
      setEditingPost(null);
      // Force re-render
      setSearchTerm((prev) => prev + ' ');
      setTimeout(() => setSearchTerm((prev) => prev.trim()), 0);
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('خطا در ذخیره مقاله');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مدیریت مقالات
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            مدیریت و ویرایش مقالات بلاگ
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={20} className="mr-2" />
          افزودن مقاله
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="جستجو مقاله..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 relative">
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Eye size={16} />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                نویسنده: {post.author}
              </p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  post.status === 'منتشر شده'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {post.status}
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-primary-600 hover:text-primary-900 dark:text-primary-400"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-red-600 hover:text-red-900 dark:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Add/Edit Post */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingPost ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عنوان
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  خلاصه
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  نویسنده
                </label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  دسته‌بندی
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option>طراحی</option>
                  <option>توسعه</option>
                  <option>ربات</option>
                  <option>بهینه‌سازی</option>
                  <option>امنیت</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  تگ‌ها (جدا شده با کاما)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="UI/UX, طراحی, ترند"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  محتوا
                </label>
                <textarea
                  rows={10}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  وضعیت
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option>پیش‌نویس</option>
                  <option>منتشر شده</option>
                </select>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPost(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  انصراف
                </Button>
                <Button type="submit" className="flex-1">
                  {editingPost ? 'ذخیره تغییرات' : 'افزودن'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

