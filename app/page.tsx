'use client'

import { useState, useEffect } from 'react';
import jsonData from './data/data.json';
import Image from 'next/image'
import Header from "./components/Header";
import Item from './components/Item';

export default function Home() {
  const [items, setItems] = useState<{ src: string, date: string }[]>([]);

  const today = new Date();
  const [startDate, setStartDate] = useState<Date | null>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  const [endDate, setEndDate] = useState<Date | null>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const [layout, setLayout] = useState('list');
  const [itemsNum, setItemsNum] = useState(9);
  const [maxNum, setMaxNum] = useState(jsonData.length);

  const maxDate = new Date(8640000000000000);
  const minDate = new Date(-8640000000000000);

  function convertDate(date: string) {

    let dateArr = date.split('-');

    return new Date(parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0]));
  }

  useEffect(() => {

    const getData = async () => {
      var filteredData = [];
      let j = 0;
      for (const [i, item] of jsonData.entries()) {

        const date = new Date(convertDate(item.date));
        if (startDate == null) setStartDate(minDate);
        if (endDate == null) setEndDate(maxDate);

        if (startDate != null && endDate != null) {
          if (date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime()) {
            filteredData[j++] = item;
          }

        }
      }
      setItems(filteredData);
      setMaxNum(filteredData.length)
      console.log(filteredData);
    };

    getData();

  }, [startDate, endDate, itemsNum, layout]);

  function showItems() {

    const addNum = layout == 'list' ? 3 : 4;
    setItemsNum(Math.min(itemsNum + addNum, maxNum));
  }

  const itemsJsx = items.map((value, index) => { if (index < itemsNum) return <Item key={index} image_name={value.src} date={value.date.toString()} /> })

  return (
    <body>
      <Header startDateChange={setStartDate} endDateChange={setEndDate} />
      <main>
        <div className='layout'>
          <Image src={layout == 'list' ? 'tiles.svg' : 'tiles_selected.svg'} alt='list_selected' width={24} height={22} onClick={() => {setLayout('tiles'); setItemsNum(8);}} />
          <Image src={layout == 'list' ? 'list_selected.svg' : 'list.svg'} alt='list_selected' width={24} height={22} onClick={() => {setLayout('list'); setItemsNum(9);}} />
        </div>
        <div className={layout == 'list' ? "main-body" : "main-body tiles"}>{itemsJsx}</div>
        <button className={itemsNum < maxNum ? 'load-more' : 'load-more hidden'} onClick={() => { showItems() }}>LOAD MORE</button>
      </main>
    </body>
  );
}
