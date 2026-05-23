import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Clock, MapPin, Users, Plus, Video, Calendar } from "lucide-react";
import { toast } from "sonner";

// ─── Mock schedule data ───────────────────────────────────────────────────────

type EventType = "meeting" | "review" | "training" | "interview";

interface ScheduleEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: string;
  location: string;
  type: EventType;
  attendees: number;
  isVirtual: boolean;
}

const today = new Date();
const d = (offset: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);

const EVENTS: ScheduleEvent[] = [
  { id: "1", title: "Q2 Performance Reviews",   date: d(0), time: "09:00 AM", duration: "2h",     location: "Conference Room A", type: "review",    attendees: 8,  isVirtual: false },
  { id: "2", title: "All-hands Standup",         date: d(0), time: "10:30 AM", duration: "30 min", location: "Google Meet",       type: "meeting",   attendees: 24, isVirtual: true  },
  { id: "3", title: "Backend Engineer Interview",date: d(1), time: "02:00 PM", duration: "1h",     location: "Zoom",              type: "interview", attendees: 3,  isVirtual: true  },
  { id: "4", title: "Leadership Training",       date: d(2), time: "09:00 AM", duration: "4h",     location: "Training Room B",   type: "training",  attendees: 12, isVirtual: false },
  { id: "5", title: "Product Roadmap Review",    date: d(3), time: "11:00 AM", duration: "1.5h",   location: "Board Room",        type: "meeting",   attendees: 6,  isVirtual: false },
  { id: "6", title: "New Hire Orientation",      date: d(5), time: "09:30 AM", duration: "3h",     location: "HR Suite",          type: "training",  attendees: 5,  isVirtual: false },
  { id: "7", title: "Monthly 1:1s",              date: d(7), time: "02:00 PM", duration: "1h",     location: "Zoom",              type: "meeting",   attendees: 2,  isVirtual: true  },
];

// ─── Event styling ────────────────────────────────────────────────────────────

const eventStyle: Record<EventType, { dot: string; badge: string; label: string }> = {
  meeting:   { dot: "bg-blue-400",   badge: "badge-info",    label: "Meeting"   },
  review:    { dot: "bg-purple-400", badge: "badge-neutral", label: "Review"    },
  training:  { dot: "bg-amber-400",  badge: "badge-warning", label: "Training"  },
  interview: { dot: "bg-emerald-400",badge: "badge-success", label: "Interview" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

const isToday = (d: Date) => sameDay(d, new Date());

// ─── Component ────────────────────────────────────────────────────────────────

const Schedule = () => {
  const [selected, setSelected] = useState<Date | undefined>(today);

  const eventDates = EVENTS.map((e) => e.date);

  const dayEvents = EVENTS.filter((e) =>
    selected ? sameDay(e.date, selected) : false
  );

  const upcomingEvents = EVENTS
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  return (
    <div className="page-section flex flex-col xl:flex-row gap-5">
      {/* ── Left: calendar + day events ──────────────────────────── */}
      <div className="flex flex-col gap-5 flex-1 min-w-0">
        {/* Calendar card */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="page-heading">Schedule</h2>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => toast.info("New event creation coming soon")}
            >
              <Plus className="w-3.5 h-3.5" />
              New event
            </button>
          </div>

          <div className="rdp-custom">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              modifiers={{ hasEvent: eventDates }}
              modifiersClassNames={{ hasEvent: "has-event" }}
              showOutsideDays
            />
          </div>
        </div>

        {/* Events for selected day */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="section-title">
              {selected
                ? isToday(selected)
                  ? "Today's Events"
                  : formatDate(selected)
                : "Select a day"}
            </h3>
            {dayEvents.length > 0 && (
              <span className="badge badge-primary">{dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}</span>
            )}
          </div>

          {dayEvents.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="w-8 h-8 text-slate-200 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No events scheduled for this day</p>
            </div>
          ) : (
            <div className="p-3 flex flex-col gap-2">
              {dayEvents.map((event) => {
                const style = eventStyle[event.type];
                return (
                  <div
                    key={event.id}
                    className="schedule-event border border-slate-100 dark:border-slate-800 rounded-xl"
                  >
                    <div className={`w-1 h-full min-h-[44px] rounded-full flex-shrink-0 ${style.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">
                          {event.title}
                        </p>
                        <span className={`${style.badge} flex-shrink-0 text-[10px]`}>
                          {style.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          {event.time} · {event.duration}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          {event.isVirtual ? (
                            <Video className="w-3 h-3" />
                          ) : (
                            <MapPin className="w-3 h-3" />
                          )}
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Users className="w-3 h-3" />
                          {event.attendees} attendee{event.attendees > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Right: upcoming events ────────────────────────────────── */}
      <div className="xl:w-72 flex-shrink-0 flex flex-col gap-5">
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="section-title">Upcoming</h3>
          </div>

          <div className="p-3 flex flex-col gap-1">
            {upcomingEvents.map((event) => {
              const style = eventStyle[event.type];
              return (
                <button
                  key={event.id}
                  className="schedule-event w-full text-left rounded-xl"
                  onClick={() => setSelected(event.date)}
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${style.dot}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {event.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isToday(event.date)
                        ? `Today · ${event.time}`
                        : `${event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${event.time}`}
                    </p>
                  </div>
                  <span className={`${style.badge} text-[10px] flex-shrink-0`}>
                    {style.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Event type legend */}
        <div className="card p-5">
          <h3 className="section-title mb-3">Event Types</h3>
          <div className="flex flex-col gap-2">
            {(Object.entries(eventStyle) as [EventType, typeof eventStyle[EventType]][]).map(
              ([, { dot, label }]) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{label}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
