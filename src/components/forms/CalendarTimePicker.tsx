import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';

interface CalendarTimePickerProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // e.g. "09:30 AM" or "09:30 AM BST (Dhaka UTC+6)"
  onSelectDate: (date: string) => void;
  onSelectTime: (timeSlot: string) => void;
}

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const CalendarTimePicker: React.FC<CalendarTimePickerProps> = ({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Initialize view date to current active month
  const [viewDate, setViewDate] = useState<Date>(() => {
    if (selectedDate) {
      const parsed = new Date(selectedDate);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Days calculations
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const totalCells = firstDayIndex + daysInMonth <= 35 ? 35 : 42;
  const nextMonthDaysCount = totalCells - (firstDayIndex + daysInMonth);

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const formatDateStr = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const isTimeSelected = (slot: string) => {
    return selectedTime.startsWith(slot);
  };

  const todayStr = formatDateStr(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-xs overflow-hidden text-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {/* Left: Clean Minimalist Calendar */}
        <div className="p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header: < Month Year > */}
            <div className="flex items-center justify-between mb-4 px-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                aria-label="Previous Month"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </button>

              <h4 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                {MONTH_NAMES[month]} {year}
              </h4>

              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-700 hover:text-black hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                aria-label="Next Month"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Weekdays: Su Mo Tu We Th Fr Sa */}
            <div className="grid grid-cols-7 text-center mb-1.5">
              {WEEKDAYS.map((wd) => (
                <span
                  key={wd}
                  className="text-xs font-semibold text-gray-500 py-1 select-none"
                >
                  {wd}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {/* Previous month overflow days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => {
                const prevDayNum = prevMonthDays - firstDayIndex + i + 1;
                return (
                  <div
                    key={`prev-${i}`}
                    className="h-8 sm:h-9 flex items-center justify-center text-xs text-gray-400 select-none font-normal"
                  >
                    {prevDayNum}
                  </div>
                );
              })}

              {/* Current month days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = formatDateStr(year, month, dayNum);
                const dayDate = new Date(year, month, dayNum);
                dayDate.setHours(0, 0, 0, 0);

                const isPast = dayDate < today;
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === todayStr;

                return (
                  <div
                    key={`curr-${dayNum}`}
                    className="h-8 sm:h-9 flex items-center justify-center"
                  >
                    <button
                      type="button"
                      disabled={isPast}
                      onClick={() => onSelectDate(dateStr)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center transition-all ${
                        isSelected
                          ? '!bg-[#163300] !text-white font-bold shadow-xs'
                          : isPast
                          ? 'text-gray-300 cursor-not-allowed font-normal'
                          : isToday
                          ? 'text-black bg-gray-100 font-bold hover:bg-gray-200'
                          : 'text-gray-900 hover:bg-gray-100 hover:text-black'
                      }`}
                    >
                      {dayNum}
                    </button>
                  </div>
                );
              })}

              {/* Next month overflow days */}
              {Array.from({ length: nextMonthDaysCount }).map((_, i) => {
                const nextDayNum = i + 1;
                return (
                  <div
                    key={`next-${i}`}
                    className="h-8 sm:h-9 flex items-center justify-center text-xs text-gray-400 select-none font-normal"
                  >
                    {nextDayNum}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timezone & Selected Date Footer */}
          <div className="pt-3 mt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-gray-600">
            <span className="flex items-center gap-1.5">
              <span>Date:</span>
              <strong className="text-gray-900 font-bold">
                {selectedDate || 'Select a date'}
              </strong>
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold">
              <Globe size={11} className="text-gray-400" />
              <span>🇧🇩 Bangladesh Time (BST · UTC+6)</span>
            </span>
          </div>
        </div>

        {/* Right: Available Times (Scrollable 1-Column List) */}
        <div className="p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="text-center mb-3">
              <h4 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                Available Times
              </h4>
              <p className="text-[10px] font-mono text-gray-500 mt-0.5">
                Dhaka (UTC+6) Standard Time
              </p>
            </div>

            {/* Scrollable list with robust scrolling container */}
            <div
              className="space-y-2 pr-1.5 scrollbar-thin overflow-y-auto"
              style={{
                height: '240px',
                maxHeight: '240px',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {TIME_SLOTS.map((slot) => {
                const active = isTimeSelected(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => onSelectTime(`${slot} BST (Dhaka UTC+6)`)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center border ${
                      active
                        ? 'border-[#163300] shadow-xs !bg-[#163300] !text-white'
                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Details Footer */}
          <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-600">
            <span>Selected Time:</span>
            <strong className="text-gray-900 font-bold">
              {selectedTime
                ? selectedTime.split(' ')[0] + ' ' + (selectedTime.split(' ')[1] || '') + ' BST'
                : 'None'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
