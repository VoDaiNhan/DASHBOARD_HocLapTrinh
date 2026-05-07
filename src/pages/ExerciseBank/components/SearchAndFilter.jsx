import { useState } from 'react';
import { Search, Filter, X, Tag } from 'lucide-react';

const SearchAndFilter = ({ onSearch, onFilter, filters, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTagFilter = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilter({ ...filters, tags: newTags });
  };

  const availableTags = [
    // Programming fundamentals
    'pointer', 'struct', 'file', 'console', 'variables', 'string', 
    'function', 'array', 'loop', 'condition', 'algorithm',
    
    // Web development
    'nodejs', 'express', 'html', 'css', 'flexbox', 'responsive',
    'javascript', 'react', 'jsx', 'hooks', 'components',
    
    // Database
    'sql', 'database', 'mongodb', 'sequelize', 'nosql',
    
    // Mobile
    'react-native', 'mobile', 'ios', 'android',
    
    // DevOps & Cloud
    'docker', 'kubernetes', 'aws', 'cloud', 'cicd',
    
    // Security & Auth
    'jwt', 'auth', 'security', 'oauth', 'encryption',
    
    // Advanced concepts
    'optimization', 'performance', 'design-patterns', 'microservices'
  ];

  const hasActiveFilters = filters.tags.length > 0;

  return (
    <div className="mb-6">
      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Tìm kiếm bài tập theo tiêu đề, mục tiêu..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            showFilters || hasActiveFilters
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Filter className="h-4 w-4" />
          Bộ lọc
          {hasActiveFilters && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
              {filters.tags.length}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X className="h-3 w-3" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Tag filters */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                    filters.tags.includes(tag)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 ring-2 ring-blue-500 ring-offset-1'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;