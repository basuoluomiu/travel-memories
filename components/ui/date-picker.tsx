"use client"

import { forwardRef, useRef } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

interface DatePickerProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  className?: string
  placeholderText?: string
  required?: boolean
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ selected, onChange, className, placeholderText = "选择日期", required }, ref) => {
    const datePickerRef = useRef<any>(null)

    return (
      <div className="relative">
        <ReactDatePicker
          ref={datePickerRef}
          selected={selected}
          onChange={(date) => onChange(date)}
          dateFormat="yyyy年MM月dd日"
          locale={zhCN}
          placeholderText={placeholderText}
          required={required}
          customInput={
            <button
              type="button"
              className={cn(
                "flex h-12 w-full items-center justify-between rounded-2xl px-4 py-3 text-sm text-left",
                "glass border-0 shadow-md",
                "hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-lg",
                "transition-all duration-200",
                !selected && "text-muted-foreground",
                className
              )}
            >
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-primary"
                >
                  <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                  <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                </svg>
                {selected ? format(selected, "yyyy年MM月dd日", { locale: zhCN }) : placeholderText}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 transition-transform duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          }
          calendarClassName="glass-calendar"
        />

        {/* 自定义日历样式 */}
        <style jsx global>{`
          .react-datepicker {
            font-family: inherit;
            border: none;
            border-radius: 1.5rem;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            padding: 1rem;
          }

          .dark .react-datepicker {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .react-datepicker__header {
            background: transparent;
            border: none;
            padding-top: 0.5rem;
          }

          .react-datepicker__current-month {
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 0.5rem;
            color: inherit;
          }

          .react-datepicker__day-names {
            margin-top: 0.5rem;
          }

          .react-datepicker__day-name,
          .react-datepicker__day {
            width: 2.5rem;
            height: 2.5rem;
            line-height: 2.5rem;
            margin: 0.2rem;
            border-radius: 0.75rem;
            color: inherit;
          }

          .react-datepicker__day-name {
            font-weight: 500;
            font-size: 0.875rem;
            opacity: 0.6;
          }

          .react-datepicker__day {
            transition: all 0.2s;
            font-weight: 500;
          }

          .react-datepicker__day:hover {
            background: rgba(59, 130, 246, 0.1);
            border-radius: 0.75rem;
          }

          .react-datepicker__day--selected {
            background: hsl(221.2 83.2% 53.3%);
            color: white;
            border-radius: 0.75rem;
            font-weight: 600;
          }

          .react-datepicker__day--selected:hover {
            background: hsl(221.2 83.2% 53.3%);
          }

          .react-datepicker__day--keyboard-selected {
            background: transparent;
            color: inherit;
            outline: 2px solid hsl(221.2 83.2% 53.3%);
            outline-offset: -2px;
            border-radius: 0.75rem;
          }

          .react-datepicker__day--keyboard-selected:hover {
            background: rgba(59, 130, 246, 0.1);
          }

          .react-datepicker__day--today {
            font-weight: 700;
            background: rgba(59, 130, 246, 0.15);
            color: hsl(221.2 83.2% 40%);
            border-radius: 0.75rem;
          }

          .react-datepicker__day--today.react-datepicker__day--keyboard-selected {
            outline: 2px solid hsl(221.2 83.2% 53.3%);
            background: rgba(59, 130, 246, 0.15);
            color: hsl(221.2 83.2% 40%);
          }

          .react-datepicker__day--disabled {
            opacity: 0.3;
            cursor: not-allowed;
          }

          .react-datepicker__day--disabled:hover {
            background: transparent;
          }

          .react-datepicker__day--outside-month {
            opacity: 0.4;
          }

          .react-datepicker__navigation {
            top: 1rem;
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            transition: all 0.2s;
          }

          .react-datepicker__navigation:hover {
            background: rgba(59, 130, 246, 0.1);
          }

          .react-datepicker__navigation-icon::before {
            border-color: currentColor;
            border-width: 2px 2px 0 0;
            height: 7px;
            width: 7px;
          }

          .react-datepicker__month {
            margin: 0.5rem 0;
          }

          .react-datepicker__triangle {
            display: none;
          }

          .react-datepicker-popper {
            z-index: 9999;
          }

          .react-datepicker-wrapper {
            width: 100%;
          }

          .react-datepicker__input-container {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"
