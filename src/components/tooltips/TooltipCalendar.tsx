import Tooltip from "./Tooltip";
import { useEffect, useState } from "react";
import Icon from "../Icon.component";
import { areDatesEqual } from "../../utils/helpers.utils";

interface CalendarProps {
    dueDate: Date | null;
    setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Calendar: React.FC<CalendarProps> = ({ dueDate, setDueDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        setDueDate(new Date());
    }, []);

    function getCalendarMonth(year, month) {
        const calendar = [];
        const firstDayOfMonth = new Date(year, month, 1);
        let currentDay = new Date(firstDayOfMonth);
        const dayOfWeek = currentDay.getDay();
        currentDay.setDate(currentDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

        // This will ensure we always start the calendar with 7 rows of 7 days
        const weeksInCalendar = 6; // The number of weeks you want to show

        for (let week = 0; week < weeksInCalendar; week++) {
            const days = [];
            for (let i = 0; i < 7; i++) { // 7 days per week
                days.push(new Date(currentDay));
                currentDay.setDate(currentDay.getDate() + 1);
            }
            calendar.push(days);
        }

        return calendar;
    }

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const calendarMonth = getCalendarMonth(currentDate.getFullYear(), currentDate.getMonth());
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <div>
            <div className="flex items-center justify-between mb-4 px-4">
                <div>{monthName} {currentDate.getFullYear()}</div>
                <div className="flex items-center">
                    <Icon name="chevron_left" fill={0} customClass={"text-color-gray-50 !text-[18px] hover:text-white cursor-pointer"} onClick={goToPreviousMonth} />
                    <Icon name="fiber_manual_record" fill={0} customClass={"text-color-gray-50 !text-[14px] hover:text-white cursor-pointer"} />
                    <Icon name="chevron_right" fill={0} customClass={"text-color-gray-50 !text-[18px] hover:text-white cursor-pointer"} onClick={goToNextMonth} />
                </div>
            </div>

            <div className="w-full text-[12px] p-3">
                <div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, i) => (
                            <div key={day + i} className="py-1">{day}</div>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    {calendarMonth.map((week, index) => (
                        <div key={`week-${index}`} className="mb-1 grid grid-cols-7 gap-1">
                            {week.map((day, index) => {
                                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                                return (
                                    <div key={`day-${index}`} className={`py-1 cursor-pointer rounded-full ${isCurrentMonth ? 'text-white' : 'text-color-gray-100'} ${areDatesEqual(dueDate, day) ? ' bg-blue-500 text-white' : ' bg-transparent hover:bg-color-gray-200'}`} onClick={() => {
                                        setCurrentDate(new Date(day.getFullYear(), day.getMonth(), 1));
                                        setDueDate(day);
                                    }}>
                                        {day.getDate()}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface TooltipPrioritiesProps {
    isTooltipVisible: boolean;
    dueDate: Date | null;
    setDueDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const TooltipCalendar: React.FC<TooltipPrioritiesProps> = ({ isTooltipVisible, dueDate, setDueDate }) => {
    const [selectedView, setSelectedView] = useState('date');
    const bigIconsStyle = "text-color-gray-50 !text-[24px] hover:text-white hover:bg-color-gray-200 p-1 rounded cursor-pointer";

    interface TimeOptionProps {
        name: string;
        iconName: string;
    }

    const TimeOption: React.FC<TimeOptionProps> = ({ name, iconName }) => (
        <div className="flex items-center justify-between h-[40px] px-2 text-[13px] text-color-gray-25 hover:bg-color-gray-200 rounded">
            <div className="flex items-center gap-1">
                <Icon name={iconName} fill={0} customClass={'text-color-gray-50 !text-[18px] hover:text-white cursor-pointer'} />
                <div>{name}</div>
            </div>

            <Icon name="chevron_right" fill={0} customClass={'text-color-gray-50 !text-[18px] hover:text-white cursor-pointer'} />
        </div>
    );

    interface BigDateIconOptionProps {
        iconName: string;
        tooltipText: string;
    }

    const BigDateIconOption: React.FC<BigDateIconOptionProps> = ({ iconName, tooltipText }) => {
        const [isTooltipVisible, setIsTooltipVisible] = useState(false);

        return (
            <div>
                <Icon name={iconName} fill={0} customClass={bigIconsStyle} onFocus={() => setIsTooltipVisible(true)} onBlur={() => setIsTooltipVisible(false)} />
                <Tooltip isVisible={isTooltipVisible} customClasses={' bg-black'}>
                    <div>
                        sadasd
                        sadasd
                        sadasd
                        sadasddsad
                    </div>
                </Tooltip>
            </div>
        );
    };


    return (
        <div className={`${isTooltipVisible ? '' : 'hidden'} custom-tooltip-position`}>
            <Tooltip isVisible={isTooltipVisible} customClasses={' ml-[-70px] shadow-2xl'}>
                <div className="w-[260px]">
                    <div className="p-4">
                        <div className="grid grid-cols-2 bg-color-gray-700 rounded-md p-1 text-center">
                            <div className={"rounded-md p-[2px]" + (selectedView === 'date' ? ' bg-color-gray-600' : '')} onClick={() => setSelectedView('date')}>Date</div>
                            <div className={"rounded-md p-[2px]" + (selectedView === 'duration' ? ' bg-color-gray-600' : '')} onClick={() => setSelectedView('duration')}>Duration</div>
                        </div>

                        <div className="my-5 flex justify-between">
                            <BigDateIconOption iconName="sunny" tooltipText="today" />
                            <BigDateIconOption iconName="wb_twilight" tooltipText="today" />
                            <BigDateIconOption iconName="event_upcoming" tooltipText="today" />
                            <BigDateIconOption iconName="clear_night" tooltipText="today" />
                        </div>
                    </div>

                    <Calendar dueDate={dueDate} setDueDate={setDueDate} />

                    <div className="px-1 mb-4">
                        <TimeOption name="Time" iconName="schedule" />
                        <TimeOption name="Reminder" iconName="alarm" />
                        <TimeOption name="Repeat" iconName="repeat" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 px-3 pb-4">
                        <button className="border border-color-gray-200 rounded py-1 cursor-pointer hover:bg-color-gray-200">Clear</button>
                        <button className="bg-blue-500 rounded py-1 cursor-pointer hover:bg-blue-600">Ok</button>
                    </div>
                </div>
            </Tooltip>
        </div>
    );
};

export default TooltipCalendar;