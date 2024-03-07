import React from 'react'
import blankUser from '../images/blankUser.png'
import scale from '../images/scale.png'

const DailySummary = () => {
    return (
        <div className='flex justify-center pt-5 pb-5'>
            <div className="card card-side shadow-xl flex flex-col
                bg-base-300 pl-4 pr-4 justify-between max-w-xl">
                <div className='flex justify-between text-2xl font-medium b h-1/6
                    items-center'>
                    <h2>Your Daily Summary :</h2>
                    <div className='rightSummaryHeader'>
                        <p className='flex'>Streak: <span className='font-bold text-success text-3xl ml-1'>8</span></p>
                    </div>
                </div>
                <div className='flex h-3/6  w-full'>
                    <div className='flex flex-col w-2/6 items-center justify-center '>
                        <img src={blankUser} className='w-5/6 rounded-lg border border-neutral mb-3' />
                        <div className='flex h-1/6 items-center'>
                            <text className='text-xl font-bold text-success pr-2'><span>-</span>2<span className='text-lg text-base-content'>lbs</span>
                            </text>
                            <button className="btn btn-square scaleButton">
                                <div className="indicator">
                                    <span className="indicator-item indicator-bottom badge badge-success scaleBadge">+</span>
                                    <img src={scale} alt="scale" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col w-4/6 pl-3 pr-3'>
                        <h1 className='text-sm'>Calories Remaining:</h1>
                        <text className='text-5xl font-bold text-primary pb-4'>300</text>
                        <button className="btn btn-outline btn-neutral w-full mb-4">Add Exercise</button>
                        <button className="btn btn-outline btn-neutral w-full">Add Food</button>
                    </div>


                </div>
                <div className='flex flex-col  h-2/6 pt-5'>
                    <div className='flex justify-between pb-3'>
                        <div className='flex flex-col w-full pl-2'>
                            <div>
                                <text className='text-xl font-semibold'>2000</text>
                            </div>
                            <caption className='text-sm flex'>GOAL</caption>
                        </div>
                        <div className='divider'>|</div>
                        <div className='flex flex-col w-full pl-2'>
                            <div className='flex'>
                                <text className='w-2/3 text-xl font-semibold'>3500</text>
                                <text className='text-xl font-semibold'>-</text>
                            </div>
                            <caption className='text-sm flex'>FOOD</caption>
                        </div>
                        <div className='flex flex-col w-full pl-2'>
                        <div className='flex'>
                        <text className='w-2/3 text-xl font-semibold'>1200</text>
                                <text className='text-xl font-semibold'>=</text>
                            </div>
                            <caption className='text-sm flex'>EXERCISE</caption>
                        </div>
                        <div className='flex flex-col w-full pl-2'>
                            <div>

                            </div>
                            <text className='text-xl font-semibold'>2300</text>
                            <caption className='text-sm flex'>NET</caption>
                        </div>
                    </div>
                    <progress className="progress progress-primary w-full h-3 mb-1" value="70" max="100"></progress>
                    <caption className='text-sm'>70%</caption>
                </div>

            </div>
        </div>

    )
}

export default DailySummary