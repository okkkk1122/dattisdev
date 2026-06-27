'use client';

import { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import Button from '@/components/common/Button';
import { useTestimonialsStore } from '@/lib/stores/testimonialsStore';
import { toast } from 'react-hot-toast';

export default function TestimonialsAdminPage() {
  const { testimonials, deleteTestimonial } = useTestimonialsStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = testimonials.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این نظر را حذف کنید؟')) {
      deleteTestimonial(id);
      toast.success('نظر حذف شد');
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مدیریت نظرات</h1>
        <div className="relative max-w-md w-full">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو..."
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {item.role} {item.company ? `— ${item.company}` : ''}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">نظری یافت نشد</p>
        )}
      </div>
    </div>
  );
}
