'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import Button from '@/components/common/Button';
import { useFAQStore } from '@/lib/stores/faqStore';
import { toast } from 'react-hot-toast';

export default function FAQAdminPage() {
  const { faqs, deleteFAQ, addFAQ, updateFAQ } = useFAQStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [formData, setFormData] = useState({
    question: '',
    questionEn: '',
    questionAr: '',
    answer: '',
    answerEn: '',
    answerAr: '',
    category: 'عمومی' as 'خدمات' | 'قیمت' | 'فنی' | 'عمومی',
    status: 'فعال' as 'فعال' | 'غیرفعال',
    order: 0,
  });

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این سوال را حذف کنید؟')) {
      try {
        deleteFAQ(id);
        toast.success('سوال با موفقیت حذف شد');
        setSearchTerm('');
      } catch (error) {
        toast.error('خطا در حذف سوال');
      }
    }
  };

  const handleEdit = (faq: any) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      questionEn: faq.questionEn,
      questionAr: faq.questionAr,
      answer: faq.answer,
      answerEn: faq.answerEn,
      answerAr: faq.answerAr,
      category: faq.category,
      status: faq.status,
      order: faq.order,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingFAQ(null);
    setFormData({
      question: '',
      questionEn: '',
      questionAr: '',
      answer: '',
      answerEn: '',
      answerAr: '',
      category: 'عمومی',
      status: 'فعال',
      order: faqs.length + 1,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingFAQ) {
        updateFAQ(editingFAQ.id, formData);
        toast.success('سوال با موفقیت به‌روزرسانی شد');
      } else {
        addFAQ(formData);
        toast.success('سوال جدید با موفقیت اضافه شد');
      }
      setShowModal(false);
      setEditingFAQ(null);
      setSearchTerm('');
    } catch (error) {
      toast.error('خطا در ذخیره سوال');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مدیریت سوالات متداول
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            مدیریت و ویرایش سوالات متداول
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={20} className="mr-2" />
          افزودن سوال
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="جستجو سوال..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">همه دسته‌ها</option>
          <option value="خدمات">خدمات</option>
          <option value="قیمت">قیمت</option>
          <option value="فنی">فنی</option>
          <option value="عمومی">عمومی</option>
        </select>
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
                    {faq.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      faq.status === 'فعال'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {faq.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {faq.answer}
                </p>
                <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Eye size={16} />
                    <span>{faq.views} بازدید</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <ThumbsUp size={16} />
                    <span>{faq.helpful} مفید</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <ThumbsDown size={16} />
                    <span>{faq.notHelpful} غیرمفید</span>
                  </div>
                  <span>ترتیب: {faq.order}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse mr-4">
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-2 text-primary-600 hover:text-primary-800 dark:text-primary-400"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>سوالی یافت نشد</p>
        </div>
      )}

      {/* Modal for Add/Edit FAQ */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingFAQ ? 'ویرایش سوال' : 'افزودن سوال جدید'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    سوال (فارسی)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    سوال (انگلیسی)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.questionEn}
                    onChange={(e) => setFormData({ ...formData, questionEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    سوال (عربی)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.questionAr}
                    onChange={(e) => setFormData({ ...formData, questionAr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    پاسخ (فارسی)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    پاسخ (انگلیسی)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.answerEn}
                    onChange={(e) => setFormData({ ...formData, answerEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    پاسخ (عربی)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.answerAr}
                    onChange={(e) => setFormData({ ...formData, answerAr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    دسته‌بندی
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="خدمات">خدمات</option>
                    <option value="قیمت">قیمت</option>
                    <option value="فنی">فنی</option>
                    <option value="عمومی">عمومی</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    وضعیت
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="فعال">فعال</option>
                    <option value="غیرفعال">غیرفعال</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ترتیب نمایش
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingFAQ(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  انصراف
                </Button>
                <Button type="submit" className="flex-1">
                  {editingFAQ ? 'ذخیره تغییرات' : 'افزودن'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}






