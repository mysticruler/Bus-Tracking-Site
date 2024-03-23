import React, { useState, useEffect } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

function Dashgraph() {

    const [totalCount, setTotalCount] = useState(0);
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [totalOperatorsCount, setTotalOperatorsCount] = useState(0);
    const [totalActive, setTotalActive] = useState(0);

    useEffect(() => {
        fetch('http://localhost:2222/tripcount')
            .then(response => response.json())
            .then(data => {
                const { totalCount } = data;
                setTotalCount(totalCount);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:2222/userscount')
            .then(response => response.json())
            .then(data => {
                const { totalusersCount } = data;
                setTotalUsersCount(totalusersCount);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:2222/operatorscount')
            .then(response => response.json())
            .then(data => {
                const { totaloperatorsCount } = data;
                setTotalOperatorsCount(totaloperatorsCount);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:2222/tripactive')
            .then(response => response.json())
            .then(data => {
                const statusValues = data.map(trip => trip.status);
                const sum = statusValues.reduce((acc, cur) => acc + cur, 0);
                setTotalActive(sum);
            });
    }, []);

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: ['TOTAL BUSES', 'ACTIVE BUSES', 'USERS', 'OPERATORS'] }]}
            series={[{ data: [totalCount, totalActive, totalUsersCount, totalOperatorsCount] }]}
            width={800}
            height={500}
        />
    );
}

export default Dashgraph;
