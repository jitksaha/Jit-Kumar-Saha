import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, Check } from 'lucide-react';

interface CalendarTimePickerProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // e.g. "03:00 PM BST (Dhaka UTC+6)" or "03:00 PM"
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
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
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
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();
  const [viewDate, setViewDate] = useState<Date>(
    isNaN(initialDate.getTime()) ? new Date() : initialDate
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const formatDateStr = (d: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Check if selected time slot matches (handling possible full string like "03:00 PM BST (Dhaka UTC+6)")
  const isTimeSelected = (slot: string) => {
    return selectedTime.startsWith(slot);
  };

  return (
    <div className="w-full rounded-2xl border border-[#163300]/15 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#163300]/10">
        <CalendarIcon size={18} className="text-[#163300]" />
        <span className="text-xs font-mono font-bold text-[#163300] uppercase tracking-wider">
          Executive Consultation Scheduling (BST, UTC+6)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Calendar Picker */}
        <div className="md:col-span-7 bg-[#FAFAF8] rounded-xl p-4 border border-[#163300]/10">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-[#163300] tracking-tight">
              {MONTH_NAMES[month]} {year}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#163300] hover:bg-[#163300]/10 transition-colors border border-[#163300]/10 bg-white"
                aria-label="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#163300] hover:bg-[#163300]/10 transition-colors border border-[#163300]/10 bg-white"
                aria-label="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {WEEKDAYS.map((wd) => (
              <span key={wd} className="text-[11px] font-mono font-bold text-[#163300]/60 uppercase py-1">
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-9" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = formatDateStr(dayNum);
              const dayDate = new Date(year, month, dayNum);
              dayDate.setHours(0, 0, 0, 0);

              const isPast = dayDate < today;
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  disabled={isPast}
                  onClick={() => onSelectDate(dateStr)}
                  style={{
                    backgroundColor: isSelected ? '#163300' : undefined,
                    color: isSelected ? '#FFFFFF' : isPast ? 'rgba(22, 51, 0, 0.25)' : '#163300',
                  }}
                  className={`h-9 w-full rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? '!bg-[#163300] !text-white shadow-md'
                      : isPast
                      ? 'cursor-not-allowed bg-transparent'
                      : 'bg-white border border-[#163300]/10 hover:border-[#163300] hover:bg-[#DCFF85]/20'
                  }`}
                >
                  <span
                    style={{ color: isSelected ? '#FFFFFF' : isPast ? 'rgba(22, 51, 0, 0.25)' : '#163300' }}
                    className="font-bold select-none"
                  >
                    {dayNum}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-[#163300]/10 flex items-center justify-between text-[11px] font-mono text-[#163300]/70">
            <span>Selected: <strong className="text-[#163300]">{selectedDate || 'None'}</strong></span>
            <span className="text-[10px] uppercase font-bold text-[#163300]/50">Bangladesh (GMT+6)</span>
          </div>
        </div>

        {/* Right: Available Times */}
        <div className="md:col-span-5 bg-[#FAFAF8] rounded-xl p-4 border border-[#163300]/10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#163300]/10">
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-[#163300]" />
              <h4 className="text-xs font-mono font-bold uppercase text-[#163300] tracking-wider">
                Available Times
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#163300] text-[#DCFF85]">
              BST
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-[260px] overflow-y-auto pr-1">
            {TIME_SLOTS.map((slot) => {
              const active = isTimeSelected(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onSelectTime(`${slot} BST (Dhaka UTC+6)`)}
                  style={{
                    backgroundColor: active ? '#163300' : undefined,
                    color: active ? '#FFFFFF' : '#163300',
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                    active
                      ? 'border-[#163300] shadow-md !bg-[#163300] !text-white'
                      : 'bg-white border-[#163300]/15 hover:border-[#163300] hover:bg-[#DCFF85]/20'
                  }`}
                >
                  {active && <Check size={12} className="shrink-0 text-[#9FE870]" />}
                  <span
                    style={{ color: active ? '#FFFFFF' : '#163300' }}
                    className="font-bold select-none"
                  >
                    {slot}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-3 border-t border-[#163300]/10 text-[11px] font-mono text-[#163300]/70 flex items-center justify-between">
            <span>Slot:</span>
            <strong className="text-[#163300] truncate max-w-[140px]">
              {selectedTime.split(' ')[0]} {selectedTime.split(' ')[1] || ''}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
