import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // drag, resize
import listPlugin from "@fullcalendar/list";
import "./HR_Calendar.css";
export default function HRCalendar() {
    const [events, setEvents] = useState([
        {
            id: "1",
            title: "Morning Shift - Team A",
            start: "2025-10-03T09:00:00",
            end: "2025-10-03T17:00:00",
            backgroundColor: "#3b82f6", // Tailwind blue-500
        },
        {
            id: "2",
            title: "Holiday - Gandhi Jayanti",
            start: "2025-10-02",
            allDay: true,
            backgroundColor: "#f87171", // Tailwind red-400
        },
    ]);

    // Event drop/resize handling
    const handleEventChange = (changeInfo) => {
        const updated = events.map((event) =>
            event.id === changeInfo.event.id
                ? {
                    ...event,
                    start: changeInfo.event.start,
                    end: changeInfo.event.end,
                }
                : event
        );
        setEvents(updated);
    };

    // Click handler to open modal (correction/approval/etc.)
    const handleDateClick = (info) => {
        alert(`Create new shift/holiday on ${info.dateStr}`);
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">HR Attendance Calendar</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                editable={true}
                selectable={true}
                events={events}
                eventChange={handleEventChange}
                dateClick={handleDateClick}
                height="80vh"
            />
        </div>
    );
}