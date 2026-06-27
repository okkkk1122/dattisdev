'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import Button from '@/components/common/Button';
import { usePricingStore, PricingFeature, PricingPlan } from '@/lib/stores/pricingStore';
import { formatUsdFromRial } from '@/lib/i18n/localeHelpers';
import { contentApi } from '@/lib/api/content';
import { toast } from 'react-hot-toast';

function resolvePlanPrices(plan: PricingPlan) {
  const priceRial =
    plan.priceRial ??
    (plan.price
      ? !plan.currency || plan.currency.includes('تومان')
        ? plan.price * 10
        : plan.price
      : 0);
  const priceUsd = plan.priceUsd ?? 0;
  return { priceRial, priceUsd };
}

export default function PricingAdminPage() {
  const { plans, deletePlan, addPlan, updatePlan } = usePricingStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [filterService, setFilterService] = useState('all');
  const [usdToRialRate, setUsdToRialRate] = useState(420000);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    nameAr: '',
    description: '',
    descriptionEn: '',
    descriptionAr: '',
    priceRial: 0,
    priceUsd: 0,
    period: 'one-time' as 'monthly' | 'yearly' | 'one-time',
    service: 'web' as 'web' | 'app' | 'bot' | 'software' | 'all',
    status: 'فعال' as 'فعال' | 'غیرفعال',
    popular: false,
    features: [] as PricingFeature[],
  });
  const [newFeature, setNewFeature] = useState({
    name: '',
    nameEn: '',
    nameAr: '',
    included: true,
  });

  useEffect(() => {
    contentApi
      .getSettings()
      .then(({ data }) => {
        const rate = Number(data.usdToRialRate);
        if (rate > 0) setUsdToRialRate(rate);
      })
      .catch(() => {});
  }, []);

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === 'all' || plan.service === filterService;
    return matchesSearch && matchesService;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این پکیج را حذف کنید؟')) {
      try {
        deletePlan(id);
        toast.success('پکیج با موفقیت حذف شد');
        setSearchTerm('');
      } catch (error) {
        toast.error('خطا در حذف پکیج');
      }
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    const { priceRial, priceUsd } = resolvePlanPrices(plan);
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      nameEn: plan.nameEn,
      nameAr: plan.nameAr,
      description: plan.description,
      descriptionEn: plan.descriptionEn,
      descriptionAr: plan.descriptionAr,
      priceRial,
      priceUsd,
      period: plan.period,
      service: plan.service,
      status: plan.status,
      popular: plan.popular || false,
      features: plan.features,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      nameEn: '',
      nameAr: '',
      description: '',
      descriptionEn: '',
      descriptionAr: '',
      priceRial: 0,
      priceUsd: 0,
      period: 'one-time',
      service: 'web',
      status: 'فعال',
      popular: false,
      features: [],
    });
    setNewFeature({ name: '', nameEn: '', nameAr: '', included: true });
    setShowModal(true);
  };

  const handleCalcUsdFromRial = () => {
    const usd = formatUsdFromRial(formData.priceRial, usdToRialRate);
    setFormData({ ...formData, priceUsd: usd });
    toast.success(`قیمت دلاری محاسبه شد: $${usd}`);
  };

  const handleAddFeature = () => {
    if (!newFeature.name.trim()) return;
    setFormData({
      ...formData,
      features: [
        ...formData.features,
        {
          id: `feature-${Date.now()}`,
          name: newFeature.name,
          nameEn: newFeature.nameEn || newFeature.name,
          nameAr: newFeature.nameAr || newFeature.name,
          included: newFeature.included,
        },
      ],
    });
    setNewFeature({ name: '', nameEn: '', nameAr: '', included: true });
  };

  const handleRemoveFeature = (featureId: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f.id !== featureId),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlan) {
        updatePlan(editingPlan.id, formData);
        toast.success('پکیج با موفقیت به‌روزرسانی شد');
      } else {
        addPlan(formData);
        toast.success('پکیج جدید با موفقیت اضافه شد');
      }
      setShowModal(false);
      setEditingPlan(null);
      setSearchTerm('');
    } catch (error) {
      toast.error('خطا در ذخیره پکیج');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مدیریت تعرفه‌ها
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            مدیریت پکیج‌ها — قیمت ریال (ایران) و دلار (انگلیسی/عربی)
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus size={20} className="mr-2" />
          افزودن پکیج
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="جستجو پکیج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="all">همه خدمات</option>
          <option value="web">طراحی سایت</option>
          <option value="app">توسعه اپلیکیشن</option>
          <option value="bot">توسعه ربات</option>
          <option value="software">توسعه نرم‌افزار</option>
        </select>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
              plan.popular ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                {plan.popular && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full text-xs font-semibold">
                    محبوب
                  </span>
                )}
              </div>

              <div className="mb-4">
                {(() => {
                  const { priceRial, priceUsd } = resolvePlanPrices(plan);
                  return (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {new Intl.NumberFormat('fa-IR').format(priceRial)}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">ریال</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                          ${new Intl.NumberFormat('en-US').format(priceUsd)}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">USD</span>
                      </div>
                    </>
                  );
                })()}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {plan.period === 'monthly' ? 'ماهانه' : plan.period === 'yearly' ? 'سالانه' : 'یک‌بار'}
                </p>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {plan.description}
              </p>

              <div className="mb-4">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  خدمت: {plan.service === 'web' ? 'طراحی سایت' : plan.service === 'app' ? 'توسعه اپلیکیشن' : plan.service === 'bot' ? 'توسعه ربات' : 'توسعه نرم‌افزار'}
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.status === 'فعال'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}
                >
                  {plan.status}
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-1.5 text-primary-600 hover:text-primary-800 dark:text-primary-400"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>پکیجی یافت نشد</p>
        </div>
      )}

      {/* Modal for Add/Edit Plan */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {editingPlan ? 'ویرایش پکیج' : 'افزودن پکیج جدید'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    نام (فارسی)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    نام (انگلیسی)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    نام (عربی)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    توضیحات (فارسی)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    توضیحات (انگلیسی)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    توضیحات (عربی)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    قیمت (ریال — ایران)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.priceRial}
                    onChange={(e) =>
                      setFormData({ ...formData, priceRial: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    قیمت (دلار — انگلیسی/عربی)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.priceUsd}
                      onChange={(e) =>
                        setFormData({ ...formData, priceUsd: parseInt(e.target.value) || 0 })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                    <Button type="button" variant="outline" onClick={handleCalcUsdFromRial}>
                      محاسبه
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    نرخ تبدیل: {new Intl.NumberFormat('fa-IR').format(usdToRialRate)} ریال = ۱ دلار
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    دوره
                  </label>
                  <select
                    value={formData.period}
                    onChange={(e) =>
                      setFormData({ ...formData, period: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="one-time">یک‌بار</option>
                    <option value="monthly">ماهانه</option>
                    <option value="yearly">سالانه</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    خدمت
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="web">طراحی سایت</option>
                    <option value="app">توسعه اپلیکیشن</option>
                    <option value="bot">توسعه ربات</option>
                    <option value="software">توسعه نرم‌افزار</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="flex items-center space-x-2 space-x-reverse mt-8">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="popular" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    پکیج محبوب
                  </label>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ویژگی‌ها
                </label>
                <div className="space-y-2 mb-4">
                  {formData.features.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        {feature.included ? (
                          <Check className="text-green-500" size={20} />
                        ) : (
                          <X className="text-gray-400" size={20} />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature.name}
                          {(feature.nameEn || feature.nameAr) && (
                            <span className="block text-xs text-gray-500">
                              EN: {feature.nameEn || '—'} | AR: {feature.nameAr || '—'}
                            </span>
                          )}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(feature.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newFeature.name}
                    onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                    placeholder="نام ویژگی (فارسی)"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    value={newFeature.nameEn}
                    onChange={(e) => setNewFeature({ ...newFeature, nameEn: e.target.value })}
                    placeholder="نام ویژگی (انگلیسی)"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    value={newFeature.nameAr}
                    onChange={(e) => setNewFeature({ ...newFeature, nameAr: e.target.value })}
                    placeholder="نام ویژگی (عربی)"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <label className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg">
                    <input
                      type="checkbox"
                      checked={newFeature.included}
                      onChange={(e) =>
                        setNewFeature({ ...newFeature, included: e.target.checked })
                      }
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">شامل</span>
                  </label>
                  <Button type="button" onClick={handleAddFeature} variant="outline">
                    افزودن
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingPlan(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  انصراف
                </Button>
                <Button type="submit" className="flex-1">
                  {editingPlan ? 'ذخیره تغییرات' : 'افزودن'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}






