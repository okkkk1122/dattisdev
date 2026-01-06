'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye, Tag } from 'lucide-react';
import Button from '@/components/common/Button';
import { categoryMap } from '@/lib/data/mockData';
import { usePortfolioStore } from '@/lib/stores/portfolioStore';
import { toast } from 'react-hot-toast';

export default function PortfolioAdminPage() {
  const { projects, deleteProject, addProject, updateProject } = usePortfolioStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  
  // Use projects directly from store - Zustand will automatically re-render when store updates
  const typedProjects = projects;
  const [formData, setFormData] = useState({
    title: '',
    category: 'web' as 'web' | 'app' | 'bot' | 'software',
    description: '',
    technologies: '',
    link: '',
    status: 'فعال' as 'فعال' | 'غیرفعال',
  });

  const filteredProjects = typedProjects.filter((project: any) => {
    const categoryName = categoryMap[project.category as keyof typeof categoryMap] || project.category;
    return project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این پروژه را حذف کنید؟')) {
      try {
        deleteProject(id);
        toast.success('پروژه با موفقیت حذف شد');
        // Force re-render by updating search term
        setSearchTerm((prev) => prev + ' ');
        setTimeout(() => setSearchTerm((prev) => prev.trim()), 0);
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('خطا در حذف پروژه');
      }
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: project.technologies.join(', '),
      link: project.link,
      status: project.status,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'web',
      description: '',
      technologies: '',
      link: '',
      status: 'فعال',
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        link: formData.link,
        status: formData.status,
        image: '/images/portfolio1.jpg',
        date: editingProject ? editingProject.date : new Date().toISOString().split('T')[0],
      };

      if (editingProject) {
        updateProject(editingProject.id, projectData);
        toast.success('پروژه با موفقیت به‌روزرسانی شد');
      } else {
        addProject(projectData);
        toast.success('پروژه جدید با موفقیت اضافه شد');
      }

      setShowModal(false);
      setEditingProject(null);
      // Force re-render
      setSearchTerm((prev) => prev + ' ');
      setTimeout(() => setSearchTerm((prev) => prev.trim()), 0);
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('خطا در ذخیره پروژه');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مدیریت نمونه کارها
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            مدیریت و ویرایش پروژه‌های نمونه کار
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={20} className="mr-2" />
          افزودن پروژه
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="جستجو پروژه..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gradient-to-br from-primary-500 to-secondary-500 relative">
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full text-sm font-semibold flex items-center space-x-2 space-x-reverse">
                  <Tag size={14} />
                  <span>{categoryMap[project.category as keyof typeof categoryMap] || project.category}</span>
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Eye size={16} />
                  <span>{project.views}</span>
                </div>
                <span>{project.date}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {project.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'فعال'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {project.status}
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-primary-600 hover:text-primary-900 dark:text-primary-400"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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

      {/* Modal for Add/Edit Project */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingProject ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  عنوان پروژه
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
                  دسته‌بندی
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="web">وب‌سایت</option>
                  <option value="app">اپلیکیشن</option>
                  <option value="bot">ربات</option>
                  <option value="software">نرم‌افزار</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  توضیحات
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  تکنولوژی‌ها (جدا شده با کاما)
                </label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, PostgreSQL"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  لینک پروژه
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  وضعیت
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="فعال">فعال</option>
                  <option value="غیرفعال">غیرفعال</option>
                </select>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  انصراف
                </Button>
                <Button type="submit" className="flex-1">
                  {editingProject ? 'ذخیره تغییرات' : 'افزودن'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

