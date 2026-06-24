import Image from 'next/image';
import { useState } from 'react';


export default function Item(props: { image_name: string, date: string }) {

    //console.log("items/" + props.item_name + '.png')
    return (
        <div className='item'>
            <Image
                className="item-image"
                src={"/items/" + props.image_name}
                alt={props.image_name}
                width={86}
                height={86}
            />
            <div className='col col-1'>
                <div className='day'>Today</div>
                <div className='subcol'>
                    <div className='likes'><Image src='like.svg' alt='likes' width={15} height={13.5} /><span>128</span></div>
                    <div className='comments'><Image src='comment.svg' alt='comments' width={15} height={15} /><span>31</span></div>
                </div>
            </div>
            <div className='col col-2'>
                <div className='day'>{props.date}</div>
                <div className='subcol'>
                    <div className='likes'><Image src='like.svg' alt='likes' width={15} height={13.5} /><span>78</span></div>
                    <div className='comments'><Image src='comment.svg' alt='comments' width={15} height={15} /><span>22</span></div>
                </div>
            </div>
            <div className='col col-3'>
                <div className='uploaded'>Image uploaded</div>
                <div className='date'>11-04-2016</div>
            </div>
        </div >
    )

}