import Image from 'next/image';
import { useState, useRef } from 'react';
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";

export default function Header(props: { startDateChange: Function, endDateChange: Function }) {

    const today = new Date();
    const [startDate, setStartDate] = useState<Date | null>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const [endDate, setEndDate] = useState<Date | null>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const startDateInput = useRef(null);
    const endDateInput = useRef(null);
    setDefaultLocale('enGB');

    function startDateTrigger() {
        if (startDateInput.current) startDateInput.current.setOpen(true);
    }

    function endDateTrigger() {
        if (endDateInput.current) endDateInput.current.setOpen(true);
    }

    return (
        <header>
            <div className='header-inner'>
                <Image src="/logo.svg" alt="logo" className='logo' width={138} height={138} priority />
                <div className='right-side'>
                    <div className='title'>
                        <h1>monblanproject</h1><div className='title-date'>Start on  17-02-2016</div>
                    </div>
                    <div className='info'>
                        <div className='posts-number'><b>870</b> posts</div>
                        <div className='posts-followers'><b>11,787</b> followers</div>
                        <div className='posts-following'><b>112</b> following</div>
                    </div>
                    <div className='date-filter'>
                        <div className='caption'>Date</div>
                        <div className='date-outer'>
                            <DatePicker ref={startDateInput} className='date' id='date_start' selected={startDate} onChange={(date) => { setStartDate(date); props.startDateChange(date) }} locale={enGB} dateFormat="dd-MM-yyyy" />
                            <div className='buttons'>
                                <div className='button'>
                                    <Image src='cross.svg' onClick={(e) => setStartDate(null)} alt='remove date' className='remove' width={24} height={24} />
                                </div>
                                <div className='button'>
                                    <Image src='date.svg' onClick={startDateTrigger} alt='set date' className='select' width={24} height={24} />
                                </div>
                            </div>
                        </div>
                        <div className='date-outer'>
                            <DatePicker ref={endDateInput} className='date' id='date_end' selected={endDate} onChange={(date) => { setEndDate(date); props.endDateChange(date) }} dateFormat="dd-MM-yyyy" />
                            <div className='buttons'>
                                <div className='button'>
                                    <Image src='cross.svg' onClick={(e) => setEndDate(null)} alt='remove date' className='remove' width={24} height={24} />
                                </div>
                                <div className='button'>
                                    <Image src='date.svg' onClick={endDateTrigger} alt='set date' className='select' width={24} height={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}