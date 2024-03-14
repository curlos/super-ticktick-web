import { useState } from "react";
import CustomRadioButton from "../CustomRadioButton";
import Tooltip from "./Tooltip";
import Icon from "../Icon.component";
import TooltipTimeZoneSelector from "./TooltipTimeZoneSelector";

interface TooltipFixedOrFloatingTimeZoneProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setTimeZone: React.Dispatch<React.SetStateAction<string>>;
}

const TooltipFixedOrFloatingTimeZone: React.FC<TooltipFixedOrFloatingTimeZoneProps> = ({ isVisible, setIsVisible, setTimeZone }) => {
    const [tempSelectedTimeZone, setTempSelectedTimeZone] = useState('New York, EDT');
    const [selectedTimeTrackingType, setSelectedTimeTrackingType] = useState('Fixed Time Zone');
    const [isTimeZoneSelectorTooltipVisible, setIsTimeZoneSelectorTooltipVisible] = useState(false);

    const handleRadioChange = (e) => {
        setSelectedTimeTrackingType(e.target.value);
    };

    return (
        <Tooltip isVisible={isVisible} customClasses={' mt-[-290px] ml-[-22px] shadow-2xl border border-color-gray-200 rounded-lg'}>
            <div className="w-[260px] p-3 rounded" onClick={(e) => e.stopPropagation()}>
                <CustomRadioButton
                    label="Fixed Time Zone"
                    name="Fixed Time Zone"
                    checked={selectedTimeTrackingType === 'Fixed Time Zone'}
                    onChange={handleRadioChange}
                />

                {/* selectedTimeTrackingType === 'Fixed Time Zone' */}

                <div
                    className="border border-color-gray-200 rounded p-[2px] px-2 flex justify-between items-center hover:border-blue-500 mt-2 mb-5"
                    onClick={() => {
                        if (selectedTimeTrackingType === 'Floating Time') {
                            return;
                        }

                        setIsTimeZoneSelectorTooltipVisible(!isTimeZoneSelectorTooltipVisible);
                    }}
                >
                    <div className={`text-[12px]` + (selectedTimeTrackingType === 'Floating Time' ? ' text-color-gray-100' : '')}>{tempSelectedTimeZone}</div>
                    <Icon name="expand_more" fill={0} customClass={'text-color-gray-50 !text-[18px] hover:text-white cursor-pointer'} />
                </div>

                {isTimeZoneSelectorTooltipVisible && (
                    <TooltipTimeZoneSelector
                        isVisible={isTimeZoneSelectorTooltipVisible}
                        setIsVisible={setIsTimeZoneSelectorTooltipVisible}
                        tempSelectedTimeZone={tempSelectedTimeZone}
                        setTempSelectedTimeZone={setTempSelectedTimeZone}
                    />
                )}

                <CustomRadioButton
                    label="Floating Time"
                    name="Floating Time"
                    checked={selectedTimeTrackingType === 'Floating Time'}
                    onChange={handleRadioChange}
                />
                <div className="text-[12px] mt-1 text-color-gray-100">When time zone changes, time remains the same.</div>

                <div className="mt-5 mb-4 text-center text-color-gray-100 underline text-[12px]">Learn More</div>

                <div className="grid grid-cols-2 gap-2">
                    <button className="border border-color-gray-200 rounded py-[2px] cursor-pointer hover:bg-color-gray-200" onClick={() => {
                        setIsVisible(false);
                    }}>Cancel</button>
                    <button className="bg-blue-500 rounded py-[2px] cursor-pointer hover:bg-blue-600" onClick={() => {
                        setIsVisible(false);
                        setTimeZone(tempSelectedTimeZone);
                    }}>Ok</button>
                </div>
            </div>
        </Tooltip>
    );
};

export default TooltipFixedOrFloatingTimeZone;