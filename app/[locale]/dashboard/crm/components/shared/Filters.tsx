import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SortField, SortDirection } from '../../types';
import { serviceTypes } from '../../mockData';
import { DynamicFilter } from '../../hooks/useFilters';

/**
 * Props for the Filters component.
 */
interface FiltersProps {
  /** Current search term */
  searchTerm: string;
  /** Callback to update search term */
  setSearchTerm: (term: string) => void;
  /** Current status filter */
  statusFilter: string;
  /** Callback to update status filter */
  setStatusFilter: (filter: string) => void;
  /** Current service type filter */
  serviceFilter: string;
  /** Callback to update service type filter */
  setServiceFilter: (filter: string) => void;
  /** Current sort field */
  sortField: SortField;
  /** Current sort direction */
  sortDirection: SortDirection;
  /** Callback to update sort */
  onSortChange: (field: SortField, direction: SortDirection) => void;
  /** Date range filter */
  dateRange?: { start: Date | null; end: Date | null };
  /** Callback to update date range */
  setDateRange?: (range: { start: Date | null; end: Date | null }) => void;
  /** List of active dynamic filters */
  dynamicFilters?: DynamicFilter[];
  /** Callback to add a dynamic filter */
  addDynamicFilter?: () => void;
  /** Callback to remove a dynamic filter */
  removeDynamicFilter?: (id: string) => void;
  /** Callback to update a dynamic filter */
  updateDynamicFilter?: (id: string, updates: Partial<DynamicFilter>) => void;
}

/**
 * Component for filtering, searching, and sorting bookings.
 */
export const Filters: React.FC<FiltersProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter, 
  serviceFilter, 
  setServiceFilter,
  sortField,
  sortDirection,
  onSortChange,
  dateRange = { start: null, end: null },
  setDateRange,
  dynamicFilters = [],
  addDynamicFilter,
  removeDynamicFilter,
  updateDynamicFilter
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const t = useTranslations("Dashboard.CRM.Filters");
  const tStatus = useTranslations("Dashboard.CRM.Status");

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 transition-all duration-200 mx-4">
      {/* Main Filter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-3">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 rtl:left-auto rtl:right-3" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 rtl:pl-4 rtl:pr-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-200"
          >
            <Filter className="w-4 h-4" />
            {t("filters")}
            {dynamicFilters.length > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {dynamicFilters.length}
              </span>
            )}
          </button>
          
          <div className="flex-1">
            <select
              value={`${sortField}-${sortDirection}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-') as [SortField, SortDirection];
                onSortChange(field, direction);
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date-desc">{t("newestFirst")}</option>
              <option value="date-asc">{t("oldestFirst")}</option>
              <option value="customer-asc">{t("customerAZ")}</option>
              <option value="customer-desc">{t("customerZA")}</option>
              <option value="priority-asc">{t("priority")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-gray-200 pt-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("statusFilter")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'pending', 'confirmed', 'completed', 'cancelled', 'no-show'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        statusFilter === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all' ? t("allStatuses") : tStatus(status as any)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("serviceType")}
                </label>
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">{t("allServices")}</option>
                  {serviceTypes.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("dateRange")}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="date"
                    value={dateRange?.start ? dateRange.start.toISOString().split('T')[0] : ''}
                    onChange={(e) => setDateRange?.({ ...dateRange, start: e.target.value ? new Date(e.target.value) : null, end: dateRange.end })}
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="date"
                    value={dateRange?.end ? dateRange.end.toISOString().split('T')[0] : ''}
                    onChange={(e) => setDateRange?.({ ...dateRange, start: dateRange.start, end: e.target.value ? new Date(e.target.value) : null })}
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Filters Section */}
            {addDynamicFilter && (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">{t("advancedFilters")}</h4>
                  <button
                    onClick={addDynamicFilter}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    {t("addFilterRule")}
                  </button>
                </div>
                
                <div className="space-y-3">
                  {dynamicFilters.map((filter) => (
                    <motion.div
                      key={filter.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 items-center bg-gray-50 p-2 rounded-lg"
                    >
                      <select
                        value={filter.field}
                        onChange={(e) => updateDynamicFilter?.(filter.id, { field: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="price">{t("Dynamic.price")}</option>
                        <option value="people">{t("Dynamic.people")}</option>
                        <option value="duration">{t("Dynamic.duration")}</option>
                      </select>
                      
                      <select
                        value={filter.operator}
                        onChange={(e) => updateDynamicFilter?.(filter.id, { operator: e.target.value as any })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="equals">{t("Dynamic.equals")}</option>
                        <option value="gt">{t("Dynamic.gt")}</option>
                        <option value="lt">{t("Dynamic.lt")}</option>
                      </select>
                      
                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => updateDynamicFilter?.(filter.id, { value: e.target.value })}
                        placeholder={t("Dynamic.valuePlaceholder")}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      
                      <button
                        onClick={() => removeDynamicFilter?.(filter.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                  {dynamicFilters.length === 0 && (
                    <p className="text-sm text-gray-500 italic">{t("noAdvancedFilters")}</p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};