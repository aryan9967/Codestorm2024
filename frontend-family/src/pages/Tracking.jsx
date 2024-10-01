import { BreathChart } from '@/components/LineChart/BreathChart'
import HeartRateChart from '@/components/LineChart/HeartChart'
import React from 'react'

function Tracking() {
    return (
        <div className='py-4'>
            <HeartRateChart />
            <BreathChart />
            
        </div>
    )
}

export default Tracking
