import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, X, Check } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SearchableSelectProps {
  options: (string | SelectOption)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  isDark?: boolean;
  searchable?: boolean;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  isDark = false,
  searchable = true,
  className = '',
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timeout = setTimeout(() => {
      const scrollEl = scrollContainerRef.current;
      if (!scrollEl) return;
      const handleWheel = (e: WheelEvent) => {
        e.stopPropagation();
        const { scrollTop, scrollHeight, clientHeight } = scrollEl;
        const delta = e.deltaY;
        if (scrollHeight > clientHeight) {
          const atTop = scrollTop <= 0 && delta < 0;
          const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 2 && delta > 0;
          if (atTop || atBottom) {
            e.preventDefault();
          }
        }
      };
      scrollEl.addEventListener('wheel', handleWheel, { passive: false });
      return () => scrollEl.removeEventListener('wheel', handleWheel);
    }, 30);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen, searchable]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label
          className={`block text-xs font-mono font-semibold uppercase mb-1.5 ${
            isDark ? 'text-[#DCFF85]' : 'text-[#163300]'
          }`}
        >
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 rounded-lg border text-left font-medium text-sm transition-all flex items-center justify-between gap-3 shadow-sm ${
          isDark
            ? 'bg-[#183314] border-[#DCFF85]/30 text-white hover:border-[#DCFF85]/60 focus:border-[#DCFF85]'
            : 'bg-[#FAFAF8] border-[#163300]/20 text-[#163300] hover:border-[#163300]/40 focus:border-[#163300]'
        }`}
      >
        <span
          className={`truncate font-semibold ${isDark ? 'text-white' : '!text-[#163300]'} ${
            selectedOption ? '' : 'opacity-60'
          }`}
        >
          {displayLabel}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
            isDark ? 'text-[#DCFF85]' : 'text-[#163300]'
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 left-0 right-0 top-full p-2 rounded-xl border shadow-2xl overflow-hidden ${
              isDark
                ? 'bg-[#0E1F0B] border-[#DCFF85]/40 text-white'
                : 'bg-white border-[#163300]/25 text-[#163300]'
            }`}
          >
            {searchable && (
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border mb-2 ${
                  isDark
                    ? 'bg-[#183314] border-[#DCFF85]/30 text-white'
                    : 'bg-[#FAFAF8] border-[#163300]/15 text-[#163300]'
                }`}
              >
                <Search
                  size={14}
                  className={isDark ? 'text-[#DCFF85]' : 'text-[#163300]/60'}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  className={`w-full bg-transparent text-xs font-medium focus:outline-none ${
                    isDark
                      ? 'text-white placeholder:text-white/40'
                      : '!text-[#163300] placeholder:text-[#163300]/40'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 rounded-full hover:bg-black/10"
                  >
                    <X size={12} className={isDark ? 'text-[#DCFF85]' : 'text-[#163300]'} />
                  </button>
                )}
              </div>
            )}

            <div
              ref={scrollContainerRef}
              onWheel={(e) => e.stopPropagation()}
              className="max-h-56 sm:max-h-60 overflow-y-auto space-y-1 custom-scrollbar pr-1"
              style={{ overscrollBehavior: 'contain', touchAction: 'pan-y' }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? isDark
                            ? '!bg-[#DCFF85] !text-[#163300] font-bold shadow-sm'
                            : '!bg-[#163300] !text-[#DCFF85] font-bold shadow-sm'
                          : isDark
                            ? '!text-white hover:!bg-[#DCFF85]/25 hover:!text-white font-medium'
                            : '!text-[#163300] hover:!bg-[#163300]/10 hover:!text-[#163300] font-medium'
                      }`}
                    >
                      <span
                        className={`truncate ${
                          isSelected
                            ? isDark
                              ? '!text-[#163300]'
                              : '!text-[#DCFF85]'
                            : isDark
                              ? '!text-white'
                              : '!text-[#163300]'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <Check
                          size={14}
                          className={`shrink-0 font-bold ${
                            isDark ? 'text-[#163300]' : 'text-[#DCFF85]'
                          }`}
                        />
                      )}
                    </button>
                  );
                })
              ) : (
                <div
                  className={`py-4 text-center text-xs opacity-60 ${
                    isDark ? 'text-white' : '!text-[#163300]'
                  }`}
                >
                  No options matching "{searchQuery}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
